<template>
  <v-row>
    <v-col v-for="image in images" :key="image.id" class="d-flex child-flex" cols="4">
      <v-img :src="image.signedURL" class="bg-grey-lighten-2" cover>
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
import ImageAPI from '@/api/image'
import { alert } from '@/mixins/alert'

export default {
  name: 'Images',
  mixins: [alert],
  data() {
    return {
      user: this.$auth0.user,
      images: [],
      detailModal: false,
      loading: false,
      limit: 50,
      offset: 0
    };
  },
  watch: {
    async user(newValue) {
      if (newValue !== undefined) {
        await this.getUserImages({"limit": 50, "offset": 0, "user_email":newValue.email})
      }
    }
  },
  mounted() {
    if (this.user?.email) {
      this.getUserImages({"limit": 50, "offset": 0, "user_email": this.user.email})
    }
  },
  methods: {
    openDetails() {
      this.detailModal = true
    },
    async getUserImages(params) {
      this.loading = true
      try {
        let res = await ImageAPI.read(params)
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
@/api/image