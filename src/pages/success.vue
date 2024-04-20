<template>
    <div id="box-container" v-if="!opened">
        <div id="present" @click="getLatestUnopendUserImage">
            <div id="lid">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div id="box">
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    <div v-else>
        <v-card v-show="loading == false" class="justify-center">
            <v-img id="vimage" :src="getImgUrl()" max-height="70vh" />
            <h1 v-if="image"> you got a <span :style="{ 'text-shadow': glow(image?.rarity) }">
                    {{ image?.description }} ({{ rarity_name[image?.rarity] }}) </span>
                <v-btn class="ml-1" @click="reset"> Open again </v-btn>
            </h1>
            <h1 v-else> you don't have any images to open
                <v-btn class="ml-1" @click="gacha"> Buy more </v-btn>
            </h1>
        </v-card>
    </div>
</template>

<script>
import StripeAPI from "@/api/stripe"
import ImageAPI from "@/api/image"
import { mapActions } from 'pinia'
import { useAlertStore } from '@/stores/alert'
import imgUrl from '@/assets/feels_bad_man.png'

export default {
    name: 'Gacha',
    data() {
        return {
            user: this.$auth0.user,
            image: null,
            opened: false,
            loading: false,
            rarity_name: { "1": "common", "2": "uncommon", "3": "rare", "4": "epic", "5": "unique" },
            rarity_color: { "1": "white", "2": "green", "3": "blue", "4": "purple", "5": "orange" },
        }
    },
    methods: {
        getImgUrl() {
            if (this.image?.signedURL) {
                return this.image?.signedURL
            } return imgUrl
        },
        ...mapActions(useAlertStore, ['handleError']),
        reset() {
            this.image = null
            this.opened = false
            document.getElementById("vimage").classList.remove("reveal")
        },
        async getLatestUnopendUserImage() {
            this.opened = true
            this.loading = true
            try {
                let res = await ImageAPI.open()
                if (res?.data?.length > 0) {
                    this.image = res.data[0]
                }
            } catch (err) {
                this.handleError(err)
            } finally {
                this.loading = false
                document.getElementById("vimage").classList.add("reveal")
            }
        },
        glow(rarity) {
            let glowStr = ''
            if (rarity >= 2) {
                glowStr += '0 0 5px ' + this.rarity_color[rarity]
                if (rarity >= 3) {
                    glowStr += ', 0 0 10px ' + this.rarity_color[rarity]
                    if (rarity >= 4) {
                        glowStr += ', 0 0 15px ' + this.rarity_color[rarity]
                        if (rarity >= 5) {
                            glowStr += ', 0 0 20px ' + this.rarity_color[rarity]
                        }
                    }
                }
            }
            return glowStr
        },
        async gacha() {
            try {
                let res = await StripeAPI.read()
                if (res?.data?.url) {
                    window.location.href = res.data.url
                }
            } catch (err) {
                this.handleError(err)
            }
        }
    }
}
</script>
<style scoped>
/* Extra small devices (phones, 600px and down) */
#box-container {
    --height: 160px;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    #box-container {
        --height: 220px;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 960px) {
    #box-container {
        --height: 250px;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 1280px) {
    #box-container {
        --height: 330px;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1920px) {
    #box-container {
        --height: 400px;
    }
}

@media only screen and (min-width: 2560px) {
    #box-container {
        --height: 480px;
    }
}


h1 {
    text-align: center;
    color: white;
    text-shadow:
        0 0 1px black,
        0 0 1px black,
        0 0 1px black,
        0 0 1px black;

}

#vimage {
    margin: auto;
    transition: transform 1.3s ease;
}

.reveal {
    transform: rotate(-1080deg) scale(0.1);
}


#box-container div {
    --width-height-ratio: 1.3;
    --lid-height-ratio: 0.2;
    --ribbon-height-ratio: 0.17;
    --width: calc(var(--width-height-ratio)*var(--height));
    --ribbon: calc(var(--ribbon-height-ratio)*var(--height));
}

#present {
    width: var(--width);
    margin: 0 auto;
}

#box,
#lid {
    background:
        -webkit-radial-gradient(white 15%, transparent 15%),
        -webkit-radial-gradient(white 15%, transparent 15%),
        rgba(235, 199, 0);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    position: relative;
}

#box {
    height: calc(var(--width)/var(--width-height-ratio));
}

#lid {
    height: calc(var(--lid-height-ratio)*var(--height));
    margin-top: calc((0.7)*var(--height));
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    background-color: rgba(250, 214, 0);
    z-index: 1;
    /* transitions */
    top: 0;
    left: 0;
    transition: ease-out 0.5s;
}

#box span {
    position: absolute;
    background: rgb(216, 52, 52);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}

#lid span {
    position: absolute;
    background: rgb(240, 58, 58);
}

#box span:first-child {
    width: 100%;
    height: var(--ribbon);
    top: calc((2/5)*var(--height)*(1 - var(--ribbon-height-ratio)));
}


#box span:last-child,
#lid span:first-child {
    width: var(--ribbon);
    height: 100%;
    left: calc((1/2)*var(--height)*(var(--width-height-ratio) - var(--ribbon-height-ratio)));
}

#lid span:nth-child(even) {
    width: calc((1.3)*var(--ribbon));
    height: calc((1.3)*var(--ribbon));
    right: calc((0.52)*var(--width));
    bottom: calc((1.4)*var(--ribbon));
}

#lid span:last-child {
    width: calc((1.3)*var(--ribbon));
    height: calc((1.3)*var(--ribbon));
    left: calc((0.52)*var(--width));
    bottom: calc((1.4)*var(--ribbon));
}

/* hover effects */
#present:hover #lid {
    top: calc((-0.3)*var(--height));
    transform: rotateZ(10deg);
    left: 10px;
}
</style>