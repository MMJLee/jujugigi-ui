<template>
  <v-container v-if="user">
    <v-row>
      <v-card width="400" class="mx-auto my-8">
        <v-row>
          <v-col cols="4">
            <v-img width="100":src="this.user.picture"></v-img>
          </v-col>
          <v-col>
            <p>name: {{user.name}}</p>
            <p>nickname: {{user.nickname}}</p>
            <p>email: {{user.email}}</p>
            <p>verified: {{ user.email_verified }}</p>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row>
      <Images/>
    </v-row>
  </v-container>
  <p v-else>Please Log In</p>
</template>

<script>
export default {
  name: 'me',
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