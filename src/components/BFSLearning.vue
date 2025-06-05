<template>
  <div class="bfs-learning">
    <!-- 顶部导航 -->
    <div class="learning-header">
      <el-steps :active="currentStep" align-center>
        <el-step title="算法介绍" description="了解BFS基本概念"></el-step>
        <el-step title="代码模板" description="学习BFS代码结构"></el-step>
        <el-step title="可视化演示" description="观看算法执行过程"></el-step>
        <el-step title="交互练习" description="动手实践操作"></el-step>
      </el-steps>
    </div>

    <!-- 语言选择器 -->
    <div class="language-selector">
      <el-radio-group v-model="selectedLanguage" @change="onLanguageChange">
        <el-radio-button label="cpp">C++</el-radio-button>
        <el-radio-button label="java">Java</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 步骤1: 算法介绍 -->
    <div v-if="currentStep === 0" class="step-content">
      <el-card class="intro-card">
        <h2>广度优先搜索 (BFS) 算法介绍</h2>
        <div class="intro-content">
          <div class="concept-section">
            <h3>🤔 什么是BFS？</h3>
            <p>广度优先搜索（Breadth-First Search，BFS）是一种用于遍历或搜索树或图的算法。它会先访问距离起始节点最近的节点，然后逐层向外扩展。</p>
            
            <h3>🎯 BFS的核心思想</h3>
            <ul>
              <li><strong>广度优先</strong>：优先访问同一层的所有节点</li>
              <li><strong>队列实现</strong>：利用队列的先进先出特性</li>
              <li><strong>层次遍历</strong>：按层次逐步扩展搜索范围</li>
              <li><strong>最短路径</strong>：在无权图中能找到最短路径</li>
            </ul>

            <h3>🆚 BFS vs DFS</h3>
            <div class="comparison">
              <div class="comparison-item">
                <h4>BFS (广度优先)</h4>
                <ul>
                  <li>使用队列数据结构</li>
                  <li>层次遍历，先访问同层节点</li>
                  <li>能找到最短路径</li>
                  <li>空间复杂度较高</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>DFS (深度优先)</h4>
                <ul>
                  <li>使用栈数据结构（递归）</li>
                  <li>深度遍历，先访问深层节点</li>
                  <li>适合路径搜索问题</li>
                  <li>空间复杂度较低</li>
                </ul>
              </div>
            </div>

            <h3>🌍 BFS的应用场景</h3>
            <ul>
              <li><strong>最短路径</strong>：在无权图中寻找最短路径</li>
              <li><strong>层次遍历</strong>：二叉树的层次遍历</li>
              <li><strong>连通性检测</strong>：检查图的连通性</li>
              <li><strong>拓扑排序</strong>：有向无环图的拓扑排序</li>
            </ul>
          </div>
        </div>
        <div class="step-actions">
          <el-button type="primary" size="large" @click="nextStep">
            下一步：学习代码模板
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 步骤2: 代码模板 -->
    <div v-if="currentStep === 1" class="step-content">
      <el-card class="code-card">
        <h2>BFS 代码模板学习</h2>
        <div class="code-explanation">
          <h3>📝 标准BFS模板</h3>
          <p>together learn BFS standard implementation template：</p>
          
          <div class="code-container">
            <pre class="code-block" v-if="selectedLanguage === 'cpp'"><code>// C++ BFS 模板
#include &lt;vector&gt;
#include &lt;queue&gt;
using namespace std;

// 四个方向：右、下、上、左
int dir[4][2] = {0, 1, 1, 0, -1, 0, 0, -1};

void bfs(vector&lt;vector&lt;char&gt;&gt;& grid, vector&lt;vector&lt;bool&gt;&gt;& visited, int x, int y) {
    queue&lt;pair&lt;int, int&gt;&gt; que;  // 定义队列
    que.push({x, y});         // 起始节点加入队列
    visited[x][y] = true;     // 标记为已访问
    
    while (!que.empty()) {    // 队列不为空时继续
        pair&lt;int, int&gt; cur = que.front();
        que.pop();            // 取出队首元素
        
        int curx = cur.first;
        int cury = cur.second;
        
        // 处理当前节点
        // ... 在这里添加对当前节点的处理逻辑
        
        // 遍历四个方向
        for (int i = 0; i &lt; 4; i++) {
            int nextx = curx + dir[i][0];
            int nexty = cury + dir[i][1];
            
            // 边界检查
            if (nextx &lt; 0 || nextx &gt;= grid.size() || 
                nexty &lt; 0 || nexty &gt;= grid[0].size()) {
                continue;
            }
            
            // 如果未访问过
            if (!visited[nextx][nexty]) {
                que.push({nextx, nexty});  // 加入队列
                visited[nextx][nexty] = true;  // 立即标记
            }
        }
    }
}</code></pre>
            
            <pre class="code-block" v-if="selectedLanguage === 'java'"><code>// Java BFS 模板
import java.util.*;

public class BFS {
    // 四个方向：右、下、左、上
    private int[][] dir = {0, 1, 1, 0, -1, 0, 0, -1};
    
    public void bfs(char[][] grid, boolean[][] visited, int x, int y) {
        Queue&lt;int[]&gt; queue = new LinkedList&lt;&gt;();  // 定义队列
        queue.offer(new int[]{x, y});          // 起始节点加入队列
        visited[x][y] = true;                   // 标记为已访问
        
        while (!queue.isEmpty()) {              // 队列不为空时继续
            int[] cur = queue.poll();           // 取出队首元素
            int curx = cur[0];
            int cury = cur[1];
            
            // 处理当前节点
            // ... 在这里添加对当前节点的处理逻辑
            
            // 遍历四个方向
            for (int i = 0; i &lt; 4; i++) {
                int nextx = curx + dir[i][0];
                int nexty = cury + dir[i][1];
                
                // 边界检查
                if (nextx &lt; 0 || nextx &gt;= grid.length || 
                    nexty &lt; 0 || nexty &gt;= grid[0].length) {
                    continue;
                }
                
                // 如果未访问过
                if (!visited[nextx][nexty]) {
                    queue.offer(new int[]{nextx, nexty});  // 加入队列
                    visited[nextx][nexty] = true;          // 立即标记
                }
            }
        }
    }
}</code></pre>
          </div>

          <div class="code-explanation-details">
            <h3>🔍 代码详解</h3>
            <div class="explanation-item" v-for="(item, index) in codeExplanations" :key="index">
              <div class="explanation-number">{{ index + 1 }}</div>
              <div class="explanation-content">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="key-points">
            <h3>⚠️ 重要注意事项</h3>
            <el-alert title="关键点" type="warning" :closable="false">
              <ul>
                <li><strong>立即标记</strong>：节点一旦加入队列就要立即标记为已访问，避免重复访问</li>
                <li><strong>边界检查</strong>：访问数组元素前必须检查边界，防止越界</li>
                <li><strong>队列操作</strong>：使用队列的先进先出特性保证层次遍历</li>
                <li><strong>方向数组</strong>：使用方向数组简化四个方向的遍历</li>
              </ul>
            </el-alert>
          </div>
        </div>
        
        <div class="step-actions">
          <el-button @click="prevStep">上一步</el-button>
          <el-button type="primary" size="large" @click="nextStep">
            下一步：可视化演示
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 步骤3: 可视化演示 -->
    <div v-if="currentStep === 2" class="step-content">
      <el-card class="visualization-card">
        <h2>🏰 BFS 迷宫寻路演示</h2>
        <div class="visualization-content">
          <div class="scenario-selector">
            <h3>🎮 演示场景</h3>
            <div class="scenario-info">
              <span class="scenario-badge">🏰 迷宫寻路演示</span>
            </div>
          </div>

          <div class="demo-controls">
            <el-button type="primary" @click="startDemo" :disabled="isPlaying">
              <el-icon><VideoPlay /></el-icon>
              开始演示
            </el-button>
            <el-button @click="pauseDemo" :disabled="!isPlaying">
              <el-icon><VideoPause /></el-icon>
              暂停
            </el-button>
            <el-button @click="resetDemo">
              <el-icon><RefreshRight /></el-icon>
              重置
            </el-button>

            <el-slider
              v-model="playSpeed"
              :min="1"
              :max="5"
              :step="1"
              show-stops
              style="width: 200px; margin-left: 20px;"
            >
              <template #default="{ value }">
                <span>速度: {{ value }}x</span>
              </template>
            </el-slider>
          </div>

          <div class="demo-area">
            <div class="grid-container">
              <div class="scenario-description">
                <h4>{{ getScenarioDescription() }}</h4>
              </div>
              <div class="maze-grid">
                <div 
                  v-for="(row, i) in grid" 
                  :key="i" 
                  class="grid-row"
                >
                  <div 
                    v-for="(cell, j) in row" 
                    :key="j" 
                    :class="['grid-cell', 'maze-cell', cell.type, cell.status]"
                    :style="getCellStyle(cell)"
                  >
                    <div class="cell-content">
                      <span v-if="cell.type === 'start'" class="cell-icon">🚀</span>
                      <span v-else-if="cell.type === 'target'" class="cell-icon">🎯</span>
                      <span v-else-if="cell.type === 'treasure'" class="cell-icon">💎</span>
                      <span v-else-if="cell.type === 'water' && selectedScenario === 'island'" class="cell-icon">🌊</span>
                      <span v-else-if="cell.type === 'wall' && selectedScenario === 'maze'" class="cell-icon">🧱</span>
                      <span v-if="cell.distance !== null && cell.status === 'visited'" class="distance">{{ cell.distance }}</span>
                      <div v-if="cell.status === 'visiting'" class="ripple-effect"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="legend">
                <div class="legend-item">
                  <div class="legend-color start"></div>
                  <span>🚀 起始点</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color target"></div>
                  <span>🎯 目标点</span>
                </div>
                <div class="legend-item" v-if="selectedScenario === 'maze'">
                  <div class="legend-color wall"></div>
                  <span>🧱 墙壁</span>
                </div>
                <div class="legend-item" v-if="selectedScenario === 'island'">
                  <div class="legend-color water"></div>
                  <span>🌊 海水</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color visiting"></div>
                  <span>🔍 正在探索</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color visited"></div>
                  <span>✅ 已探索</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color path"></div>
                  <span>🛤️ 最短路径</span>
                </div>
              </div>
            </div>
            
            <div class="demo-info">
              <div class="current-step-info">
                <h3>🎬 当前步骤</h3>
                <p>{{ currentDemoStep }}</p>
              </div>
              <div class="queue-info">
                <h3>📋 探索队列</h3>
                <div class="queue">
                  <div class="queue-label">队首 →</div>
                  <div v-for="(item, index) in queue" :key="index" 
                       :class="['queue-item', { 'next-item': index === 0 }]">
                    ({{ item.x }}, {{ item.y }})
                    <span class="queue-distance">距离:{{ item.level }}</span>
                  </div>
                  <div class="queue-label">← 队尾</div>
                  <div v-if="queue.length === 0" class="empty-queue">队列为空</div>
                </div>
              </div>
              <div class="stats-info">
                <h3>📊 探索统计</h3>
                <div class="stats">
                  <div class="stat-item">
                    <span class="stat-label">🎯 当前层数：</span>
                    <span class="stat-value">{{ currentLevel }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">✅ 已探索节点：</span>
                    <span class="stat-value">{{ visitedCount }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">📋 队列长度：</span>
                    <span class="stat-value">{{ queue.length }}</span>
                  </div>
                  <div class="stat-item" v-if="pathFound">
                    <span class="stat-label">🛤️ 最短距离：</span>
                    <span class="stat-value">{{ shortestDistance }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="step-actions">
          <el-button @click="prevStep">上一步</el-button>
          <el-button type="primary" size="large" @click="nextStep">
            下一步：交互练习
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 步骤4: 交互练习 -->
    <div v-if="currentStep === 3" class="step-content">
      <el-card class="practice-card">
        <h2>BFS 交互练习</h2>
        <div class="practice-content">
          <div class="practice-instructions">
            <h3>🎮 练习说明</h3>
            <p>现在轮到你来操作了！按照BFS的规则，一步步完成搜索过程。</p>
            <div class="practice-rules">
              <el-alert title="练习规则" type="info" :closable="false">
                <ul>
                  <li>从起始点开始，按照BFS的层次遍历规则</li>
                  <li>每次只能访问队列中的第一个节点</li>
                  <li>访问节点后，将其未访问的邻居加入队列</li>
                  <li>重复直到找到目标或队列为空</li>
                </ul>
              </el-alert>
            </div>
          </div>

          <div class="practice-area">
            <div class="practice-grid-container">
              <div class="practice-grid">
                <div 
                  v-for="(row, i) in practiceGrid" 
                  :key="i" 
                  class="grid-row"
                >
                  <div 
                    v-for="(cell, j) in row" 
                    :key="j" 
                    :class="['grid-cell', 'practice-cell', cell.type, cell.status]"
                    @click="onCellClick(i, j)"
                  >
                    <span v-if="cell.distance !== null" class="distance">{{ cell.distance }}</span>
                  </div>
                </div>
              </div>
              
              <div class="practice-controls">
                <el-button @click="resetPractice">
                  <el-icon><RefreshRight /></el-icon>
                  重新开始
                </el-button>
                <el-button type="success" @click="showHint">
                  <el-icon><QuestionFilled /></el-icon>
                  提示
                </el-button>
                <el-button type="warning" @click="autoStep">
                  <el-icon><DArrowRight /></el-icon>
                  自动下一步
                </el-button>
              </div>
            </div>
            
            <div class="practice-info">
              <div class="practice-progress">
                <h3>练习进度</h3>
                <el-progress :percentage="practiceProgress" :status="practiceStatus"></el-progress>
              </div>
              
              <div class="practice-queue">
                <h3>当前队列</h3>
                <div class="queue">
                  <div v-if="practiceQueue.length === 0" class="empty-queue">队列为空</div>
                  <div v-for="(item, index) in practiceQueue" :key="index" 
                       :class="['queue-item', { 'next-to-visit': index === 0 }]">
                    ({{ item.x }}, {{ item.y }})
                  </div>
                </div>
              </div>
              
              <div class="practice-feedback">
                <h3>操作反馈</h3>
                <div class="feedback-message" :class="feedbackType">
                  {{ feedbackMessage }}
                </div>
              </div>
              
              <div class="practice-stats">
                <h3>统计信息</h3>
                <div class="stats">
                  <div class="stat-item">
                    <span class="stat-label">步数：</span>
                    <span class="stat-value">{{ practiceSteps }}</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">已访问：</span>
                    <span class="stat-value">{{ practiceVisitedCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="step-actions">
          <el-button @click="prevStep">上一步</el-button>
          <el-button type="success" size="large" @click="completeLearning">
            完成学习
            <el-icon><Check /></el-icon>
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { VideoPlay, VideoPause, RefreshRight, Refresh, ArrowRight, QuestionFilled, Check } from '@element-plus/icons-vue'

export default {
  name: 'BFSLearning',
  components: {
    VideoPlay,
    VideoPause,
    RefreshRight,
    Refresh,
    ArrowRight,
    QuestionFilled,
    Check
  },
  data() {
    return {
      currentStep: 0,
      selectedLanguage: 'cpp',
      selectedScenario: 'maze',
      isPlaying: false,
      playSpeed: 2,
      currentDemoStep: '准备开始BFS演示...',
      queue: [],
      currentLevel: 0,
      visitedCount: 0,
      pathFound: false,
      shortestDistance: 0,
      
      // 代码解释
      codeExplanations: [
        {
          title: '初始化队列',
          description: '创建队列并将起始节点加入，同时标记为已访问。队列保证了先进先出的访问顺序。'
        },
        {
          title: '队列循环',
          description: '当队列不为空时继续循环，这保证了所有可达节点都会被访问到。'
        },
        {
          title: '取出节点',
          description: '从队列头部取出一个节点进行处理，这体现了广度优先的特点。'
        },
        {
          title: '遍历邻居',
          description: '检查当前节点的所有邻居，通常是上下左右四个方向。'
        },
        {
          title: '边界检查',
          description: '确保不会访问越界的位置，这是数组操作的基本安全措施。'
        },
        {
          title: '加入队列',
          description: '将未访问的邻居加入队列尾部，并立即标记为已访问避免重复。'
        }
      ],
      
      // 演示网格
      grid: [],
      
      // 练习相关
      practiceGrid: [],
      practiceQueue: [],
      practiceProgress: 0,
      practiceStatus: '',
      practiceSteps: 0,
      practiceVisitedCount: 0,
      feedbackMessage: '点击队列中的第一个节点开始练习',
      feedbackType: 'info',
      
      demoTimer: null,
      
      // 方向数组
      directions: [
        { x: 0, y: 1 },   // 右
        { x: 1, y: 0 },   // 下
        { x: -1, y: 0 },  // 上
        { x: 0, y: -1 }   // 左
      ]
    }
  },
  mounted() {
    // 从本地存储读取语言选择
    const savedLang = localStorage.getItem('selectedLanguage')
    if (savedLang) {
      this.selectedLanguage = savedLang
    }
    
    // 初始化网格
    this.initGrid()
    this.initPractice()
  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },
    
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    
    onLanguageChange(lang) {
      localStorage.setItem('selectedLanguage', lang)
    },

    // 场景切换
    onScenarioChange() {
      this.resetDemo()
      this.initGrid()
    },

    // 生成新迷宫

    // 获取场景名称
    getScenarioName() {
      const names = {
        maze: '迷宫',
        island: '岛屿',
        flood: '区域'
      }
      return names[this.selectedScenario] || '场景'
    },

    // 获取场景描述
    getScenarioDescription() {
      const descriptions = {
        maze: '🏰 在迷宫中寻找从起点到终点的最短路径，BFS保证找到的是最短路径！',
        island: '🏝️ 探索岛屿之间的连接，寻找从一个岛屿到另一个岛屿的最短路径！',
        flood: '🌊 模拟洪水填充效果，观察BFS如何层层扩散到达目标区域！'
      }
      return descriptions[this.selectedScenario] || ''
    },

    // 获取单元格样式
    getCellStyle(cell) {
      const styles = {}
      
      if (cell.status === 'visiting') {
        styles.animation = 'pulse 0.6s ease-in-out infinite'
      }
      
      if (cell.status === 'path') {
        styles.background = 'linear-gradient(45deg, #FFD700, #FFA500)'
        styles.animation = 'pathGlow 1s ease-in-out infinite alternate'
      }
      
      return styles
    },
    
    // 初始化演示网格
    initGrid() {
      if (this.selectedScenario === 'maze') {
        this.generateMaze()
      } else if (this.selectedScenario === 'island') {
        this.generateIsland()
      } else if (this.selectedScenario === 'flood') {
        this.generateFloodFill()
      }
    },

    // 生成简单迷宫场景
    generateMaze() {
      const rows = 8
      const cols = 12
      this.grid = []
      
      // 初始化全部为空地
      for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
          row.push({
            type: 'empty',
            status: 'unvisited',
            distance: null
          })
        }
        this.grid.push(row)
      }
      
      // 添加简单的墙壁障碍
      this.addSimpleWalls()
      
      // 设置起始点和目标点
      this.grid[1][1].type = 'start'
      this.grid[rows-2][cols-2].type = 'target'
    },

    // 添加简单的墙壁障碍
    addSimpleWalls() {
      const rows = this.grid.length
      const cols = this.grid[0].length
      
      // 添加边界墙壁
      for (let i = 0; i < rows; i++) {
        this.grid[i][0].type = 'wall'
        this.grid[i][cols-1].type = 'wall'
      }
      for (let j = 0; j < cols; j++) {
        this.grid[0][j].type = 'wall'
        this.grid[rows-1][j].type = 'wall'
      }
      
      // 添加几个简单的内部障碍
      // 水平障碍
      for (let j = 3; j <= 5; j++) {
        this.grid[3][j].type = 'wall'
      }
      
      // 垂直障碍
      for (let i = 2; i <= 4; i++) {
        this.grid[i][8].type = 'wall'
      }
      
      // L形障碍
      this.grid[5][3].type = 'wall'
      this.grid[5][4].type = 'wall'
      this.grid[4][4].type = 'wall'
    },



    // 生成岛屿场景
    generateIsland() {
      const rows = 10
      const cols = 14
      this.grid = []
      
      for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
          let type = 'water'
          
          // 生成几个岛屿
          if ((i >= 2 && i <= 4 && j >= 2 && j <= 5) ||
              (i >= 6 && i <= 8 && j >= 8 && j <= 11) ||
              (i >= 1 && i <= 3 && j >= 9 && j <= 12) ||
              (i >= 5 && i <= 7 && j >= 1 && j <= 3)) {
            type = 'empty'
          }
          
          row.push({
            type: type,
            status: 'unvisited',
            distance: null
          })
        }
        this.grid.push(row)
      }
      
      // 设置起始点和目标点
      this.grid[3][3].type = 'start'
      this.grid[7][10].type = 'target'
      
      // 添加一些宝藏
      this.grid[2][11].type = 'treasure'
      this.grid[6][2].type = 'treasure'
    },

    // 生成洪水填充场景
    generateFloodFill() {
      const rows = 10
      const cols = 12
      this.grid = []
      
      for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
          let type = 'empty'
          
          // 创建一些区域边界
          if (i === 0 || i === rows-1 || j === 0 || j === cols-1 ||
              (i === 4 && j >= 3 && j <= 8) ||
              (j === 6 && i >= 1 && i <= 3)) {
            type = 'wall'
          }
          
          row.push({
            type: type,
            status: 'unvisited',
            distance: null
          })
        }
        this.grid.push(row)
      }
      
      // 设置起始点（洪水源）
      this.grid[2][2].type = 'start'
      this.grid[7][9].type = 'target'
    },
    
    // 演示相关方法
    startDemo() {
      console.log('开始演示被点击')
      this.resetDemo()
      this.isPlaying = true
      console.log('网格状态:', this.grid)
      console.log('选择的场景:', this.selectedScenario)
      this.runBFSDemo()
    },
    
    pauseDemo() {
      this.isPlaying = false
      if (this.demoTimer) {
        clearTimeout(this.demoTimer)
      }
    },
    
    resetDemo() {
      this.isPlaying = false
      if (this.demoTimer) {
        clearTimeout(this.demoTimer)
      }
      
      // 重置网格状态
      this.grid.forEach(row => {
        row.forEach(cell => {
          if (cell.type !== 'wall' && cell.type !== 'water') {
            cell.status = 'unvisited'
            cell.distance = null
          }
        })
      })
      
      this.queue = []
      this.currentLevel = 0
      this.visitedCount = 0
      this.pathFound = false
      this.shortestDistance = 0
      this.currentDemoStep = `准备开始${this.getScenarioName()}BFS演示...`
    },
    
    runBFSDemo() {
      console.log('runBFSDemo 开始执行')
      // 找到起始点
      let startX, startY
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          if (this.grid[i][j].type === 'start') {
            startX = i
            startY = j
            console.log('找到起始点:', startX, startY)
            break
          }
        }
        if (startX !== undefined) break
      }
      
      if (startX === undefined) {
        console.log('未找到起始点！')
        this.currentDemoStep = '❌ 未找到起始点！'
        return
      }
      
      // 初始化
      this.queue = [{ x: startX, y: startY, level: 0, parent: null }]
      this.grid[startX][startY].status = 'queued'
      this.grid[startX][startY].distance = 0
      this.visitedCount = 1
      this.pathFound = false
      this.currentDemoStep = `🚀 从起点 (${startX}, ${startY}) 开始探索...`
      
      const processQueue = () => {
        console.log('processQueue 被调用，队列长度:', this.queue.length, 'isPlaying:', this.isPlaying)
        if (!this.isPlaying || this.queue.length === 0) {
          console.log('停止处理队列：isPlaying=', this.isPlaying, 'queue.length=', this.queue.length)
          this.isPlaying = false
          return
        }
        
        // 取出队首元素
        const current = this.queue.shift()
        console.log('处理节点:', current)
        this.currentLevel = current.level
        this.currentDemoStep = `🔍 正在探索位置 (${current.x}, ${current.y})，当前距离: ${current.level}`
        
        // 标记为正在访问
        if (this.grid[current.x][current.y].type !== 'target') {
          this.grid[current.x][current.y].status = 'visiting'
        }
        
        setTimeout(() => {
          if (!this.isPlaying) {
            console.log('setTimeout回调中检测到isPlaying为false，停止执行')
            return
          }
          
          // 检查是否到达目标
          if (this.grid[current.x][current.y].type === 'target') {
            this.pathFound = true
            this.shortestDistance = current.level
            this.currentDemoStep = `🎯 找到目标！最短距离为 ${current.level} 步`
            this.isPlaying = false
            
            // 高亮最短路径
            this.highlightPath(current)
            return
          }
          
          // 标记为已访问
          if (this.grid[current.x][current.y].type !== 'target') {
            this.grid[current.x][current.y].status = 'visited'
          }
          
          // 遍历四个方向
          this.directions.forEach(dir => {
            const newX = current.x + dir.x
            const newY = current.y + dir.y
            
            // 边界检查
            if (newX >= 0 && newX < this.grid.length && 
                newY >= 0 && newY < this.grid[0].length) {
              const cell = this.grid[newX][newY]
              
              // 检查是否可以访问（根据不同场景调整逻辑）
              let canVisit = false
              if (this.selectedScenario === 'maze') {
                canVisit = cell.status === 'unvisited' && 
                          (cell.type === 'empty' || cell.type === 'target')
              } else if (this.selectedScenario === 'island') {
                canVisit = cell.status === 'unvisited' && 
                          (cell.type === 'empty' || cell.type === 'target' || cell.type === 'treasure')
              } else if (this.selectedScenario === 'flood') {
                canVisit = cell.status === 'unvisited' && 
                          (cell.type === 'empty' || cell.type === 'target')
              }
              
              console.log(`检查邻居 (${newX}, ${newY}): type=${cell.type}, status=${cell.status}, canVisit=${canVisit}`)
              
              if (canVisit) {
                cell.status = 'queued'
                cell.distance = current.level + 1
                this.queue.push({ 
                  x: newX, 
                  y: newY, 
                  level: current.level + 1,
                  parent: current
                })
                this.visitedCount++
              }
            }
          })
          
          // 继续处理队列中的下一个节点
          if (this.isPlaying && this.queue.length > 0) {
            this.demoTimer = setTimeout(processQueue, 1200 / this.playSpeed)
          } else if (this.queue.length === 0 && !this.pathFound) {
            this.currentDemoStep = '❌ 无法到达目标！目标可能被阻挡。'
            this.isPlaying = false
          }
        }, 400 / this.playSpeed)
      }
      
      this.demoTimer = setTimeout(processQueue, 800 / this.playSpeed)
    },

    // 高亮最短路径
    highlightPath(targetNode) {
      const path = []
      let current = targetNode
      
      // 回溯路径
      while (current && current.parent) {
        path.unshift(current)
        current = current.parent
      }
      
      // 逐步高亮路径
      let index = 0
      const highlightNext = () => {
        if (index < path.length) {
          const node = path[index]
          if (this.grid[node.x][node.y].type !== 'target') {
            this.grid[node.x][node.y].status = 'path'
          }
          index++
          setTimeout(highlightNext, 200)
        }
      }
      
      setTimeout(highlightNext, 500)
    },
    
    // 练习相关方法
    initPractice() {
      // 创建一个简化的练习网格
      const rows = 6
      const cols = 8
      this.practiceGrid = []
      
      for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
          let type = 'empty'
          
          // 设置起始点
          if (i === 1 && j === 1) {
            type = 'start'
          }
          // 设置目标点
          else if (i === 4 && j === 6) {
            type = 'target'
          }
          // 设置一些障碍物
          else if (
            (i === 2 && j >= 3 && j <= 4) ||
            (i === 3 && j === 2)
          ) {
            type = 'wall'
          }
          
          row.push({
            type: type,
            status: 'unvisited',
            distance: null
          })
        }
        this.practiceGrid.push(row)
      }
      
      // 初始化练习状态
      this.practiceQueue = [{ x: 1, y: 1 }]
      this.practiceGrid[1][1].status = 'visited'
      this.practiceGrid[1][1].distance = 0
      this.practiceSteps = 0
      this.practiceVisitedCount = 1
      this.practiceProgress = 0
      this.feedbackMessage = '点击队列中的第一个节点 (1, 1) 开始练习'
      this.feedbackType = 'info'
    },
    
    onCellClick(x, y) {
      // 检查是否点击了队列中的第一个节点
      if (this.practiceQueue.length === 0) {
        this.feedbackMessage = '🎉 练习已完成或队列为空！'
        this.feedbackType = 'warning'
        return
      }
      
      const nextNode = this.practiceQueue[0]
      if (x !== nextNode.x || y !== nextNode.y) {
        this.feedbackMessage = `❌ 请点击队列中的第一个节点 (${nextNode.x}, ${nextNode.y})，这是BFS的核心规则！`
        this.feedbackType = 'error'
        return
      }
      
      // 正确点击，处理当前节点
      this.processNode(x, y)
    },
    
    processNode(x, y) {
      // 从队列中移除当前节点
      this.practiceQueue.shift()
      this.practiceSteps++
      
      // 检查是否到达目标
      if (this.practiceGrid[x][y].type === 'target') {
        this.feedbackMessage = '恭喜！你成功找到了目标！'
        this.feedbackType = 'success'
        this.practiceProgress = 100
        this.practiceStatus = 'success'
        return
      }
      
      // 遍历四个方向，添加未访问的邻居到队列
      let addedCount = 0
      this.directions.forEach(dir => {
        const newX = x + dir.x
        const newY = y + dir.y
        
        // 边界检查
        if (newX >= 0 && newX < this.practiceGrid.length && 
            newY >= 0 && newY < this.practiceGrid[0].length) {
          const cell = this.practiceGrid[newX][newY]
          
          // 如果是未访问的非障碍物
          if (cell.status === 'unvisited' && cell.type !== 'wall') {
            cell.status = 'visited'
            cell.distance = this.practiceGrid[x][y].distance + 1
            this.practiceQueue.push({ x: newX, y: newY })
            this.practiceVisitedCount++
            addedCount++
          }
        }
      })
      
      // 更新进度
      const totalCells = this.practiceGrid.length * this.practiceGrid[0].length
      this.practiceProgress = (this.practiceVisitedCount / totalCells) * 100
      
      // 更新反馈
      if (this.practiceQueue.length === 0) {
        this.feedbackMessage = '队列为空，搜索结束。目标可能不可达。'
        this.feedbackType = 'warning'
      } else {
        this.feedbackMessage = `很好！添加了 ${addedCount} 个邻居到队列。下一个访问 (${this.practiceQueue[0].x}, ${this.practiceQueue[0].y})`
        this.feedbackType = 'success'
      }
    },
    
    resetPractice() {
      this.initPractice()
    },
    
    showHint() {
      if (this.practiceQueue.length > 0) {
        const next = this.practiceQueue[0]
        this.feedbackMessage = `提示：下一个应该访问的节点是 (${next.x}, ${next.y})`
        this.feedbackType = 'info'
      } else {
        this.feedbackMessage = '提示：队列为空，练习已结束。'
        this.feedbackType = 'info'
      }
    },
    
    autoStep() {
      if (this.practiceQueue.length > 0) {
        const next = this.practiceQueue[0]
        this.processNode(next.x, next.y)
      }
    },
    
    completeLearning() {
      this.$message.success('恭喜完成BFS学习！')
      this.$router.push('/')
    }
  },
  
  beforeUnmount() {
    if (this.demoTimer) {
      clearTimeout(this.demoTimer)
    }
  }
}
</script>

<style scoped>
.bfs-learning {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.learning-header {
  margin-bottom: 30px;
  background: rgba(66, 140, 255, 0.35);
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(66, 140, 255, 0.4);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.25);
}

.language-selector {
  text-align: center;
  margin-bottom: 20px;
}

.step-content {
  margin-bottom: 20px;
}

.intro-card, .code-card, .visualization-card, .practice-card {
  background: rgba(66, 140, 255, 0.35);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(66, 140, 255, 0.4);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.25);
  backdrop-filter: blur(20px);
}

.intro-card h2, .code-card h2, .visualization-card h2, .practice-card h2 {
  color: #e65100;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  text-shadow: 0 2px 8px rgba(230, 81, 0, 0.3);
  font-weight: 600;
}

.concept-section h3 {
  color: #ff6f00;
  margin: 20px 0 10px 0;
  font-size: 20px;
  text-shadow: 0 2px 6px rgba(255, 111, 0, 0.4);
  font-weight: 600;
}

.concept-section ul {
  margin: 15px 0;
  padding-left: 20px;
}

.concept-section li {
  margin: 8px 0;
  line-height: 1.6;
  color: #bf360c;
}

.comparison {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.comparison-item {
  flex: 1;
  padding: 20px;
  background: linear-gradient(135deg, #569aff 0%, #428cff 50%, #2267e6 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(66, 140, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(66, 140, 255, 0.5);
  backdrop-filter: blur(10px);
}

.comparison-item h4 {
  margin: 0 0 15px 0;
  font-size: 18px;
}

.comparison-item ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-item li {
  margin: 8px 0;
  font-size: 14px;
}

.code-container {
  margin: 20px 0;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

.code-explanation-details {
  margin-top: 30px;
}

.explanation-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin: 15px 0;
  padding: 15px;
  background: rgba(255, 245, 240, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(255, 165, 0, 0.15);
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.1);
}

.explanation-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8c42, #ff6b35);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(255, 140, 66, 0.4);
}

.explanation-content h4 {
  margin: 0 0 5px 0;
  color: #d2691e;
}

.explanation-content p {
  margin: 0;
  color: #8b4513;
  line-height: 1.5;
}

.key-points {
  margin-top: 30px;
}

.key-points h3 {
  color: #e67e22;
  margin-bottom: 15px;
}

.key-points ul {
  margin: 10px 0;
  padding-left: 20px;
}

.key-points li {
  margin: 8px 0;
  line-height: 1.5;
}

/* 场景选择器样式 */
.scenario-selector {
  text-align: center;
  margin-bottom: 25px;
  padding: 20px;
  background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
  border-radius: 16px;
  color: #0277bd;
  box-shadow: 0 4px 15px rgba(2, 119, 189, 0.2);
  border: 1px solid rgba(2, 119, 189, 0.1);
  backdrop-filter: blur(10px);
}

.scenario-selector h3 {
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
}

.scenario-info {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.scenario-badge {
  background: rgba(255, 255, 255, 0.8);
  color: #0277bd;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid rgba(2, 119, 189, 0.2);
  box-shadow: 0 2px 8px rgba(2, 119, 189, 0.1);
}

.scenario-description {
  text-align: center;
  margin-bottom: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  color: #0277bd;
  font-weight: 600;
  border: 1px solid rgba(2, 119, 189, 0.2);
  box-shadow: 0 4px 12px rgba(2, 119, 189, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 204, 128, 0.25);
  border-radius: 18px;
  flex-wrap: wrap;
  border: 1px solid rgba(255, 152, 0, 0.3);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.demo-area {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.grid-container {
  flex: 1;
  min-width: 400px;
}

.maze-grid {
  display: inline-block;
  border: 3px solid #ff9800;
  border-radius: 20px;
  background: linear-gradient(135deg, #fff4e6, #ffe0b3);
  padding: 8px;
  box-shadow: 0 15px 40px rgba(255, 152, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.grid, .practice-grid {
  display: inline-block;
  border: 2px solid rgba(255, 152, 0, 0.4);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 30px rgba(255, 152, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 40px;
  height: 40px;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
}

/* 迷宫单元格样式 */
.maze-cell {
  width: 35px;
  height: 35px;
  border: none;
  margin: 2px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.cell-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cell-icon {
  font-size: 14px;
  z-index: 2;
}

/* 不同类型单元格样式 */
.grid-cell.empty {
  background: #f8f9fa;
}

.maze-cell.empty {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border: 1px solid #e9ecef;
}

.grid-cell.start, .maze-cell.start {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.6);
}

.grid-cell.start::before {
  content: 'S';
}

.grid-cell.target, .maze-cell.target {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.6);
}

.grid-cell.target::before {
  content: 'T';
}

.grid-cell.treasure, .maze-cell.treasure {
  background: linear-gradient(135deg, #26de81, #20bf6b);
  color: white;
  box-shadow: 0 0 10px rgba(38, 222, 129, 0.6);
}

.grid-cell.wall, .maze-cell.wall {
  background: linear-gradient(135deg, #6c757d, #495057);
  border: 1px solid #495057;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.grid-cell.water, .maze-cell.water {
  background: linear-gradient(135deg, #3498db, #2980b9);
  animation: waterWave 2s ease-in-out infinite;
}

.grid-cell.visiting, .maze-cell.visiting {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  animation: pulse 0.6s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
}

.grid-cell.queued, .maze-cell.queued {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
  color: white;
  animation: pulse 1s ease-in-out infinite;
}

.grid-cell.visited, .maze-cell.visited {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.grid-cell.path, .maze-cell.path {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
  animation: pathGlow 1s ease-in-out infinite alternate;
  box-shadow: 0 0 15px rgba(162, 155, 254, 0.8);
}

.practice-cell {
  cursor: pointer;
}

.practice-cell:hover {
  transform: scale(1.1);
}

.distance {
  font-size: 10px;
  position: absolute;
  bottom: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1px 3px;
  border-radius: 2px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
  z-index: 3;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
  }
  50% { 
    transform: scale(1.15);
    box-shadow: 0 0 30px rgba(255, 107, 107, 1);
  }
}

@keyframes pathGlow {
  0% { 
    box-shadow: 0 0 15px rgba(253, 203, 110, 0.8);
  }
  100% { 
    box-shadow: 0 0 25px rgba(253, 203, 110, 1);
  }
}

@keyframes waterWave {
  0%, 100% { 
    background: linear-gradient(135deg, #3498db, #2980b9);
  }
  50% { 
    background: linear-gradient(135deg, #5dade2, #3498db);
  }
}

.ripple-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  animation: ripple 1s ease-out infinite;
}

@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 30px;
    height: 30px;
    opacity: 0;
  }
}

.legend {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.legend-color {
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid #dee2e6;
}

.legend-color.start {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.4);
}

.legend-color.target {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 0 8px rgba(231, 76, 60, 0.4);
}

.legend-color.wall {
  background: linear-gradient(135deg, #34495e, #2c3e50);
}

.legend-color.water {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.legend-color.visiting {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  box-shadow: 0 0 8px rgba(255, 107, 107, 0.6);
}

.legend-color.visited {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.legend-color.path {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
  box-shadow: 0 0 8px rgba(162, 155, 254, 0.6);
}

.demo-info {
  width: 300px;
}

.current-step-info, .queue-info, .stats-info {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(240, 248, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
}

.current-step-info h3, .queue-info h3, .stats-info h3 {
  margin: 0 0 10px 0;
  color: #1e40af;
  font-size: 16px;
  font-weight: 600;
}

.queue {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 15px;
  background: linear-gradient(135deg, rgba(219, 234, 254, 0.6), rgba(191, 219, 254, 0.6));
  border-radius: 12px;
  min-height: 50px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
}

.queue-label {
  font-weight: bold;
  color: #1e40af;
  font-size: 13px;
  padding: 6px 10px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  backdrop-filter: blur(5px);
}

.queue-item {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: monospace;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.queue-item.next-item {
  background: linear-gradient(135deg, #28a745, #1e7e34);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  transform: scale(1.05);
  animation: nextItemPulse 1.5s ease-in-out infinite;
}

.queue-distance {
  font-size: 10px;
  opacity: 0.9;
}

.empty-queue {
  color: #6c757d;
  font-style: italic;
  padding: 10px;
}

@keyframes nextItemPulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
  }
  50% {
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);
  }
}

.queue-item.next-to-visit {
  background: #28a745;
  animation: pulse 1s infinite;
}

.empty-queue {
  color: #6c757d;
  font-style: italic;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
}

.stat-label {
  color: #6c757d;
  font-size: 14px;
}

.stat-value {
  color: #2c3e50;
  font-weight: bold;
}

.practice-area {
  display: flex;
  gap: 30px;
}

.practice-grid-container {
  flex: 1;
}

.practice-controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.practice-info {
  width: 300px;
}

.practice-progress, .practice-queue, .practice-feedback, .practice-stats {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(240, 248, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
}

.feedback-message {
  padding: 12px;
  border-radius: 10px;
  font-weight: 500;
  border: 1px solid;
}

.feedback-message.info {
  background: rgba(219, 234, 254, 0.6);
  color: #1e40af;
  border-color: rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(10px);
}

.feedback-message.success {
  background: rgba(240, 255, 240, 0.9);
  color: #2e7d32;
  border-color: rgba(46, 125, 50, 0.3);
}

.feedback-message.error {
  background: rgba(255, 240, 240, 0.9);
  color: #c62828;
  border-color: rgba(198, 40, 40, 0.3);
}

.feedback-message.warning {
  background: rgba(255, 248, 225, 0.9);
  color: #f57c00;
  border-color: rgba(245, 124, 0, 0.3);
}

.step-actions {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.step-actions .el-button {
  margin: 0 10px;
}

.practice-instructions {
  margin-bottom: 30px;
}

.practice-rules {
  margin-top: 15px;
}

.practice-rules ul {
  margin: 10px 0;
  padding-left: 20px;
}

.practice-rules li {
  margin: 5px 0;
}
</style>