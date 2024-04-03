import axios from 'axios'
import Auth0Client from '../plugins/index'

class BaseApi {
    constructor() {
        const api = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_API,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        })
        this.api = api
        this.auth0 = Auth0Client
    }

    async auth(config = {}) {
        let token = await this.auth0.getAccessTokenSilently()
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return this.api({ ...config })
    }
}

export default BaseApi