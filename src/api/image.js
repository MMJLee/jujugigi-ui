import BaseApi from './base'

class ImageAPI extends BaseApi {
  constructor () {
    super()
  }

  async create (data) {
    return this.auth({
      url: '/image',
      headers: {'Content-Type': 'multipart/form-data'},
      method: 'POST',
      data
    })
  }

  async bulk_create (data) {
    return this.auth({
      url: '/image/bulk',
      headers: {'Content-Type': 'multipart/form-data'},
      method: 'POST',
      data
    })
  }

  async read (params) {
    return this.auth({
      url: '/image',
      method: 'GET',
      params
    })
  }

  async update (id, data) {
    return this.auth({
      url: `/statement/${id}`,
      method: 'PUT',
      data
    })
  }

  async delete (id) {
    return this.auth({
      url: `/image/${id}`,
      method: 'DELETE'
    })
  }

  async gacha () {
    return this.auth({
      url: '/image/gacha',
      method: 'GET'
    })
  }
}

export default new ImageAPI()