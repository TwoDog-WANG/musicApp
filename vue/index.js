import { createApp } from "vue";

import App from "./App.vue";
import store from "./component/store/main.js"

createApp(App)
.use(store)
.mount('#app')