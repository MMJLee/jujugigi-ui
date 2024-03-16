/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createAuth0 } from '@auth0/auth0-vue';

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export function registerPlugins (app) {
  app
  .use(createPinia())
  .use(createVuetify({theme: {defaultTheme: 'dark',},}))
  .use(createRouter({history: createWebHistory(process.env.BASE_URL),}))
  .use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
      }
    })
  );
}