import { defineStore } from 'pinia'

export const useAliasStore = defineStore('alias', {
    state: () => {
        return {
            userAlias: "",
        }
    }
})