import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
    state: () => {
        return {
            show: false,
            type: null,
            message: "",
            time: 0
        }
    },
    actions: {
        emitAlert(show, type, message) {
            this.show = show
            this.type = type
            this.message = message
        },
        handleRejected(rejected) {
            const errs = rejected.map(e => e.reason?.response?.data?.message || e.reason.message)
            this.emitAlert(true, 'warning', `The following errors have occurred: ${errs.join(', ')}`)
        },
        handleError(err) {
            if (Array.isArray(err)) {
                return this.handleRejected(err)
            }
            const message = err?.response?.data?.message || err.message
            this.emitAlert(true, 'warning', message)
        }
    },
})


