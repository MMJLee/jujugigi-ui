<template>
  <v-app-bar height="40">
    <v-row align="center">
      <v-col cols="1" align="center">
        <RouterLink to="/"> Home </RouterLink>
      </v-col>
      <v-col v-if="user" cols="1" offset="9" align="center">
        <RouterLink to="/me"> {{ user.name }} </RouterLink>
      </v-col>
      <v-col v-if="user" cols="1" align="center">
        <v-btn  @click="logout"> Logout </v-btn>
      </v-col>
      <v-col v-else cols="1" offset="10" align="center">
        <v-btn  @click="login"> Login </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      user: this.$auth0.user
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    }
  }
};
</script>

<style scoped lang="sass">
  
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
