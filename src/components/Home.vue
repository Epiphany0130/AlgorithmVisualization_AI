<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">欢迎来到算法可视化教学平台</h1>
      <p class="hero-subtitle">通过交互式可视化学习深度优先搜索(DFS)和广度优先搜索(BFS)算法</p>
    </div>

    <div class="algorithm-cards">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card class="algorithm-card dfs-card" shadow="hover" @click="goToDFS">
            <div class="card-content">
              <div class="card-icon">
                <el-icon size="60"><Share /></el-icon>
              </div>
              <h2>深度优先搜索 (DFS)</h2>
              <p>学习递归思想，掌握回溯算法的核心原理</p>
              <div class="features">
                <el-tag type="success">递归实现</el-tag>
                <el-tag type="info">回溯思想</el-tag>
                <el-tag type="warning">栈结构</el-tag>
              </div>
              <el-button type="primary" size="large" class="start-btn">
                开始学习 DFS
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card class="algorithm-card bfs-card" shadow="hover" @click="goToBFS">
            <div class="card-content">
              <div class="card-icon">
                <el-icon size="60"><Grid /></el-icon>
              </div>
              <h2>广度优先搜索 (BFS)</h2>
              <p>学习层次遍历，理解队列数据结构的应用</p>
              <div class="features">
                <el-tag type="success">队列实现</el-tag>
                <el-tag type="info">层次遍历</el-tag>
                <el-tag type="warning">最短路径</el-tag>
              </div>
              <el-button type="primary" size="large" class="start-btn">
                开始学习 BFS
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <!-- 练习模块 -->
      <el-row :gutter="30" style="margin-top: 30px;">
        <el-col :span="12">
          <el-card class="algorithm-card quiz-card" shadow="hover" @click="goToQuiz">
            <div class="card-content">
              <div class="card-icon">
                <el-icon size="60"><Edit /></el-icon>
              </div>
              <h2>算法知识测试</h2>
              <p>通过题目测试你对 DFS 和 BFS 算法的掌握程度</p>
              <div class="features">
                <el-tag type="success">10道题目</el-tag>
                <el-tag type="info">即时反馈</el-tag>
                <el-tag type="warning">分数评估</el-tag>
              </div>
              <el-button type="primary" size="large" class="start-btn">
                开始测试
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card class="algorithm-card maze-card" shadow="hover" @click="goToMaze">
            <div class="card-content">
              <div class="card-icon">
                <el-icon size="60"><Grid /></el-icon>
              </div>
              <h2>迷宫求解游戏</h2>
              <p>在迷宫中实际体验 DFS 和 BFS 算法的寻路过程</p>
              <div class="features">
                <el-tag type="success">可视化求解</el-tag>
                <el-tag type="info">算法对比</el-tag>
                <el-tag type="warning">代码展示</el-tag>
              </div>
              <el-button type="primary" size="large" class="start-btn">
                开始游戏
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="language-selection">
      <el-card class="language-card">
        <h3>选择你熟悉的编程语言</h3>
        <p>我们提供 C++ 和 Java 两种语言的代码示例和讲解</p>
        <div class="language-buttons">
          <el-button 
            :type="selectedLanguage === 'cpp' ? 'primary' : 'default'"
            size="large"
            @click="selectLanguage('cpp')"
            class="lang-btn"
          >
            <div class="lang-content">
              <div class="lang-icon">C++</div>
              <div class="lang-desc">高性能系统编程</div>
            </div>
          </el-button>
          <el-button 
            :type="selectedLanguage === 'java' ? 'primary' : 'default'"
            size="large"
            @click="selectLanguage('java')"
            class="lang-btn"
          >
            <div class="lang-content">
              <div class="lang-icon">Java</div>
              <div class="lang-desc">跨平台面向对象</div>
            </div>
          </el-button>
        </div>
      </el-card>
    </div>

    <div class="features-section">
      <h3>平台特色</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40" color="#67C23A"><View /></el-icon>
            <h4>可视化</h4>
            <p>直观动画展示算法执行过程</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40" color="#ffffff"><Edit /></el-icon>
            <h4>交互式学习</h4>
            <p>一步步引导，边学边练</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="feature-item">
            <el-icon size="40" color="#E6A23C"><Document /></el-icon>
            <h4>代码模板</h4>
            <p>提供标准的算法实现模板</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      selectedLanguage: 'cpp'
    }
  },
  methods: {
    goToDFS() {
      this.$router.push('/dfs')
    },
    goToBFS() {
      this.$router.push('/bfs')
    },
    goToQuiz() {
      this.$router.push('/quiz')
    },
    goToMaze() {
      this.$router.push('/maze')
    },

    selectLanguage(lang) {
      this.selectedLanguage = lang
      // 保存到本地存储
      localStorage.setItem('selectedLanguage', lang)
      this.$message.success(`已选择 ${lang === 'cpp' ? 'C++' : 'Java'} 语言`)
    }
  },
  mounted() {
    // 从本地存储读取语言选择
    const savedLang = localStorage.getItem('selectedLanguage')
    if (savedLang) {
      this.selectedLanguage = savedLang
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.hero-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px 20px;
  background: rgba(66, 140, 255, 0.5);
  border-radius: 25px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(66, 140, 255, 0.6);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.3);
}

.hero-title {
  font-size: 36px;
  color: white;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.algorithm-cards {
  margin-bottom: 50px;
}

.algorithm-card {
  height: 350px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.algorithm-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.dfs-card {
  background: linear-gradient(135deg, #569aff 0%, #428cff 50%, #2267e6 100%);
  color: white;
  border: 1px solid rgba(66, 140, 255, 0.5);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.3);
}

.bfs-card {
  background: linear-gradient(135deg, #569aff 0%, #428cff 50%, #2267e6 100%);
  color: white;
  border: 1px solid rgba(66, 140, 255, 0.5);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.3);
}

.quiz-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 1px solid rgba(102, 126, 234, 0.5);
  box-shadow: 0 16px 40px rgba(102, 126, 234, 0.3);
}

.maze-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.oj-card {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.card-content {
  text-align: center;
  padding: 30px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-icon {
  margin-bottom: 20px;
}

.card-content h2 {
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: bold;
}

.card-content p {
  font-size: 16px;
  margin-bottom: 20px;
  opacity: 0.9;
  line-height: 1.5;
}

.features {
  margin-bottom: 25px;
}

.features .el-tag {
  margin: 0 5px 5px 0;
}

.start-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: bold;
}

.language-selection {
  margin-bottom: 50px;
}

.language-card {
  text-align: center;
  padding: 30px;
  background: rgba(66, 140, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(66, 140, 255, 0.6);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.3);
}

.language-card h3 {
  color: white;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.language-card p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  font-size: 16px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.language-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.lang-btn {
  height: 80px;
  width: 150px;
  padding: 15px;
}

.lang-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lang-icon {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.lang-desc {
  font-size: 12px;
  opacity: 0.8;
}

.features-section {
  background: rgba(66, 140, 255, 0.5);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(66, 140, 255, 0.6);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.3);
}

.features-section h3 {
  color: white;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-item {
  text-align: center;
  padding: 20px;
  background: rgba(66, 140, 255, 0.6);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(66, 140, 255, 0.7);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(66, 140, 255, 0.3);
}

.feature-item h4 {
  color: white;
  margin: 15px 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.feature-item p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>