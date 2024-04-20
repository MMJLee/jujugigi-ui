<template>
    <v-container class="py-0 mt-3">
        <v-card>
            <v-alert class="mx-auto" prominent style="z-index: 999;" v-model="show" closable :type="type"
                :text="message">
            </v-alert>
        </v-card>
    </v-container>
</template>

<script>
import { useAlertStore } from '@/stores/alert'
import { mapState, mapWritableState } from 'pinia'

export default {
    name: 'Alert',
    computed: {
        ...mapState(useAlertStore, ['type', 'message', 'time']),
        ...mapWritableState(useAlertStore, ['show']),
    },
    watch: {
        time(newValue) {
            if (newValue) {
                setTimeout(() => {
                    this.show = false
                }, newValue)
            }
        }
    }
}
</script>