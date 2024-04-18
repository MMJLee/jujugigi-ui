import BaseApi from './base'

class StripeAPI extends BaseApi {
  constructor() {
    super()
  }

  async create(data) {
    return this.auth({
      url: '/stripe',
      method: 'POST',
      data
    })
  }

  async read(params) {
    return this.auth({
      url: '/stripe',
      method: 'GET',
      params
    })
  }

  async update(id, data) {
    return this.auth({
      url: `/stripe/${id}`,
      method: 'PUT',
      data
    })
  }

  async delete(id) {
    return this.auth({
      url: `/stripe/${id}`,
      method: 'DELETE'
    })
  }


}

export default new StripeAPI()