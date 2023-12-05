import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Create from '../components/Create.vue';
import Edit from '../components/Edit.vue';
import List from '../components/List.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  }
  ,
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
