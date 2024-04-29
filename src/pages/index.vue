<template>
    <v-container>
        <v-row align="center">
            <v-col>
                <h1> Unleash the purrfect cat picture!
                    <v-btn @click="$router.push({ path: `/success` })"> {{ remainingTime }} </v-btn>
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
<script>
import { mapState } from 'pinia'
import { useAliasStore } from '@/stores/alias'
export default {
    data() {
        return {
            now: null,
            interval: null
        }
    },
    mounted() {
        this.updateTime()
        this.interval = setInterval(this.updateTime, 1000)
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    computed: {
        ...mapState(useAliasStore, ['dailyDollar']),
        timeLeft() {
            let ddDate = new Date(this.dailyDollar)
            let dayAgo = new Date()
            dayAgo.setDate(this.now?.getDate() - 1)
            return ddDate.getTime() - dayAgo.getTime()
        },
        remainingTime() {
            if (this.dailyDollar) {
                if (this.timeLeft > 0) {
                    let hours = Math.floor(this.timeLeft / (1000 * 60 * 60))
                    let minutes = Math.floor((this.timeLeft % (1000 * 60 * 60)) / (1000 * 60))
                    let seconds = Math.floor((this.timeLeft % (1000 * 60)) / 1000)
                    return 'Buy (Free in ' + hours.toString().padStart(2, '0') + ":" +
                        minutes.toString().padStart(2, '0') + ":" +
                        seconds.toString().padStart(2, '0') + ")"
                }
            }
            return "Play for Free"
        },
    },
    methods: {
        updateTime() {
            this.now = new Date()
        }
    }
}
</script>