<template>
  <v-row>
    <v-btn></v-btn>
    <v-col v-for="image in images" :key="image.id" class="d-flex child-flex" cols="4">
      <v-img :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        :src="image.url" class="bg-grey-lighten-2" cover>
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  <ImageDetails
      v-if="detailModal"
      v-model="detailModal"
      @closeImageDetail="closeImageDetail">
  </ImageDetails>
</template>

<script>
import ImageApi from '@/axios/image'
import { alert } from '@/mixins/alert'
import ImageDetails from '@/components/products/BulkImageUpload.vue'

export default {
  name: 'Images',
  mixins: [displayError],
  data() {
    return {
      user: this.$auth0.user,
      images: [],
      detailModal: false,
      loading: false,
    };
  },

  async created() {
    await this.get_user_images()
  },
  methods: {
    openDetails() {
      this.detailModal = true
    },
    async getUserImages() {
      this.loading = true
      try {
        let res = await ImageApi.get_user_images(this.user.email)
        if (res?.data?.length > 0) this.images = res.data
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },
    closeImageDetail() {
      this.detailModal = false
    }
  }
};
</script>

<style scoped lang="sass">

</style>@/mixins/alert
