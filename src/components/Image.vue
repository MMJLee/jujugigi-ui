<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-img :src="image?.signedURL" v-bind="props" @click="detailModal = true" align="center">
            <v-expand-transition>
                <div v-if="isHovering" class="d-flex text-h5 v-card--reveal align-end glow"
                    :style="{ 'text-shadow': glow(image?.rarity) }">
                    [{{ rarity_name[image?.rarity] }}] <br> {{ image?.description }}
                </div>
            </v-expand-transition>
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>
    </v-hover>
    <v-dialog v-model="detailModal">
        <v-img :src="image?.signedURL" @click="detailModal = false" max-width="95vw" max-height="95vh"
            class="bg-grey-lighten-2">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>
    </v-dialog>
</template>

<script>
export default {
    name: 'Image',
    props: ['image'],
    data() {
        return {
            detailModal: false,
            rarity_name: { "1": "Common", "2": "Uncommon", "3": "Rare", "4": "Epic", "5": "Unique" },
            rarity_color: { "1": "white", "2": "green", "3": "blue", "4": "purple", "5": "orange" }
        }
    },
    methods: {
        glow(rarity) {
            let glowStr = '0 0 5px ' + this.rarity_color[rarity]
            if (rarity >= 3) {
                glowStr += ', ' + '0 0 10px ' + this.rarity_color[rarity]
                if (rarity >= 4) {
                    glowStr += ', ' + '0 0 15px ' + this.rarity_color[rarity]
                    glowStr += ', ' + '0 0 15px ' + this.rarity_color[rarity]
                    if (rarity >= 5) {
                        glowStr += ', ' + '0 0 20px ' + this.rarity_color[rarity]
                        glowStr += ', ' + '0 0 20px ' + this.rarity_color[rarity]
                    }
                }
            }
            return glowStr
        }
    }
}
</script>
<style>
.v-card--reveal {
    color: white;
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
}
</style>