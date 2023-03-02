import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Todos from '../pages/todos/Todos.vue';
import Todo from '../pages/todos/_TodoId.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },
    {
      path: '/todos/:id',
      name: 'todo',
      component: Todo,
    },
  ],
});
// 1. /home 2. /todos 3. todos/create 4. /todos/:id

export default router;
