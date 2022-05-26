import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/Dashboard.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')

        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../components/Admin/Orders/index.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            component: () => import('../components/Admin/Categories/index.vue')
        },
        {
            path: '/dishes',
            name: 'dishes',
            component: () => import('../components/Admin/Dishes/index.vue')
        },
        {
            path: '/clients',
            name: 'clients',
            component: () => import('../components/Admin/Clients/index.vue')
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: '/login',
        }
    ]
})

export default router
