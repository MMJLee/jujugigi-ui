<template>
    <v-row>
        <v-col>
            <v-file-input v-model="files" label="Choose Files" accept="image/*" @click="cleanup" dense multiple
                @change="handleFiles"></v-file-input>
        </v-col>
        <v-col>
            <v-btn :disabled="files?.length < 1" @click="uploadImages">
                <v-icon left>mdi-file-upload-outline</v-icon>
                Upload
            </v-btn>
        </v-col>
    </v-row>
    <v-form ref="form" lazy-validation>
        <v-row>
            <v-col v-for="(file, index) in files" :key="index" cols="2">
                <v-btn absolute style="z-index: 100;" icon @click="remove_image(index)">
                    <v-icon color="black">mdi-close</v-icon>
                </v-btn>
                <v-img :src="preview_urls[index]" height="250"></v-img>
                <v-text-field :rules="file_name_rules" v-model="new_file_names[index]" :label="og_file_names[index]"
                    dense>
                </v-text-field>
            </v-col>
        </v-row>
    </v-form>
    <Gacha />
    <v-row justify="center">
        <v-col v-for="image in images" align="center">
            <Image :image="image" />
        </v-col>
    </v-row>

</template>

<script>
import ImageAPI from "@/api/image"
import { mapActions } from 'pinia'
import { useAlertStore } from '@/stores/alert'

export default {
    name: "admin",
    created() {
        this.getAllImages(50, 0)
    },
    data() {
        return {
            loading: false,
            files: [],
            gacha: null,
            og_file_names: [],
            new_file_names: [],
            fileExtensions: [],
            preview_urls: [],
            images: [],
            file_name_rules: [
                value => { return value.match(/^[GgJj][1-5]_[a-z0-9_]+$/) ? true : 'Invalid file name schema' },
            ],
            limit: 50,
            offset: 0
        }
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError', 'emitAlert']),
        cleanup() {
            this.files = []
            this.og_file_names = []
            this.new_file_names = []
            this.fileExtensions = []
            this.preview_urls = []
        },
        async handleFiles() {
            for (const [i, file] of Object.entries(this.files)) {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload = () => {
                    file.upload_file = reader.result
                }
                const lastDotIndex = file.name.lastIndexOf('.')
                if (lastDotIndex !== -1) {
                    this.og_file_names.push(file.name)
                    this.fileExtensions.push(file.name.slice(lastDotIndex + 1))
                    this.new_file_names.push(file.name.slice(0, lastDotIndex))
                    this.preview_urls.push(this.preview_image(file))
                }
            }
        },
        preview_image(image) {
            return URL.createObjectURL(image)
        },
        remove_image(index) {
            this.files.splice(index, 1)
            this.og_file_names.splice(index, 1)
            this.fileExtensions.splice(index, 1)
            this.new_file_names.splice(index, 1)
            this.preview_urls.splice(index, 1)
        },
        async uploadImages() {
            this.emitAlert(true, 'success', 'Uploading...')
            const formData = new FormData()
            const file_names = []
            for (let i = 0; i < this.files.length; i++) {
                const uuid = self.crypto.randomUUID() // to invalidate browser cache
                const filename = `${this.new_file_names[i]}.${this.fileExtensions[i]}`
                file_names.push(filename)
                const blob = new Blob([this.files[i].upload_file], { type: `${this.files[i].type}` })
                formData.append('image_files', blob, filename)
            }
            try {
                await ImageAPI.bulk_create(formData)
                this.emitAlert(true, 'success', 'Upload complete')
            } catch (err) {
                this.handleError(err)
            }
        },
        async getAllImages(limit, offset) {
            this.loading = true
            try {
                let res = await ImageAPI.read({ "limit": limit, "offset": offset })
                if (res?.data?.length > 0) {
                    this.images.push(...res.data)
                }
            } catch (err) {
                this.handleError(err)
            }
        },
        async showMoreImages() {
            this.limit += 50
            this.offset += 50
            await this.getUserImages(this.limit, this.offset, this.username)
        },
        async playGacha() {
            try {
                let res = await ImageAPI.gacha()
                if (res?.data?.length > 0) {
                    this.gacha = res.data
                }
            } catch (err) {
                this.handleError(err)
            }
        }
    }
}
</script>