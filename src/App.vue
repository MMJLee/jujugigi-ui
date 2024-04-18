<template>
    <v-app>
        <v-main>
            <AppHeader />
            <Alert />
            <router-view class="full-height" />
            <AppFooter />
        </v-main>
    </v-app>
</template>

<script setup>
</script>
<style scoped>
.full-height {
    min-height: 100vh;
}
</style>