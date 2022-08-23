import { createPinia } from 'pinia';
import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from '../view/popUp.vue';

library.add(fas);
createApp(App).use(createPinia());
createApp(App)
.component('fa', FontAwesomeIcon)
.mount('#app')
