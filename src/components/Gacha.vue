<template>
    <v-btn @click="playGacha"> Play Gacha </v-btn>
    <Image v-if="image" :image="image[0]" />
</template>

<script>
import ImageAPI from "@/api/image"
import { mapActions } from 'pinia'
import { useAlertStore } from '@/stores/alert'

export default {
    name: 'Gacha',
    data() {
        return {
            image: null,
            loading: false
        }
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError']),

        async playGacha() {
            this.loading = true
            try {
                let res = await ImageAPI.gacha()
                if (res?.data?.length > 0) {
                    this.image = res.data
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>