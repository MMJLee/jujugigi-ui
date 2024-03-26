<template>
    <Images :username="username" />
</template>
<script>
export default {
    name: "profile",
    computed: {
        username() { return this.$router.currentRoute.value.params.username }
    }
};
</script>