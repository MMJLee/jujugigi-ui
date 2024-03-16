export const alert = {
  methods: {
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