<template>
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
    name: "Images",
    props: ['username'],
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
        this.getUserImages(this.limit, this.offset, this.username)
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError']),
        async getUserImages(limit, offset, user_email) {
            this.loading = true
            try {
                let res = await ImageAPI.read({ "user_email": user_email, "limit": limit, "offset": offset })
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
            await this.getUserImages(this.limit, this.offset, this.username)
        }
    }
};
</script>