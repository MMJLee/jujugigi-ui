<template>
    <v-app-bar height="50">
        <v-row justify="space-between" align="center">
            <v-col cols="3">
                <v-row align="center">
                    <v-col align="end">
                        <RouterLink to="/">
                            <v-btn color="primary">JujuGigi</v-btn>
                        </RouterLink>
                        <v-icon @click="toggleTheme"> {{ themeIcon }} </v-icon>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="3">
                <v-row align="center">
                    <v-text-field v-model="search" :label="email" density="compact" variant="outlined"
                        hide-details></v-text-field>
                    <router-link :to="`../profile/${search}`">
                        <v-btn color="primary">Go</v-btn>
                    </router-link>
                </v-row>
            </v-col>
            <v-col cols="3">
                <v-row align="center">
                    <v-col align="start">
                        <RouterLink v-if="user?.email" :to="`../profile/${user.email}`">
                            <v-btn color="primary"> {{ user.name }} </v-btn>
                        </RouterLink>
                        <v-btn @click="logInOut"> {{ logInOutText }} </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
    data() {
        return {
            user: this.$auth0.user,
            search: "",
            theme: useTheme()
        };
    },

    computed: {
        logInOutText() {
            if (this.user) {
                return "Logout"
            }
            return "Login"
        },
        themeIcon() {
            return this.theme.global.current.dark ? 'mdi-emoticon-happy' : 'mdi-emoticon-cool-outline'
        },
        email() { return this.$router.currentRoute.value?.params?.username },
    },
    watch: {
        email(newEmail, oldEmail) {
            if (newEmail) {
                this.search = ""
            }
        }
    },
    methods: {
        logInOut() {
            if (this.user) {
                this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
            } else {
                this.$auth0.loginWithRedirect();
            }
        },
        toggleTheme() {
            this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark'
        }
    }
};
</script>

<style scoped lang="sass">

</style>
