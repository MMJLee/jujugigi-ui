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
  data () {
    return {
      user: this.$auth0.user
    };
  }
};
</script>
