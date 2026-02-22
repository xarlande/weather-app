import dayjs from "dayjs";
import "dayjs/locale/uk";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

dayjs.locale("uk");

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
