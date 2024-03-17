export const alert = {
  methods: {
    emitAlert (showAlert, alertType, alertMessage, messages) {
      const payload = {
        alert: showAlert,
        alertType: alertType,
        alertMessage: alertMessage,
        messages: messages
      }
      this.$root.$emit('alertdialog', payload)
    },
    resetAlert () {
      this.errors.length = 0
      this.successes.length = 0
      const payload = {
        alert: false,
        alertType: 'success',
        alertMessage: '',
        messages: []
      }
      this.$root.$emit('alertdialog', payload)
    },
    handleError (err) {
      console.error(err)
      let message = err.message || 'An error has occurred'
      if (err.response && err.response.data) {
        message = `${message}. Error response data: ${JSON.stringify(err.response.data)} `
      }
      this.emitAlert(true, 'warning', message)
    }
  }
}