<template>
    <v-app>
        <v-main class="full-height">
            <AppHeader />
            <Alert />
            <router-view style="flex: auto;" />
            <AppFooter />
        </v-main>
    </v-app>
</template>

<script setup>
</script>
<style scoped>
.full-height {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>