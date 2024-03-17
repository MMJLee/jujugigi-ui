<template>
  <v-dialog :value="value" v-if="detailModal">asdf</v-dialog>
</template>

<script>

import { alert } from '@/mixins/alert'

export default {
    name: 'ImageDetails',
    mixins: [alert],
    props: {
        value: Boolean,
    },
    methods: {
        closeDialog() {
            // this.cleanup()
            this.$emit('closeImageDetail')
        },
    }
}
</script>