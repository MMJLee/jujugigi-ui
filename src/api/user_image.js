import BaseApi from './base'

class UserImageAPI extends BaseApi {
  constructor () {
    super()
  }

  async create (data) {
    return this.auth({
      url: '/user_image',
      headers: {'Content-Type': 'multipart/form-data'},
      method: 'POST',
      data
    })
  }

  async bulk_create (data) {
    return this.auth({
      url: '/user_image/bulk',
      headers: {'Content-Type': 'multipart/form-data'},
      method: 'POST',
      data
    })
  }

  async read (params) {
    return this.auth({
      url: '/user_image',
      method: 'GET',
      params
    })
  }

  async read_rankings (params) {
    return this.auth({
      url: '/user_image/rankings',
      method: 'GET',
      params
    })
  }

  async update (id, data) {
    return this.auth({
      url: `/user_image/${id}`,
      method: 'PUT',
      data
    })
  }

  async delete (id) {
    return this.auth({
      url: `/user_image/${id}`,
      method: 'DELETE'
    })
  }
}

export default new UserImageAPI()