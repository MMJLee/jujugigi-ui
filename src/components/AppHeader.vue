<template>
    <v-app-bar density="compact">
        <v-row>
            <v-col cols="5" sm="6">
                <v-row>
                    <v-col align="center">
                        <RouterLink to="/">
                            <v-btn color="primary">JujuGigi</v-btn>
                        </RouterLink>
                        <v-icon @click="toggleTheme"> {{ themeIcon }} </v-icon>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="7" sm="6">
                <v-row align="center">
                    <v-col align="center">
                        <RouterLink v-if="user?.email" :to="`../profile/${userAlias}`">
                            <v-btn class="pl-0" color="primary"> {{ userAlias || user.name }} </v-btn>
                        </RouterLink>
                        <v-btn @click="logInOut"> {{ logInOutText }} </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
import UserAliasAPI from "@/api/user_alias"
import { useTheme } from 'vuetify'
import { mapActions, mapWritableState } from 'pinia'
import { useAliasStore } from '@/stores/alias'
import { useAlertStore } from '@/stores/alert'

export default {
    name: 'AppHeader',
    data() {
        return {
            loading: false,
            user: this.$auth0.user,
            theme: useTheme()
        }
    },
    watch: {
        async user(newValue) {
            if (newValue) {
                await this.setUserAlias()
            }
        }
    },
    computed: {
        ...mapWritableState(useAliasStore, ['userAlias', 'updatedOn']),
        logInOutText() {
            if (this.user) {
                return "Logout"
            }
            return "Login"
        },
        themeIcon() {
            return this.theme.global.current.dark ? 'mdi-emoticon-happy' : 'mdi-emoticon-cool-outline'
        }
    },
    methods: {
        ...mapActions(useAlertStore, ['handleError', 'emitAlert']),
        logInOut() {
            if (this.user) {
                this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } })
            } else {
                this.$auth0.loginWithRedirect()
            }
        },
        toggleTheme() {
            this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark'
        },
        async setUserAlias() {
            this.loading = true
            try {
                let res = await UserAliasAPI.read({ "user_email": this.user.email })
                if (res?.data?.length > 0) {
                    this.userAlias = res.data[0].user_alias
                    this.updatedOn = res.data[0].updated_on
                } else {
                    if (this.$router.currentRoute.value.fullPath != "/me") {
                        this.emitAlert(true, 'warning', 'set an alias', 3)
                        this.$router.push({ path: `/me` })
                    }
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
<style scoped>
header {
    padding-left: 0px;
    padding-right: 0px;
}
</style>