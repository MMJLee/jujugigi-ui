<template>
    <v-row v-if="loading || images.length > 0" class="mx-5" justify="center">
        <v-col v-for="image in images" align="center" cols="6" md="4" lg="3">
            <Image :image="image" />
        </v-col>
    </v-row>
    <h1 v-else> This user does not exists or has no images </h1>
</template>

<script>
import ImageAPI from "@/api/image"
import { mapActions } from 'pinia'
import { useAlertStore } from '@/stores/alert'

export default {
    name: "Images",
    props: ['alias'],
    data() {
        return {
            images: [],
            detailModal: false,
            loading: false,
            limit: 50,
            offset: 0
        };
    },
    created() {
        this.loading = true
        this.getUserImages(this.limit, this.offset, this.alias)
    },
    watch: {
        async alias(newAlias) {
            this.images = []
            await this.getUserImages(this.limit, this.offset, newAlias)
        }
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError']),
        async getUserImages(limit, offset, user_alias) {
            this.loading = true
            try {
                let res = await ImageAPI.read({ "user_alias": user_alias, "opened": true, "limit": limit, "offset": offset })
                if (res?.data?.length > 0) {
                    this.images.push(...res.data)
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        async showMoreImages() {
            this.limit += 50
            this.offset += 50
            await this.getUserImages(this.limit, this.offset, this.alias)
        }
    }
};
</script>