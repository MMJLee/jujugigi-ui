<template>
    <v-container max-width="1800">
        <v-row align="center">
            <v-col>
                <h1> Unleash the purrfect cat picture! <v-btn to="/gacha"> play </v-btn> </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="9" xl="10">
                <v-img src="@/assets/banner.jpg"></v-img>
            </v-col>
            <v-col cols="12" lg="3" xl="2">
                <Leaderboard />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
</script>
