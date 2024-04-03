<template>
    <v-container v-if="isAdmin">
        <Upload />
        <Gacha />
        <div class="mx-auto" align="center">
            <v-btn @click="toggleShowAll"> {{ showAllText }} </v-btn>
        </div>
        <Images v-if="showAll" />
    </v-container>
    {{ user }}
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