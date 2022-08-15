import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Camps  from './components/Camps.vue'
import App from './App.vue'
import Home from './components/Home.vue'

import './assets/main.css'

  // 2. Define some routes
  // Each route should map to a component.
  // We'll talk about nested routes later.
  const routes = [
    { 
      path: '/', 
      component: Home 
    },

    { 
      path: '/camps', 
      component: Camps 
    },

    { 
      path: '/camps/:id', 
      component: Camps 
    }
  ]

  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes, // short for `routes: routes`
  })

createApp(App).use(router).mount('#app')
