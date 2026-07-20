import { store } from './store.js';
import { NavBar } from './components/NavBar.js';
import { HomePage } from './pages/HomePage.js';
import { CreatePage } from './pages/CreatePage.js';
import { DetailPage } from './pages/DetailPage.js';
import { MyPage } from './pages/MyPage.js';

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreatePage },
  { path: '/detail/:id', component: DetailPage },
  { path: '/my', component: MyPage }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const app = Vue.createApp({
  components: { NavBar },
  template: `
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <NavBar />
  `,
  setup() {
    store.init();
  }
});

app.use(router);
app.mount('#app');
