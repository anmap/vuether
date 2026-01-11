import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'
import i18n from '../i18n/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        titleKey: 'home',
      },
    },
    {
      path: '/weather/:state/:city',
      name: 'city',
      component: CityView,
      meta: {
        titleKey: 'weather',
      },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const title = to.params.city 
    ? `${to.params.city}, ${to.params.state}` 
    : i18n.global.t(to.meta.titleKey as string || 'home');
  document.title = `${title} | ${i18n.global.t('documentTitle')}`;
  next();
});

export default router
