import Vue from 'vue'
import Router from 'vue-router'
import Top from './components/Top.vue'
import Project from './components/Project.vue'

Vue.use(Router)

export default new Router({
  // デフォルトの挙動では URL に `#` が含まれる.
  // URL から hash を取り除くには `mode:history` を指定する
  mode: 'history',                  
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/project/:project_id',
      name: 'Project',
      component: Project
    }
  ]
})