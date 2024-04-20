<template>
    <v-container>
        <v-row align="center">
            <v-col>
                <h1> Unleash the purrfect cat picture!
                    <v-btn @click="$router.push({ path: `/success` })"> Play </v-btn>
                </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="9" lg="9" xl="10">
                <v-img src="@/assets/banner.jpg"></v-img>
            </v-col>
            <v-col cols="12" md="3" lg="3" xl="2">
                <Leaderboard />
            </v-col>
        </v-row>
    </v-container>
</template>