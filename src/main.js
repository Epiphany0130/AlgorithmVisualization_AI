import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import Home from './components/Home.vue'
import DFSLearning from './components/DFSLearning.vue'
import BFSLearning from './components/BFSLearning.vue'
import QuizModule from './components/QuizModule.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dfs', component: DFSLearning },
  { path: '/bfs', component: BFSLearning },
  { path: '/quiz', component: QuizModule }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.mount('#app')