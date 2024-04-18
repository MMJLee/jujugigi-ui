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
const Auth0Client = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
  }
})
export function registerPlugins(app) {
  app
    .use(createPinia())
    .use(createVuetify({
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#c28291',
              secondary: '#FFFF00',
              background: '#fff0e1',
              surface: '#f0e1d2',
              'on-background': '#2d1e0f',
              'on-surface': '#1e0f00',
            }
          },
          dark: {
            dark: true,
            colors: {
              primary: '#dcafba',
              secondary: '#FFFF00',
              background: '#1e0f00',
              surface: '#2d1e0f',
              'on-background': '#f0e1d2',
              'on-surface': '#fff0e1',
            }
          }
        },
      }
    }
    ))
    .use(createRouter({ history: createWebHistory(process.env.BASE_URL), }))
    .use(Auth0Client)
}

export default Auth0Client