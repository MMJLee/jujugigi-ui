<template>
    <v-list lines="one">
        <v-list-item align="center" title="Leaderboard"></v-list-item>

        <v-list-item v-for="(user, i) in users">
            <v-list-item-title v-text="'#' + (i + 1) + ': ' + user.user_email"></v-list-item-title>
            <v-list-item-subtitle
                v-text="'Total: ' + user.total_count + ' Unique: ' + user.unique_count + ' Epic: ' + user.epic_count + ' Rare: ' + user.rare_count">
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script>
import UserImageAPI from "@/api/user_image"
import { mapActions } from 'pinia'
import { useAlertStore } from '@/stores/alert'

export default {
    name: 'Leaderboard',
    data() {
        return {
            users: [],
            loading: false,
            limit: 10,
            offset: 0
        }
    },
    created() {
        this.getRankings(this.limit, this.offset)
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError']),
        async getRankings(limit, offset) {
            this.loading = true
            try {
                let res = await UserImageAPI.read_rankings({ "limit": limit, "offset": offset })
                if (res?.data?.length > 0) {
                    this.users.push(...res.data)
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        async showMoreRankings() {
            this.limit += 10
            this.offset += 10
            await this.getRankings(this.limit, this.offset)
        },
    }
};
</script>
