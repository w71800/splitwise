import { createRouter, createWebHistory } from 'vue-router'
import Add from "@/views/Add.vue"
import Friends from "@/views/Friends.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/add", component: Add },
    { path: "/friends", component: Friends }
  ]
})

export default router
