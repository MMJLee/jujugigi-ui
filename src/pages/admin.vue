<template>
    <v-container>
        <v-card v-if="isAdmin">
            <Upload />
            <div class="mx-auto" align="center">
                <v-btn @click="toggleShowAll"> {{ showAllText }} </v-btn>
            </div>
            <Images v-if="showAll" />
        </v-card>
        <h1 v-else>Hey, you don't belong here!</h1>
    </v-container>
</template>

<script>

export default {
    name: "admin",
    data() {
        return {
            user: this.$auth0.user,
            showAll: false
        }
    },
    computed: {
        isAdmin() {
            return this.user?.email === import.meta.env.VITE_ADMIN
        },
        showAllText() {
            return this.showAll ? "Hide Images" : "Show Images"
        }
    },
    methods: {
        toggleShowAll() {
            this.showAll = !this.showAll
        }
    }
}
</script>