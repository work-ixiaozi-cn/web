import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:windi.css';
import Router from './router';
// import {Clipboard} from "v-clipboard"

const app = createApp(App);
app.use(Router);
// app.use(Clipboard);
app.use(ElementPlus);
app.mount('#app');
