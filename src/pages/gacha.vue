<template>
    <v-card class="mx-auto">
        <v-card-item>
            <v-card-title> Unleash the purrfect cat picture! </v-card-title>
            <v-card-subtitle> All sales are final </v-card-subtitle>
        </v-card-item>
        <v-card-actions>
            <v-btn @click="testGacha"> TEST </v-btn>
        </v-card-actions>
        <Image v-if="image" :image="image[0]" />
    </v-card>
</template>

<script>
import StripeAPI from "@/api/stripe"
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
        async testGacha() {
            let res = await StripeAPI.create()
            window.location.href = res.data.url
        }
    }
}
</script>