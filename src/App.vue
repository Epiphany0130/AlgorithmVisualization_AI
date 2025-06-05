<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <h1 class="title">
            <el-icon><Cpu /></el-icon>
            算法可视化教学平台
          </h1>
          <el-menu
            mode="horizontal"
            :default-active="$route.path"
            class="nav-menu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="/">
              <el-icon><House /></el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="/dfs">
              <el-icon><Share /></el-icon>
              深度优先搜索 (DFS)
            </el-menu-item>
            <el-menu-item index="/bfs">
              <el-icon><Grid /></el-icon>
              广度优先搜索 (BFS)
            </el-menu-item>
            <el-menu-item index="/quiz">
              <el-icon><Edit /></el-icon>
              算法测试
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleMenuSelect(index) {
      this.$router.push(index)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #e6f3ff 0%, #cce7ff 30%, #a3d4ff 70%, #66b3ff 100%);
  min-height: 100vh;
}

.header {
  background: rgba(66, 140, 255, 0.4);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(66, 140, 255, 0.3);
  padding: 0;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 8px 32px rgba(66, 140, 255, 0.25);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  flex-wrap: nowrap;
  min-width: 0;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 10px;
  }
  
  .title {
    font-size: 18px;
    min-width: 0;
    flex-shrink: 1;
  }
  
  .nav-menu .el-menu-item {
    margin: 0 4px;
    padding: 0 12px;
    font-size: 14px;
  }
}

.title {
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-menu {
  background: transparent;
  border: none;
  flex-wrap: nowrap;
  overflow: visible;
}

.nav-menu .el-menu-item {
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 12px;
  margin: 0 8px;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-menu .el-menu-item:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
}

.nav-menu .el-menu-item.is-active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  border-bottom: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.el-container {
  min-height: 100vh;
}
</style>