<template>
    <v-list>
        <v-toolbar color="surface" align="center" title="Leaderboard">
            <v-btn icon="mdi-magnify"></v-btn>
        </v-toolbar>
        <v-list-item v-for="(user, i) in users" :to="`../profile/${user.user_alias}`">
            <v-list-item-title v-text="'#' + (offset + i + 1) + ': ' + user.user_alias"></v-list-item-title>
            <v-list-item-subtitle
                v-text="'Total: ' + user.total_count + ' Uniques: ' + user.unique_count + ' Epics: ' + user.epic_count + ' Rares: ' + user.rare_count">
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
    <v-row>
        <v-col class="pr-0">
            <v-btn block @click="paginate(false)" :disabled="offset <= 0">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        </v-col>
        <v-col class="pl-0">
            <v-btn block @click="paginate(true)">
                <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
        </v-col>
    </v-row>
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
                    this.users = res.data
                } else {
                    this.limit -= 10
                    this.offset -= 10
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        },
        async paginate(next) {
            if (next) {
                this.limit += 10
                this.offset += 10
            } else {
                if (this.offset <= 0) {
                    return
                }
                this.limit -= 10
                this.offset -= 10
            }
            await this.getRankings(this.limit, this.offset)
        }
    }
};
</script>
