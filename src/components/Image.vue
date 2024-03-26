<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-img :src="image.signedURL" v-bind="props" @click="detailModal = true" align="center" min-width="300"
            max-width="400" max-height="600">
            <v-expand-transition>
                <div v-if="isHovering" class="d-flex text-h6 v-card--reveal align-end"
                    :style="{ 'color': rarity_map[image.rarity_name] }">
                    [{{ image.rarity_name }}] <br> {{ image.description }}
                </div>
            </v-expand-transition>
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                </div>
            </template>
        </v-img>
    </v-hover>
    <v-dialog v-model="detailModal">
        <v-img :src="image.signedURL" @click="detailModal = false" max-width="95vw" max-height="95vh"
            class="bg-grey-lighten-2">
            <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
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
            rarity_map: { "Common": "white", "Uncommon": "green", "Rare": "blue", "Epic": "purple", "Legendary": "orange" }
        }
    }
};
</script>
<style>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
}
</style>