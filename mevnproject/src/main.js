// main.js

import Vue from 'vue'
import App from './App.vue'

// importing Bootstrap add-ons that I downloaded
// tutorial for downloading Bootstrap: https://www.youtube.com/watch?v=jSLj1h87W5Y
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery; // this just allows us to use $ to access jQuery more easily
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/app.scss'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import CreatePost from './components/CreatePost.vue';
import EditPost from './components/EditPost.vue';
import ViewPost from './components/ViewPost.vue';
import IndexPost from './components/IndexPost.vue';

import HomeComponent from './components/HomeComponent.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'createPost',
      path: '/createPost',
      component: CreatePost
  },
  {
      name: 'posts',
      path: '/posts',
      component: IndexPost
  },
  {
      name: 'editPost',
      path: '/editPost/:id',
      component: EditPost
  },
  {
      name: 'viewPost',
      path: '/viewPost/:id',
      component: ViewPost
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');