import { createRouter, createWebHistory } from 'vue-router'
import KMain from '@/pages/KMain'
import KRegistration from '@/pages/KRegistration'
import KLogin from '@/pages/KLogin'
import KChats from '@/pages/KChats'

import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'main',
    component: KMain,
    beforeEnter( to, from, next ) {
      axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( res => {
        if(!res.data.rows.length) {
          next('/login')
        }
        else {
          next()
        }
      })
      .catch( e => {
        next('login')
      })
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: KRegistration,
    beforeEnter( to, from, next ) {
      axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( res => {
        if(!res.data.rows.length) {
          next()
        }
        else {
          next('/')
        }
      })
      .catch( e => {
        next()
      })
    }
  },
  {
    path: '/login',
    name: 'login',
    component: KLogin,
    beforeEnter( to, from, next ) {
      axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( res => {
        if(!res.data.rows.length) {
          next()
        }
        else {
          next('/')
        }
      })
      .catch( e => {
        next()
      })
    }
  },
  {
    path: '/chats',
    name: 'chats',
    component: KChats,
    beforeEnter( to, from, next ) {
      axios.post(this.$store.state.urlPage + 'api/user/check', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then( res => {
        if(!res.data.rows.length) {
          next('/login')
        }
        else {
          next()
        }
      })
      .catch( e => {
        next('/login')
      })
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
