<template>


    <v-alert class="mx-auto" max-width="800" v-model="show" closable :type="type" :text="message"> </v-alert>


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
        inputField(newValue, oldValue) {
            if (newValue !== oldValue) {
                // Store the original value
                this.originalValue = oldValue;

                // Set a timeout to revert the change after 2 seconds
                setTimeout(() => {
                    this.inputField = this.originalValue;
                }, 2000);
            }
        }
    }
}
</script>