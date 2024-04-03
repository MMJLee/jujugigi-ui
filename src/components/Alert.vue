<template>
    <div align="center">
        <v-alert prominent style="z-index: 999;" max-width="50vw" v-model="show" closable :type="type" :text="message">
        </v-alert>
    </div>
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
        show(newValue) {
            if (newValue) {
                setTimeout(() => {
                    this.show = false;
                }, 3000);
            }
        }
    }
}
</script>