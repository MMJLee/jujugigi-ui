<template>

  <v-container v-if="email">
    <v-row justify="center">
      <v-col v-for="image in images" align="center">
        <Image :image="image" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageAPI from "@/api/image"
import { alert } from "@/mixins/alert"

export default {
  name: "me",
  mixins: [alert],
  data() {
    return {
      images: [],
      detailModal: false,
      loading: false,
      limit: 50,
      offset: 0
    };
  },
  computed: {
    email() { return this.$router.currentRoute.value.params.email },
  },
  created() {
    this.getUserImages({ "user_email": this.email, "limit": this.limit, "offset": this.offset })
  },
  watch: {
    email(newEmail, oldEmail) {
      if (newEmail) {
        this.images = []
        this.getUserImages({ "user_email": this.email, "limit": this.limit, "offset": this.offset })
      }
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
        if (res?.data?.length > 0) {
          this.images.push(...res.data)
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },
    showMoreImages() {
      this.limit += 50
      this.offset += 50
      this.getUserImages({ "user_email": this.email, "limit": this.limit, "offset": this.offset })
    },
    closeImageDetail() {
      this.detailModal = false
    }
  }
};
</script>