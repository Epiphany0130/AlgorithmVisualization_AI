<template>
  <div class="maze-game">
    <div class="game-header">
      <h1 class="game-title">
        <el-icon><Grid /></el-icon>
        迷宫求解游戏
      </h1>
      <p class="game-subtitle">使用 DFS 或 BFS 算法找到从起点到终点的路径</p>
    </div>

    <div class="game-controls">
      <div class="control-group">
        <el-button-group>
          <el-button 
            type="primary" 
            @click="generateMaze"
            :loading="generating"
          >
            <el-icon><Refresh /></el-icon>
            生成新迷宫
          </el-button>
          <el-button 
            type="success" 
            @click="solveMaze('dfs')"
            :disabled="solving || !mazeGenerated"
          >
            <el-icon><Share /></el-icon>
            DFS 求解
          </el-button>
          <el-button 
            type="info" 
            @click="solveMaze('bfs')"
            :disabled="solving || !mazeGenerated"
          >
            <el-icon><Grid /></el-icon>
            BFS 求解
          </el-button>
          <el-button 
            @click="clearPath"
            :disabled="!pathFound"
          >
            <el-icon><Delete /></el-icon>
            清除路径
          </el-button>
        </el-button-group>
      </div>
      
      <div class="control-group">
        <span>迷宫大小：</span>
        <el-slider
          v-model="mazeSize"
          :min="10"
          :max="25"
          :step="1"
          :disabled="solving"
          @change="generateMaze"
          style="width: 150px; margin: 0 10px;"
        />
        <span>{{ mazeSize }} × {{ mazeSize }}</span>
      </div>
      
      <div class="control-group">
        <span>动画速度：</span>
        <el-slider
          v-model="animationSpeed"
          :min="1"
          :max="10"
          :step="1"
          style="width: 150px; margin: 0 10px;"
        />
        <span>{{ animationSpeed }}</span>
      </div>
    </div>

    <div class="game-stats" v-if="stats.algorithm">
      <el-card class="stats-card">
        <div class="stat-item">
          <span class="stat-label">算法：</span>
          <span class="stat-value">{{ stats.algorithm.toUpperCase() }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">访问节点数：</span>
          <span class="stat-value">{{ stats.visitedNodes }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">路径长度：</span>
          <span class="stat-value">{{ stats.pathLength }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">用时：</span>
          <span class="stat-value">{{ stats.timeElapsed }}ms</span>
        </div>
      </el-card>
    </div>

    <div class="maze-container">
      <div class="maze-grid" :style="{ gridTemplateColumns: `repeat(${mazeSize}, 1fr)` }">
        <div
          v-for="(cell, index) in maze"
          :key="index"
          :class="getCellClass(cell, index)"
          class="maze-cell"
          @click="handleCellClick(index)"
        >
          <div v-if="cell.isStart" class="cell-icon start">🚀</div>
          <div v-else-if="cell.isEnd" class="cell-icon end">🎯</div>
          <div v-else-if="cell.isPath" class="cell-icon path">●</div>
        </div>
      </div>
    </div>

    <div class="code-section" v-if="stats.algorithm">
      <el-card class="code-card">
        <template #header>
          <div class="code-header">
            <span class="code-title">
              <el-icon><Document /></el-icon>
              {{ stats.algorithm.toUpperCase() }} 算法实现代码
            </span>
            <el-radio-group v-model="selectedLanguage" size="small">
              <el-radio-button label="cpp">C++</el-radio-button>
              <el-radio-button label="java">Java</el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <div class="code-content">
          <pre><code :class="`language-${selectedLanguage}`" v-html="highlightedCode"></code></pre>
        </div>
      </el-card>
    </div>

    <div class="applications-section" v-if="stats.algorithm">
      <el-card class="applications-card">
        <template #header>
          <div class="applications-header">
            <span class="applications-title">
              <el-icon><Star /></el-icon>
              {{ stats.algorithm.toUpperCase() }} 算法实际应用案例
            </span>
          </div>
        </template>
        <div class="applications-content">
          <div v-if="stats.algorithm === 'dfs'" class="application-list">
            <div class="application-item">
              <h4><el-icon><Files /></el-icon> 文件系统遍历</h4>
              <p>操作系统中遍历文件夹结构，深度优先搜索可以递归地访问每个子目录，直到到达最深层，然后回溯到上一级继续搜索。</p>
              <div class="example">例如：查找特定文件、计算目录大小、文件备份等</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Connection /></el-icon> 图的连通性检测</h4>
              <p>在社交网络分析中，DFS可以用来检测用户群体的连通性，找出彼此相连的用户群组。</p>
              <div class="example">例如：朋友圈分析、社区发现、影响力传播路径分析</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Cpu /></el-icon> 编译器语法分析</h4>
              <p>编译器在解析代码时使用DFS遍历抽象语法树(AST)，进行语法检查和代码优化。</p>
              <div class="example">例如：变量作用域检查、死代码消除、函数调用链分析</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Trophy /></el-icon> 游戏AI决策树</h4>
              <p>在棋类游戏中，DFS用于搜索可能的走法，评估每种策略的优劣，实现游戏AI。</p>
              <div class="example">例如：象棋AI、围棋AI、五子棋AI的决策算法</div>
            </div>
          </div>
          <div v-else-if="stats.algorithm === 'bfs'" class="application-list">
            <div class="application-item">
              <h4><el-icon><Navigation /></el-icon> 最短路径导航</h4>
              <p>GPS导航系统使用BFS的变种算法(如Dijkstra算法)来寻找两点间的最短路径，为用户提供最优路线。</p>
              <div class="example">例如：地图导航、物流配送路线优化、公交换乘方案</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Share /></el-icon> 社交网络分析</h4>
              <p>在社交媒体中，BFS用于分析用户间的关系距离，找出最近的共同好友或推荐潜在好友。</p>
              <div class="example">例如：六度分隔理论验证、好友推荐、影响力分析</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Monitor /></el-icon> 网络爬虫</h4>
              <p>搜索引擎的网络爬虫使用BFS策略，从种子页面开始，逐层抓取网页内容，确保广度覆盖。</p>
              <div class="example">例如：搜索引擎索引构建、网站地图生成、链接分析</div>
            </div>
            <div class="application-item">
              <h4><el-icon><Picture /></el-icon> 图像处理</h4>
              <p>在图像编辑软件中，BFS用于实现"油漆桶"工具，从点击点开始向外扩散填充相同颜色的区域。</p>
              <div class="example">例如：区域填充、边缘检测、图像分割、连通区域标记</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="game-legend">
      <div class="legend-item">
        <div class="legend-color wall"></div>
        <span>墙壁</span>
      </div>
      <div class="legend-item">
        <div class="legend-color path"></div>
        <span>通路</span>
      </div>
      <div class="legend-item">
        <div class="legend-color visited"></div>
        <span>已访问</span>
      </div>
      <div class="legend-item">
        <div class="legend-color solution"></div>
        <span>解决路径</span>
      </div>
      <div class="legend-item">
        <div class="legend-color start"></div>
        <span>起点 🚀</span>
      </div>
      <div class="legend-item">
        <div class="legend-color end"></div>
        <span>终点 🎯</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MazeGame',
  data() {
    return {
      mazeSize: 15,
      maze: [],
      mazeGenerated: false,
      generating: false,
      solving: false,
      pathFound: false,
      animationSpeed: 2,
      startPos: null,
      endPos: null,
      selectedLanguage: 'cpp',
      stats: {
        algorithm: '',
        visitedNodes: 0,
        pathLength: 0,
        timeElapsed: 0
      },
      algorithmCodes: {
        dfs: {
          cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class MazeSolver {
private:
    vector<vector<int>> maze;
    vector<vector<bool>> visited;
    int rows, cols;
    vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
public:
    MazeSolver(vector<vector<int>>& m) : maze(m) {
        rows = maze.size();
        cols = maze[0].size();
        visited.assign(rows, vector<bool>(cols, false));
    }
    
    bool solveDFS(int startX, int startY, int endX, int endY) {
        stack<pair<int, int>> st;
        st.push({startX, startY});
        visited[startX][startY] = true;
        
        while (!st.empty()) {
            auto [x, y] = st.top();
            st.pop();
            
            // 到达终点
            if (x == endX && y == endY) {
                return true;
            }
            
            // 探索四个方向
            for (auto [dx, dy] : directions) {
                int newX = x + dx;
                int newY = y + dy;
                
                if (isValid(newX, newY) && !visited[newX][newY] && maze[newX][newY] == 0) {
                    visited[newX][newY] = true;
                    st.push({newX, newY});
                }
            }
        }
        return false;
    }
    
private:
    bool isValid(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
};`,
          java: `import java.util.*;

public class MazeSolver {
    private int[][] maze;
    private boolean[][] visited;
    private int rows, cols;
    private int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
    public MazeSolver(int[][] maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
        this.visited = new boolean[rows][cols];
    }
    
    public boolean solveDFS(int startX, int startY, int endX, int endY) {
        Stack<int[]> stack = new Stack<>();
        stack.push(new int[]{startX, startY});
        visited[startX][startY] = true;
        
        while (!stack.isEmpty()) {
            int[] current = stack.pop();
            int x = current[0];
            int y = current[1];
            
            // 到达终点
            if (x == endX && y == endY) {
                return true;
            }
            
            // 探索四个方向
            for (int[] dir : directions) {
                int newX = x + dir[0];
                int newY = y + dir[1];
                
                if (isValid(newX, newY) && !visited[newX][newY] && maze[newX][newY] == 0) {
                    visited[newX][newY] = true;
                    stack.push(new int[]{newX, newY});
                }
            }
        }
        return false;
    }
    
    private boolean isValid(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}`
        },
        bfs: {
          cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class MazeSolver {
private:
    vector<vector<int>> maze;
    vector<vector<bool>> visited;
    int rows, cols;
    vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
public:
    MazeSolver(vector<vector<int>>& m) : maze(m) {
        rows = maze.size();
        cols = maze[0].size();
        visited.assign(rows, vector<bool>(cols, false));
    }
    
    bool solveBFS(int startX, int startY, int endX, int endY) {
        queue<pair<int, int>> q;
        q.push({startX, startY});
        visited[startX][startY] = true;
        
        while (!q.empty()) {
            auto [x, y] = q.front();
            q.pop();
            
            // 到达终点
            if (x == endX && y == endY) {
                return true;
            }
            
            // 探索四个方向
            for (auto [dx, dy] : directions) {
                int newX = x + dx;
                int newY = y + dy;
                
                if (isValid(newX, newY) && !visited[newX][newY] && maze[newX][newY] == 0) {
                    visited[newX][newY] = true;
                    q.push({newX, newY});
                }
            }
        }
        return false;
    }
    
private:
    bool isValid(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
};`,
          java: `import java.util.*;

public class MazeSolver {
    private int[][] maze;
    private boolean[][] visited;
    private int rows, cols;
    private int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    
    public MazeSolver(int[][] maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
        this.visited = new boolean[rows][cols];
    }
    
    public boolean solveBFS(int startX, int startY, int endX, int endY) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{startX, startY});
        visited[startX][startY] = true;
        
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0];
            int y = current[1];
            
            // 到达终点
            if (x == endX && y == endY) {
                return true;
            }
            
            // 探索四个方向
            for (int[] dir : directions) {
                int newX = x + dir[0];
                int newY = y + dir[1];
                
                if (isValid(newX, newY) && !visited[newX][newY] && maze[newX][newY] == 0) {
                    visited[newX][newY] = true;
                    queue.offer(new int[]{newX, newY});
                }
            }
        }
        return false;
    }
    
    private boolean isValid(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}`
        }
      }
    }
  },
  computed: {
    highlightedCode() {
      if (!this.stats.algorithm) return ''
      const code = this.algorithmCodes[this.stats.algorithm][this.selectedLanguage]
      return this.highlightCode(code, this.selectedLanguage)
    }
  },
  mounted() {
    this.generateMaze()
  },
  methods: {
    // 生成迷宫
    async generateMaze() {
      this.generating = true
      this.clearPath()
      
      // 初始化迷宫（全部为墙）
      this.maze = Array(this.mazeSize * this.mazeSize).fill().map(() => ({
        isWall: true,
        isPath: false,
        isVisited: false,
        isStart: false,
        isEnd: false,
        isSolution: false
      }))
      
      // 使用递归回溯算法生成迷宫
      await this.generateMazeRecursive(1, 1)
      
      // 设置起点和终点
      this.setStartAndEnd()
      
      this.mazeGenerated = true
      this.generating = false
    },
    
    // 递归回溯生成迷宫
    async generateMazeRecursive(x, y) {
      const index = y * this.mazeSize + x
      this.maze[index].isWall = false
      this.maze[index].isPath = true
      
      // 随机方向
      const directions = [
        [0, -2], [2, 0], [0, 2], [-2, 0]
      ].sort(() => Math.random() - 0.5)
      
      for (const [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy
        const newIndex = newY * this.mazeSize + newX
        
        if (newX > 0 && newX < this.mazeSize - 1 && 
            newY > 0 && newY < this.mazeSize - 1 && 
            this.maze[newIndex].isWall) {
          
          // 打通中间的墙
          const midX = x + dx / 2
          const midY = y + dy / 2
          const midIndex = midY * this.mazeSize + midX
          this.maze[midIndex].isWall = false
          this.maze[midIndex].isPath = true
          
          await this.generateMazeRecursive(newX, newY)
        }
      }
    },
    
    // 设置起点和终点
    setStartAndEnd() {
      // 起点设在左上角附近的通路
      for (let i = 1; i < this.mazeSize; i++) {
        for (let j = 1; j < this.mazeSize; j++) {
          const index = i * this.mazeSize + j
          if (this.maze[index].isPath) {
            this.maze[index].isStart = true
            this.startPos = { x: j, y: i, index }
            break
          }
        }
        if (this.startPos) break
      }
      
      // 终点设在右下角附近的通路
      for (let i = this.mazeSize - 2; i >= 0; i--) {
        for (let j = this.mazeSize - 2; j >= 0; j--) {
          const index = i * this.mazeSize + j
          if (this.maze[index].isPath && !this.maze[index].isStart) {
            this.maze[index].isEnd = true
            this.endPos = { x: j, y: i, index }
            break
          }
        }
        if (this.endPos) break
      }
    },
    
    // 求解迷宫
    async solveMaze(algorithm) {
      if (!this.mazeGenerated || this.solving) return
      
      this.solving = true
      this.clearPath()
      
      const startTime = Date.now()
      let result
      
      if (algorithm === 'dfs') {
        result = await this.solveDFS()
      } else {
        result = await this.solveBFS()
      }
      
      const endTime = Date.now()
      
      this.stats = {
        algorithm,
        visitedNodes: result.visitedCount,
        pathLength: result.path ? result.path.length : 0,
        timeElapsed: endTime - startTime
      }
      
      if (result.path) {
        await this.animatePath(result.path)
        this.pathFound = true
      } else {
        this.$message.error('未找到路径！')
      }
      
      this.solving = false
    },
    
    // DFS 求解
    async solveDFS() {
      const visited = new Set()
      const path = []
      let visitedCount = 0
      
      const dfs = async (x, y) => {
        const index = y * this.mazeSize + x
        
        if (x < 0 || x >= this.mazeSize || y < 0 || y >= this.mazeSize ||
            this.maze[index].isWall || visited.has(index)) {
          return false
        }
        
        visited.add(index)
        visitedCount++
        path.push({ x, y, index })
        
        // 动画显示访问过程
        if (!this.maze[index].isStart && !this.maze[index].isEnd) {
          this.maze[index].isVisited = true
        }
        
        await this.sleep(100 / this.animationSpeed)
        
        // 到达终点
        if (this.maze[index].isEnd) {
          return true
        }
        
        // 尝试四个方向
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        for (const [dx, dy] of directions) {
          if (await dfs(x + dx, y + dy)) {
            return true
          }
        }
        
        // 回溯
        path.pop()
        return false
      }
      
      const found = await dfs(this.startPos.x, this.startPos.y)
      return {
        path: found ? path : null,
        visitedCount
      }
    },
    
    // BFS 求解
    async solveBFS() {
      const queue = [{ x: this.startPos.x, y: this.startPos.y, path: [this.startPos] }]
      const visited = new Set([this.startPos.index])
      let visitedCount = 0
      
      while (queue.length > 0) {
        const { x, y, path } = queue.shift()
        const index = y * this.mazeSize + x
        
        visitedCount++
        
        // 动画显示访问过程
        if (!this.maze[index].isStart && !this.maze[index].isEnd) {
          this.maze[index].isVisited = true
        }
        
        await this.sleep(100 / this.animationSpeed)
        
        // 到达终点
        if (this.maze[index].isEnd) {
          return {
            path,
            visitedCount
          }
        }
        
        // 探索四个方向
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        for (const [dx, dy] of directions) {
          const newX = x + dx
          const newY = y + dy
          const newIndex = newY * this.mazeSize + newX
          
          if (newX >= 0 && newX < this.mazeSize && 
              newY >= 0 && newY < this.mazeSize &&
              !this.maze[newIndex].isWall && 
              !visited.has(newIndex)) {
            
            visited.add(newIndex)
            queue.push({
              x: newX,
              y: newY,
              path: [...path, { x: newX, y: newY, index: newIndex }]
            })
          }
        }
      }
      
      return {
        path: null,
        visitedCount
      }
    },
    
    // 动画显示路径
    async animatePath(path) {
      for (const { index } of path) {
        if (!this.maze[index].isStart && !this.maze[index].isEnd) {
          this.maze[index].isSolution = true
        }
        await this.sleep(50 / this.animationSpeed)
      }
    },
    
    // 清除路径
    clearPath() {
      this.maze.forEach(cell => {
        cell.isVisited = false
        cell.isSolution = false
      })
      this.pathFound = false
      this.stats = {
        algorithm: '',
        visitedNodes: 0,
        pathLength: 0,
        timeElapsed: 0
      }
    },
    
    // 获取单元格样式类
    getCellClass(cell, index) {
      return {
        'wall': cell.isWall,
        'path': cell.isPath && !cell.isWall,
        'visited': cell.isVisited,
        'solution': cell.isSolution,
        'start': cell.isStart,
        'end': cell.isEnd
      }
    },
    
    // 处理单元格点击（可以用于手动设置起点终点）
    handleCellClick(index) {
      if (this.solving || !this.mazeGenerated) return
      // 这里可以添加手动设置起点终点的逻辑
    },
    
    // 延时函数
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    
    // 简单的代码高亮
    highlightCode(code, language) {
      if (!code) return ''
      
      // 先转义HTML特殊字符
      let highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      
      if (language === 'cpp') {
        // C++ 关键字高亮 - 使用简单的字符串替换
        const keywords = {
          'class': '<span class="keyword">class</span>',
          'private': '<span class="keyword">private</span>',
          'public': '<span class="keyword">public</span>',
          'bool': '<span class="keyword">bool</span>',
          'int': '<span class="keyword">int</span>',
          'void': '<span class="keyword">void</span>',
          'vector': '<span class="keyword">vector</span>',
          'stack': '<span class="keyword">stack</span>',
          'queue': '<span class="keyword">queue</span>',
          'pair': '<span class="keyword">pair</span>',
          'auto': '<span class="keyword">auto</span>',
          'return': '<span class="keyword">return</span>',
          'if': '<span class="keyword">if</span>',
          'while': '<span class="keyword">while</span>',
          'for': '<span class="keyword">for</span>',
          'true': '<span class="keyword">true</span>',
          'false': '<span class="keyword">false</span>',
          'using': '<span class="keyword">using</span>',
          'namespace': '<span class="keyword">namespace</span>'
        }
        
        Object.keys(keywords).forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'g')
          highlighted = highlighted.replace(regex, keywords[keyword])
        })
        
        // 预处理指令高亮
        highlighted = highlighted.replace(/#include/g, '<span class="keyword">#include</span>')
        
      } else if (language === 'java') {
        // Java 关键字高亮
        const keywords = {
          'import': '<span class="keyword">import</span>',
          'public': '<span class="keyword">public</span>',
          'private': '<span class="keyword">private</span>',
          'class': '<span class="keyword">class</span>',
          'boolean': '<span class="keyword">boolean</span>',
          'int': '<span class="keyword">int</span>',
          'void': '<span class="keyword">void</span>',
          'new': '<span class="keyword">new</span>',
          'this': '<span class="keyword">this</span>',
          'return': '<span class="keyword">return</span>',
          'if': '<span class="keyword">if</span>',
          'while': '<span class="keyword">while</span>',
          'for': '<span class="keyword">for</span>',
          'true': '<span class="keyword">true</span>',
          'false': '<span class="keyword">false</span>',
          'Stack': '<span class="keyword">Stack</span>',
          'Queue': '<span class="keyword">Queue</span>',
          'LinkedList': '<span class="keyword">LinkedList</span>'
        }
        
        Object.keys(keywords).forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'g')
          highlighted = highlighted.replace(regex, keywords[keyword])
        })
      }
      
      // 注释高亮
      highlighted = highlighted.replace(/\/\/(.*)$/gm, '<span class="comment">//$1</span>')
      
      return highlighted
    }
  }
}
</script>

<style scoped>
.maze-game {
  padding: 20px;
  min-height: 100vh;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
}

.game-title {
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.game-subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.game-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.game-stats {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.stats-card {
  padding: 15px;
  background: #f8f9fa;
}

.stats-card .el-card__body {
  display: flex;
  gap: 20px;
  align-items: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}

.maze-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.maze-grid {
  display: grid;
  gap: 1px;
  background: #ddd;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 5px;
  max-width: 600px;
  max-height: 600px;
}

.maze-cell {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.maze-cell.wall {
  background-color: #2c3e50;
}

.maze-cell.path {
  background-color: #ecf0f1;
}

.maze-cell.visited {
  background-color: #f39c12;
  animation: visited 0.3s ease;
}

.maze-cell.solution {
  background-color: #e74c3c;
  animation: solution 0.5s ease;
}

.maze-cell.start {
  background-color: #27ae60;
}

.maze-cell.end {
  background-color: #8e44ad;
}

.cell-icon {
  font-size: 12px;
  font-weight: bold;
}

.cell-icon.start,
.cell-icon.end {
  font-size: 10px;
}

.cell-icon.path {
  color: #e74c3c;
  font-size: 8px;
}

.game-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.legend-color.wall {
  background-color: #2c3e50;
}

.legend-color.path {
  background-color: #ecf0f1;
}

.legend-color.visited {
  background-color: #f39c12;
}

.legend-color.solution {
  background-color: #e74c3c;
}

.legend-color.start {
  background-color: #27ae60;
}

.legend-color.end {
  background-color: #8e44ad;
}

@keyframes visited {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes solution {
  0% {
    transform: scale(0.8);
    background-color: #f39c12;
  }
  100% {
    transform: scale(1);
    background-color: #e74c3c;
  }
}

.code-section {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.code-card {
  width: 100%;
  max-width: 800px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.code-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #409EFF;
}

.code-content {
  background: #f8f9fa;
  border-radius: 8px;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}

.code-content pre {
  margin: 0;
  padding: 20px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #333;
  background: transparent;
}

.code-content code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-family: inherit;
}

/* 代码高亮样式 */
.code-content .keyword {
  color: #0066cc;
  font-weight: bold;
}

.code-content .string {
  color: #009900;
}

.code-content .comment {
  color: #999999;
  font-style: italic;
}

.code-content .number {
  color: #ff6600;
}

.code-content .operator {
  color: #666666;
}

/* 实际应用案例样式 */
.applications-section {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.applications-card {
  width: 100%;
  max-width: 800px;
}

.applications-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.applications-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f39c12;
}

.applications-content {
  padding: 10px 0;
}

.application-list {
  display: grid;
  gap: 20px;
}

.application-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #409EFF;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.application-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-left-color: #f39c12;
}

.application-item h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.application-item h4 .el-icon {
  color: #409EFF;
  font-size: 18px;
}

.application-item p {
  margin: 0 0 12px 0;
  color: #5a6c7d;
  line-height: 1.6;
  font-size: 14px;
}

.application-item .example {
  background: rgba(64, 158, 255, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #409EFF;
  font-weight: 500;
  border-left: 3px solid #409EFF;
}

.application-item .example::before {
  content: "💡 ";
  margin-right: 4px;
}

@media (max-width: 768px) {
  .game-controls {
    flex-direction: column;
    gap: 15px;
  }
  
  .maze-cell {
    width: 15px;
    height: 15px;
  }
  
  .cell-icon {
    font-size: 8px;
  }
  
  .game-legend {
    gap: 10px;
  }
  
  .code-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .code-content pre {
    font-size: 12px;
    padding: 15px;
  }
  
  .applications-card {
    margin: 0 10px;
  }
  
  .application-item {
    padding: 15px;
  }
  
  .application-item h4 {
    font-size: 15px;
  }
  
  .application-item p {
    font-size: 13px;
  }
}
</style>