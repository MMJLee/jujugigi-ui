<template>
    <v-card class="mx-auto">
        <v-card-item>
            <v-card-title> Unleash the purrfect cat picture! </v-card-title>
            <v-card-subtitle> All sales are final </v-card-subtitle>
        </v-card-item>
        <v-card-actions>
            <v-btn @click="playGacha"> Play </v-btn>
        </v-card-actions>
        <Image v-if="image" :image="image[0]" />
    </v-card>
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