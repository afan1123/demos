import { createApp } from "vue";
import App from "./app.vue";
import myantdesign from "@myantdesign/components";
import "ant-design-vue/dist/antd.css";
const app = createApp(App);
app.use(myantdesign);
app.mount("#app");
