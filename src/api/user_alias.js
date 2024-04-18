import BaseApi from './base'

class UserAliasAPI extends BaseApi {
    constructor() {
        super()
    }

    async create(data) {
        return this.auth({
            url: '/user_alias',
            method: 'POST',
            data
        })
    }

    async read(params) {
        return this.auth({
            url: '/user_alias',
            method: 'GET',
            params
        })
    }

    async update(data) {
        return this.auth({
            url: `/user_alias`,
            method: 'PUT',
            data
        })
    }

    async delete(id) {
        return this.auth({
            url: `/user_alias/${id}`,
            method: 'DELETE'
        })
    }
}

export default new UserAliasAPI()