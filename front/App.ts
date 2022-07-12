import { createApp } from "vue";

import Oruga from '@oruga-ui/oruga-next'
// @ts-ignore
import { bulmaConfig } from '@oruga-ui/theme-bulma'

import { createPinia } from 'pinia';
import { vueStore } from "./src/Store";
// @ts-ignore
import App from "./src/components/App.vue";

async function mountApp() {
  // Prepare application
  const app = createApp(App);
  app.use(Oruga, bulmaConfig);

  // Prepare store
  const pinia = createPinia();
  app.use(pinia);
  await vueStore().decideTasks();

  // Mount
  app.mount("#App");
}

mountApp();
