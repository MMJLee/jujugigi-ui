import BaseApi from './base'

class UserImageAPI extends BaseApi {
    constructor() {
        super()
    }

    async create(data) {
        return this.auth({
            url: '/user_image',
            method: 'POST',
            data
        })
    }

    async read(params) {
        return this.auth({
            url: '/user_image',
            method: 'GET',
            params
        })
    }

    // this.api to bypass auth for leaderboard
    async read_rankings(params) {
        return this.api({
            url: '/user_image/rankings',
            method: 'GET',
            params
        })
    }

    async update(id, data) {
        return this.auth({
            url: `/user_image/${id}`,
            method: 'PUT',
            data
        })
    }

    async delete(id) {
        return this.auth({
            url: `/user_image/${id}`,
            method: 'DELETE'
        })
    }
}

export default new UserImageAPI()