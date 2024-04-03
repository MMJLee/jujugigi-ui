<template>
    <v-card class="mx-auto mb-5 w-25">
        <v-card-title>
            {{ alias }}
        </v-card-title>
    </v-card>
    <Images :alias="alias" />
</template>
<script>
export default {
    name: "profile",
    computed: {
        alias() { return this.$router.currentRoute.value.params.alias }
    }
};
</script>