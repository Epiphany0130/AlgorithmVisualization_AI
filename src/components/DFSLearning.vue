<template>
  <div class="dfs-learning">
    <!-- 顶部导航 -->
    <div class="learning-header">
      <el-steps :active="currentStep" align-center>
        <el-step title="算法介绍" description="了解DFS基本概念"></el-step>
        <el-step title="代码模板" description="学习DFS代码结构"></el-step>
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
        <h2>深度优先搜索 (DFS) 算法介绍</h2>
        <div class="intro-content">
          <div class="concept-section">
            <h3>🤔 什么是DFS？</h3>
            <p>深度优先搜索（Depth-First Search，DFS）是一种用于遍历或搜索树或图的算法。它会尽可能深地搜索树的分支。</p>
            
            <h3>🎯 DFS的核心思想</h3>
            <ul>
              <li><strong>深度优先</strong>：优先访问更深层的节点</li>
              <li><strong>递归实现</strong>：利用函数调用栈实现回溯</li>
              <li><strong>回溯机制</strong>：当无路可走时，返回上一层继续搜索</li>
            </ul>

            <h3>📚 DFS三部曲</h3>
            <div class="trilogy">
              <div class="trilogy-item">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>确定函数和参数</h4>
                  <p>定义递归函数的参数，通常包括当前节点、图结构等</p>
                </div>
              </div>
              <div class="trilogy-item">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>确定终止条件</h4>
                  <p>什么时候停止递归，通常是找到目标或无路可走</p>
                </div>
              </div>
              <div class="trilogy-item">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>处理节点</h4>
                  <p>对当前节点进行处理，然后递归访问相邻节点</p>
                </div>
              </div>
            </div>
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
        <h2>DFS 代码模板学习</h2>
        <div class="code-explanation">
          <h3>📝 标准DFS模板</h3>
          <p>让我们一起学习DFS的标准实现模板：</p>
          
          <div class="code-container">
            <pre class="code-block" v-if="selectedLanguage === 'cpp'"><code>// C++ DFS 模板
#include &lt;vector&gt;
using namespace std;

vector&lt;vector&lt;int&gt;&gt; result;  // 存储所有结果
vector&lt;int&gt; path;           // 当前路径

void dfs(图的数据结构, 当前搜索的节点) {
    // 1. 终止条件
    if (满足终止条件) {
        result.push_back(path);  // 存放结果
        return;
    }
    
    // 2. 遍历所有可能的选择
    for (遍历当前节点的所有相邻节点) {
        // 3. 做选择
        path.push_back(当前选择);
        
        // 4. 递归调用
        dfs(图, 选择的节点);
        
        // 5. 撤销选择（回溯）
        path.pop_back();
    }
}</code></pre>
            
            <pre class="code-block" v-if="selectedLanguage === 'java'"><code>// Java DFS 模板
import java.util.*;

public class DFS {
    List&lt;List&lt;Integer&gt;&gt; result = new ArrayList&lt;&gt;();  // 存储所有结果
    List&lt;Integer&gt; path = new ArrayList&lt;&gt;();         // 当前路径
    
    public void dfs(图的数据结构, 当前搜索的节点) {
        // 1. 终止条件
        if (满足终止条件) {
            result.add(new ArrayList&lt;&gt;(path));  // 存放结果
            return;
        }
        
        // 2. 遍历所有可能的选择
        for (遍历当前节点的所有相邻节点) {
            // 3. 做选择
            path.add(当前选择);
            
            // 4. 递归调用
            dfs(图, 选择的节点);
            
            // 5. 撤销选择（回溯）
            path.remove(path.size() - 1);
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
        <h2>DFS 可视化演示</h2>
        <div class="visualization-content">
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
            <div class="graph-container">
              <svg width="600" height="400" class="graph-svg">
                <!-- 边 -->
                <g class="edges">
                  <line v-for="edge in edges" :key="edge.id"
                    :x1="nodes[edge.from].x" :y1="nodes[edge.from].y"
                    :x2="nodes[edge.to].x" :y2="nodes[edge.to].y"
                    :class="['edge', { 'visited': edge.visited }]"
                  />
                </g>
                <!-- 节点 -->
                <g class="nodes">
                  <circle v-for="node in nodes" :key="node.id"
                    :cx="node.x" :cy="node.y" :r="25"
                    :class="['node', node.status]"
                  />
                  <text v-for="node in nodes" :key="'text-' + node.id"
                    :x="node.x" :y="node.y + 5"
                    class="node-text"
                  >
                    {{ node.label }}
                  </text>
                </g>
              </svg>
            </div>
            
            <div class="demo-info">
              <div class="current-step-info">
                <h3>当前步骤</h3>
                <p>{{ currentDemoStep }}</p>
              </div>
              <div class="stack-info">
                <h3>调用栈</h3>
                <div class="stack">
                  <div v-for="(call, index) in callStack" :key="index" class="stack-item">
                    dfs({{ call }})
                  </div>
                </div>
              </div>
              <div class="path-info">
                <h3>当前路径</h3>
                <div class="path">
                  <el-tag v-for="node in currentPath" :key="node" type="primary">{{ node }}</el-tag>
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
      
      <!-- 岛屿数量问题演示 -->
      <el-card class="island-demo-card" style="margin-top: 20px;">
        <h2>🏝️ LeetCode 200题：岛屿数量</h2>
        
        <!-- 题目描述 -->
        <div class="problem-description">
          <h3>📋 题目描述</h3>
          <el-alert type="info" :closable="false">
            <p><strong>给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。</strong></p>
            <p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。</p>
            <p>此外，你可以假设该网格的四条边均被水包围。</p>
          </el-alert>
          
          <div class="example-section">
            <h4>示例 1：</h4>
            <pre class="example-code">
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
            </pre>
            
            <h4>示例 2：</h4>
            <pre class="example-code">
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
            </pre>
          </div>
        </div>
        
        <!-- 可视化演示 -->
        <div class="island-visualization">
          <h3>🎬 可视化演示</h3>
          <div class="island-controls">
            <el-button type="primary" @click="startIslandDemo" :disabled="isIslandPlaying">
              <el-icon><VideoPlay /></el-icon>
              开始演示
            </el-button>
            <el-button @click="pauseIslandDemo" :disabled="!isIslandPlaying">
              <el-icon><VideoPause /></el-icon>
              暂停
            </el-button>
            <el-button @click="resetIslandDemo">
              <el-icon><RefreshRight /></el-icon>
              重置
            </el-button>
            <el-select v-model="selectedExample" @change="loadExample" style="margin-left: 20px;">
              <el-option label="示例 1" value="example1"></el-option>
              <el-option label="示例 2" value="example2"></el-option>
            </el-select>
          </div>
          
          <div class="island-demo-area">
            <div class="grid-container">
              <div class="grid">
                <div 
                  v-for="(row, i) in islandGrid" 
                  :key="i" 
                  class="grid-row"
                >
                  <div 
                    v-for="(cell, j) in row" 
                    :key="j" 
                    :class="['grid-cell', {
                      'land': cell === '1',
                      'water': cell === '0',
                      'visiting': islandVisiting[i] && islandVisiting[i][j],
                      'visited': islandVisited[i] && islandVisited[i][j]
                    }]"
                  >
                    {{ cell }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="island-info">
              <div class="island-stats">
                <h4>统计信息</h4>
                <p><strong>当前岛屿数量：</strong> {{ islandCount }}</p>
                <p><strong>当前位置：</strong> {{ currentIslandPosition }}</p>
                <p><strong>当前操作：</strong> {{ currentIslandAction }}</p>
              </div>
              
              <div class="dfs-stack">
                <h4>DFS 调用栈</h4>
                <div class="stack">
                  <div v-for="(call, index) in islandCallStack" :key="index" class="stack-item">
                    dfs({{ call.row }}, {{ call.col }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 代码实现 -->
        <div class="island-code-section">
          <h3>💻 代码实现</h3>
          <el-tabs v-model="islandCodeLanguage">
            <el-tab-pane label="C++" name="cpp">
              <pre class="code-block"><code class="cpp">class Solution {
public:
    int numIslands(vector&lt;vector&lt;char&gt;&gt;&amp; grid) {
        if (grid.empty() || grid[0].empty()) {
            return 0;
        }
        
        int m = grid.size();
        int n = grid[0].size();
        int count = 0;
        
        // 遍历整个网格
        for (int i = 0; i &lt; m; i++) {
            for (int j = 0; j &lt; n; j++) {
                // 发现陆地，开始DFS
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
    
private:
    void dfs(vector&lt;vector&lt;char&gt;&gt;&amp; grid, int i, int j) {
        int m = grid.size();
        int n = grid[0].size();
        
        // 边界检查和终止条件
        if (i &lt; 0 || i &gt;= m || j &lt; 0 || j &gt;= n || grid[i][j] != '1') {
            return;
        }
        
        // 标记当前陆地为已访问
        grid[i][j] = '0';
        
        // 递归访问四个方向
        dfs(grid, i - 1, j); // 上
        dfs(grid, i + 1, j); // 下
        dfs(grid, i, j - 1); // 左
        dfs(grid, i, j + 1); // 右
    }
};</code></pre>
            </el-tab-pane>
            
            <el-tab-pane label="Java" name="java">
              <pre class="code-block"><code class="java">class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }
        
        int m = grid.length;
        int n = grid[0].length;
        int count = 0;
        
        // 遍历整个网格
        for (int i = 0; i &lt; m; i++) {
            for (int j = 0; j &lt; n; j++) {
                // 发现陆地，开始DFS
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        int m = grid.length;
        int n = grid[0].length;
        
        // 边界检查和终止条件
        if (i &lt; 0 || i &gt;= m || j &lt; 0 || j &gt;= n || grid[i][j] != '1') {
            return;
        }
        
        // 标记当前陆地为已访问
        grid[i][j] = '0';
        
        // 递归访问四个方向
        dfs(grid, i - 1, j); // 上
        dfs(grid, i + 1, j); // 下
        dfs(grid, i, j - 1); // 左
        dfs(grid, i, j + 1); // 右
    }
}</code></pre>
            </el-tab-pane>
          </el-tabs>
        </div>
        
        <!-- 题解分析 -->
        <div class="island-solution">
          <h3>🧠 题解分析</h3>
          <el-collapse>
            <el-collapse-item title="算法思路" name="1">
              <div class="solution-content">
                <h4>核心思想：</h4>
                <p>使用深度优先搜索（DFS）来解决岛屿数量问题。每当我们遇到一个未访问的陆地（'1'），就开始一次DFS，将与其连通的所有陆地都标记为已访问，这样就找到了一个完整的岛屿。</p>
                
                <h4>算法步骤：</h4>
                <ol>
                  <li><strong>遍历网格：</strong>逐个检查网格中的每个位置</li>
                  <li><strong>发现陆地：</strong>当遇到值为'1'的位置时，说明发现了新岛屿</li>
                  <li><strong>DFS标记：</strong>从该位置开始DFS，将所有连通的陆地标记为'0'</li>
                  <li><strong>计数增加：</strong>每次DFS完成后，岛屿计数加1</li>
                  <li><strong>继续遍历：</strong>继续遍历剩余位置，重复上述过程</li>
                </ol>
              </div>
            </el-collapse-item>
            
            <el-collapse-item title="时间复杂度分析" name="2">
              <div class="solution-content">
                <p><strong>时间复杂度：O(M × N)</strong></p>
                <p>其中 M 和 N 分别是网格的行数和列数。在最坏情况下，整个网格都是陆地，我们需要访问每个位置一次。</p>
                
                <p><strong>空间复杂度：O(M × N)</strong></p>
                <p>在最坏情况下（整个网格都是陆地且呈一条直线），递归调用栈的深度可能达到 M × N。</p>
              </div>
            </el-collapse-item>
            
            <el-collapse-item title="关键技巧" name="3">
              <div class="solution-content">
                <h4>1. 原地标记</h4>
                <p>直接修改原网格，将访问过的陆地标记为'0'，避免使用额外的visited数组。</p>
                
                <h4>2. 四方向遍历</h4>
                <p>使用方向数组或直接递归调用四个方向，确保访问所有相邻的陆地。</p>
                
                <h4>3. 边界检查</h4>
                <p>在DFS函数开始时进行边界检查和终止条件判断，避免越界访问。</p>
                
                <h4>4. 变体扩展</h4>
                <p>这个模板可以扩展到其他类似问题，如岛屿周长、最大岛屿面积等。</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>

    <!-- 步骤4: 交互练习 -->
    <div v-if="currentStep === 3" class="step-content">
      <el-card class="practice-card">
        <h2>DFS 交互练习</h2>
        <div class="practice-content">
          <div class="practice-instructions">
            <h3>🎮 练习说明</h3>
            <p>现在轮到你来操作了！点击节点来模拟DFS的执行过程。</p>
            <div class="practice-rules">
              <el-alert title="练习规则" type="info" :closable="false">
                <ul>
                  <li>从起始节点开始，按照DFS的规则访问节点</li>
                  <li>优先访问更深层的节点</li>
                  <li>当无路可走时，需要回溯到上一层</li>
                  <li>正确完成所有步骤即可通过练习</li>
                </ul>
              </el-alert>
            </div>
          </div>

          <div class="practice-area">
            <div class="practice-graph">
              <svg width="600" height="400" class="practice-svg">
                <!-- 边 -->
                <g class="edges">
                  <line v-for="edge in practiceEdges" :key="edge.id"
                    :x1="practiceNodes[edge.from].x" :y1="practiceNodes[edge.from].y"
                    :x2="practiceNodes[edge.to].x" :y2="practiceNodes[edge.to].y"
                    :class="['edge', { 'visited': edge.visited }]"
                  />
                </g>
                <!-- 节点 -->
                <g class="nodes">
                  <circle v-for="node in practiceNodes" :key="node.id"
                    :cx="node.x" :cy="node.y" :r="25"
                    :class="['node', 'practice-node', node.status]"
                    @click="onNodeClick(node)"
                  />
                  <text v-for="node in practiceNodes" :key="'text-' + node.id"
                    :x="node.x" :y="node.y + 5"
                    class="node-text"
                  >
                    {{ node.label }}
                  </text>
                </g>
              </svg>
            </div>
            
            <div class="practice-info">
              <div class="practice-progress">
                <h3>练习进度</h3>
                <el-progress :percentage="practiceProgress" :status="practiceStatus"></el-progress>
              </div>
              <div class="practice-feedback">
                <h3>操作反馈</h3>
                <div class="feedback-message" :class="feedbackType">
                  {{ feedbackMessage }}
                </div>
              </div>
              <div class="practice-actions">
                <el-button @click="resetPractice">
                  <el-icon><RefreshRight /></el-icon>
                  重新开始
                </el-button>
                <el-button type="success" @click="showHint">
                  <el-icon><QuestionFilled /></el-icon>
                  提示
                </el-button>
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
import {
  VideoPlay,
  VideoPause,
  RefreshRight,
  ArrowRight,
  QuestionFilled,
  Check
} from '@element-plus/icons-vue'

export default {
  components: {
    VideoPlay,
    VideoPause,
    RefreshRight,
    ArrowRight,
    QuestionFilled,
    Check
  },
  name: 'DFSLearning',
  data() {
    return {
      currentStep: 0,
      selectedLanguage: 'cpp',
      isPlaying: false,
      playSpeed: 2,
      currentDemoStep: '准备开始DFS演示...',
      callStack: [],
      currentPath: [],
      
      // 代码解释
      codeExplanations: [
        {
          title: '终止条件',
          description: '定义什么时候停止递归，这是递归函数的基础。通常是找到目标或者无路可走时。'
        },
        {
          title: '遍历选择',
          description: '遍历当前节点的所有相邻节点，这决定了搜索的方向和范围。'
        },
        {
          title: '做选择',
          description: '将当前选择加入路径，这是向前搜索的关键步骤。'
        },
        {
          title: '递归调用',
          description: '对选择的节点继续进行DFS，这体现了深度优先的特点。'
        },
        {
          title: '撤销选择',
          description: '回溯时撤销之前的选择，这是回溯算法的核心机制。'
        }
      ],
      
      // 演示图的节点
      nodes: {
        'A': { id: 'A', label: 'A', x: 100, y: 100, status: 'unvisited' },
        'B': { id: 'B', label: 'B', x: 200, y: 200, status: 'unvisited' },
        'C': { id: 'C', label: 'C', x: 300, y: 100, status: 'unvisited' },
        'D': { id: 'D', label: 'D', x: 150, y: 300, status: 'unvisited' },
        'E': { id: 'E', label: 'E', x: 400, y: 200, status: 'unvisited' },
        'F': { id: 'F', label: 'F', x: 500, y: 100, status: 'unvisited' }
      },
      
      // 演示图的边
      edges: [
        { id: 1, from: 'A', to: 'B', visited: false },
        { id: 2, from: 'A', to: 'C', visited: false },
        { id: 3, from: 'B', to: 'D', visited: false },
        { id: 4, from: 'C', to: 'E', visited: false },
        { id: 5, from: 'C', to: 'F', visited: false }
      ],
      
      // 练习相关
      practiceNodes: {},
      practiceEdges: [],
      practiceProgress: 0,
      practiceStatus: '',
      feedbackMessage: '点击起始节点 A 开始练习',
      feedbackType: 'info',
      expectedSequence: ['A', 'B', 'D', 'C', 'E', 'F'],
      practiceGraph: {},
      userSequence: [],
      
      demoTimer: null,
      
      // 岛屿数量演示相关
      isIslandPlaying: false,
      selectedExample: 'example1',
      islandCodeLanguage: 'cpp',
      islandGrid: [],
      islandVisiting: [],
      islandVisited: [],
      islandCount: 0,
      currentIslandPosition: '(0, 0)',
      currentIslandAction: '准备开始演示...',
      islandCallStack: [],
      islandDemoTimer: null,
      islandDemoSteps: [],
      islandCurrentStepIndex: 0,
      
      // 示例数据
      examples: {
        example1: [
          ['1','1','1','1','0'],
          ['1','1','0','1','0'],
          ['1','1','0','0','0'],
          ['0','0','0','0','0']
        ],
        example2: [
          ['1','1','0','0','0'],
          ['1','1','0','0','0'],
          ['0','0','1','0','0'],
          ['0','0','0','1','1']
        ]
      }
    }
  },
  mounted() {
    // 从本地存储读取语言选择
    const savedLang = localStorage.getItem('selectedLanguage')
    if (savedLang) {
      this.selectedLanguage = savedLang
    }
    
    // 初始化练习图
    this.initPractice()
    
    // 初始化岛屿演示
    this.loadExample()
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
    
    // 演示相关方法
    startDemo() {
      this.isPlaying = true
      this.resetDemo(true)
      this.runDemoSequence()
    },
    
    pauseDemo() {
      this.isPlaying = false
      if (this.demoTimer) {
        clearTimeout(this.demoTimer)
      }
    },
    
    resetDemo(fromStart = false) {
      if (!fromStart) {
        this.isPlaying = false
      }
      
      if (this.demoTimer) {
        clearTimeout(this.demoTimer)
      }
      
      // 重置所有节点和边的状态
      Object.values(this.nodes).forEach(node => {
        node.status = 'unvisited'
      })
      this.edges.forEach(edge => {
        edge.visited = false
      })
      
      this.callStack = []
      this.currentPath = []
      this.currentDemoStep = '准备开始DFS演示...'
    },
    
    runDemoSequence() {
      // 构建邻接表
      const graph = {}
      Object.keys(this.nodes).forEach(node => {
        graph[node] = []
      })
      
      this.edges.forEach(edge => {
        graph[edge.from].push(edge.to)
        graph[edge.to].push(edge.from) // 无向图
      })
      
      // DFS演示步骤队列
      const steps = []
      const visited = new Set()
      
      // 生成DFS步骤
      const generateDFSSteps = (node, parent = null) => {
        steps.push({
          action: 'enter',
          node: node,
          step: `进入节点 ${node}，将其标记为正在访问`
        })
        
        steps.push({
          action: 'visit',
          node: node,
          step: `访问节点 ${node}，加入调用栈`
        })
        
        visited.add(node)
        
        // 标记从父节点到当前节点的边
        if (parent) {
          steps.push({
            action: 'mark_edge',
            from: parent,
            to: node,
            step: `标记边 ${parent} → ${node} 为已访问`
          })
        }
        
        // 遍历所有邻居
        const neighbors = graph[node].filter(neighbor => !visited.has(neighbor))
        
        if (neighbors.length === 0) {
          steps.push({
            action: 'no_neighbors',
            node: node,
            step: `节点 ${node} 没有未访问的邻居`
          })
        } else {
          steps.push({
            action: 'check_neighbors',
            node: node,
            neighbors: neighbors,
            step: `检查节点 ${node} 的邻居: ${neighbors.join(', ')}`
          })
        }
        
        // 递归访问邻居
        neighbors.forEach(neighbor => {
          generateDFSSteps(neighbor, node)
        })
        
        steps.push({
          action: 'backtrack',
          node: node,
          step: `从节点 ${node} 回溯，移出调用栈`
        })
      }
      
      // 从节点A开始生成DFS步骤
      generateDFSSteps('A')
      
      steps.push({
        action: 'complete',
        step: 'DFS 遍历完成！所有可达节点都已访问。'
      })
      
      // 执行步骤
      let stepIndex = 0
      const executeStep = () => {
        if (!this.isPlaying || stepIndex >= steps.length) {
          this.isPlaying = false
          return
        }
        
        const step = steps[stepIndex]
        this.currentDemoStep = step.step
        
        switch (step.action) {
          case 'enter':
            this.nodes[step.node].status = 'visiting'
            break
            
          case 'visit':
            this.nodes[step.node].status = 'visited'
            this.callStack.push(step.node)
            this.currentPath.push(step.node)
            break
            
          case 'mark_edge':
            const edge = this.edges.find(e => 
              (e.from === step.from && e.to === step.to) ||
              (e.from === step.to && e.to === step.from)
            )
            if (edge) {
              edge.visited = true
            }
            break
            
          case 'check_neighbors':
            // 高亮显示邻居节点
            step.neighbors.forEach(neighbor => {
              if (this.nodes[neighbor].status === 'unvisited') {
                this.nodes[neighbor].status = 'candidate'
              }
            })
            break
            
          case 'no_neighbors':
            // 暂停一下显示没有邻居的状态
            break
            
          case 'backtrack':
            if (this.callStack.length > 0) {
              this.callStack.pop()
            }
            // 将候选节点状态重置
            Object.values(this.nodes).forEach(node => {
              if (node.status === 'candidate') {
                node.status = 'unvisited'
              }
            })
            break
            
          case 'complete':
            this.isPlaying = false
            // 高亮所有访问过的节点
            Object.values(this.nodes).forEach(node => {
              if (node.status === 'visited') {
                node.status = 'completed'
              }
            })
            break
        }
        
        stepIndex++
        const delay = step.action === 'check_neighbors' ? 1500 : (2000 / this.playSpeed)
        this.demoTimer = setTimeout(executeStep, delay)
      }
      
      executeStep()
    },
    
    // 练习相关方法
    initPractice() {
      // 复制演示图的结构用于练习
      this.practiceNodes = JSON.parse(JSON.stringify(this.nodes))
      this.practiceEdges = JSON.parse(JSON.stringify(this.edges))
      
      // 构建练习图的邻接表
      this.practiceGraph = {}
      Object.keys(this.practiceNodes).forEach(node => {
        this.practiceGraph[node] = []
      })
      
      this.practiceEdges.forEach(edge => {
        this.practiceGraph[edge.from].push(edge.to)
        this.practiceGraph[edge.to].push(edge.from)
      })
      
      // 生成正确的DFS序列
      const visited = new Set()
      const sequence = []
      
      const generateSequence = (node) => {
        visited.add(node)
        sequence.push(node)
        
        const neighbors = this.practiceGraph[node]
          .filter(neighbor => !visited.has(neighbor))
          .sort() // 按字母顺序排序，确保一致性
        
        neighbors.forEach(neighbor => {
          generateSequence(neighbor)
        })
      }
      
      generateSequence('A')
      this.expectedSequence = sequence
      
      // 重置练习状态
      Object.values(this.practiceNodes).forEach(node => {
        node.status = 'unvisited'
      })
      this.practiceEdges.forEach(edge => {
        edge.visited = false
      })
      
      this.userSequence = []
      this.practiceProgress = 0
      this.feedbackMessage = '点击起始节点 A 开始练习'
      this.feedbackType = 'info'
    },
    
    onNodeClick(node) {
      if (node.status === 'visited') {
        this.feedbackMessage = '该节点已经访问过了！'
        this.feedbackType = 'warning'
        return
      }
      
      const expectedNode = this.expectedSequence[this.userSequence.length]
      
      if (node.label === expectedNode) {
        // 正确的选择
        node.status = 'visited'
        this.userSequence.push(node.label)
        this.practiceProgress = (this.userSequence.length / this.expectedSequence.length) * 100
        
        if (this.userSequence.length === this.expectedSequence.length) {
          this.feedbackMessage = '恭喜！你已经完成了DFS练习！'
          this.feedbackType = 'success'
          this.practiceStatus = 'success'
        } else {
          this.feedbackMessage = `很好！继续访问下一个节点。`
          this.feedbackType = 'success'
        }
      } else {
        // 错误的选择
        this.feedbackMessage = `错误！按照DFS规则，应该先访问节点 ${expectedNode}`
        this.feedbackType = 'error'
      }
    },
    
    resetPractice() {
      this.initPractice()
    },
    
    showHint() {
      const nextNode = this.expectedSequence[this.userSequence.length]
      this.feedbackMessage = `提示：下一个应该访问的节点是 ${nextNode}`
      this.feedbackType = 'info'
    },
    
    completeLearning() {
      this.$message.success('恭喜完成DFS学习！')
      this.$router.push('/')
    },
    
    // 岛屿数量演示方法
    loadExample() {
      this.resetIslandDemo()
      this.islandGrid = JSON.parse(JSON.stringify(this.examples[this.selectedExample]))
      this.initIslandArrays()
    },
    
    initIslandArrays() {
      const rows = this.islandGrid.length
      const cols = this.islandGrid[0].length
      
      this.islandVisiting = Array(rows).fill().map(() => Array(cols).fill(false))
      this.islandVisited = Array(rows).fill().map(() => Array(cols).fill(false))
    },
    
    startIslandDemo() {
      this.isIslandPlaying = true
      this.resetIslandDemo(true)
      this.generateIslandDemoSteps()
      this.executeIslandDemoSteps()
    },
    
    pauseIslandDemo() {
      this.isIslandPlaying = false
      if (this.islandDemoTimer) {
        clearTimeout(this.islandDemoTimer)
      }
    },
    
    resetIslandDemo(fromStart = false) {
      if (!fromStart) {
        this.isIslandPlaying = false
      }
      
      if (this.islandDemoTimer) {
        clearTimeout(this.islandDemoTimer)
      }
      
      this.islandCount = 0
      this.currentIslandPosition = '(0, 0)'
      this.currentIslandAction = '准备开始演示...'
      this.islandCallStack = []
      this.islandCurrentStepIndex = 0
      this.islandDemoSteps = []
      
      // 重新加载示例数据
      this.islandGrid = JSON.parse(JSON.stringify(this.examples[this.selectedExample]))
      this.initIslandArrays()
    },
    
    generateIslandDemoSteps() {
      const grid = JSON.parse(JSON.stringify(this.examples[this.selectedExample]))
      const steps = []
      const m = grid.length
      const n = grid[0].length
      let count = 0
      
      // 生成演示步骤
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          steps.push({
            type: 'check',
            row: i,
            col: j,
            value: grid[i][j],
            message: `检查位置 (${i}, ${j})，值为 '${grid[i][j]}'`
          })
          
          if (grid[i][j] === '1') {
            count++
            steps.push({
              type: 'found_island',
              row: i,
              col: j,
              count: count,
              message: `发现新岛屿！岛屿数量: ${count}`
            })
            
            // 生成DFS步骤
            this.generateDFSSteps(grid, i, j, steps)
          }
        }
      }
      
      steps.push({
        type: 'complete',
        count: count,
        message: `演示完成！总共找到 ${count} 个岛屿`
      })
      
      this.islandDemoSteps = steps
    },
    
    generateDFSSteps(grid, startRow, startCol, steps) {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      const dirNames = ['上', '下', '左', '右']
      
      const dfs = (row, col) => {
        // 边界检查
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== '1') {
          steps.push({
            type: 'dfs_return',
            row: row,
            col: col,
            message: `位置 (${row}, ${col}) 越界或不是陆地，返回`
          })
          return
        }
        
        // 进入当前位置
        steps.push({
          type: 'dfs_enter',
          row: row,
          col: col,
          message: `DFS 进入位置 (${row}, ${col})`
        })
        
        // 标记为已访问
        steps.push({
          type: 'dfs_mark',
          row: row,
          col: col,
          message: `标记位置 (${row}, ${col}) 为已访问`
        })
        
        grid[row][col] = '0' // 标记为已访问
        
        // 递归访问四个方向
        for (let i = 0; i < 4; i++) {
          const newRow = row + directions[i][0]
          const newCol = col + directions[i][1]
          
          steps.push({
            type: 'dfs_explore',
            row: newRow,
            col: newCol,
            direction: dirNames[i],
            message: `探索${dirNames[i]}方向: (${newRow}, ${newCol})`
          })
          
          dfs(newRow, newCol)
        }
      }
      
      dfs(startRow, startCol)
    },
    
    executeIslandDemoSteps() {
      if (!this.isIslandPlaying || this.islandCurrentStepIndex >= this.islandDemoSteps.length) {
        this.isIslandPlaying = false
        return
      }
      
      const step = this.islandDemoSteps[this.islandCurrentStepIndex]
      this.processIslandStep(step)
      
      this.islandCurrentStepIndex++
      
      // 继续下一步
      this.islandDemoTimer = setTimeout(() => {
        this.executeIslandDemoSteps()
      }, 1000) // 1秒间隔
    },
    
    processIslandStep(step) {
      this.currentIslandAction = step.message
      
      switch (step.type) {
        case 'check':
          this.currentIslandPosition = `(${step.row}, ${step.col})`
          break
          
        case 'found_island':
          this.islandCount = step.count
          this.currentIslandPosition = `(${step.row}, ${step.col})`
          break
          
        case 'dfs_enter':
          this.currentIslandPosition = `(${step.row}, ${step.col})`
          if (step.row >= 0 && step.row < this.islandVisiting.length && 
              step.col >= 0 && step.col < this.islandVisiting[0].length) {
            this.islandVisiting[step.row][step.col] = true
            this.islandCallStack.push({ row: step.row, col: step.col })
          }
          break
          
        case 'dfs_mark':
          if (step.row >= 0 && step.row < this.islandGrid.length && 
              step.col >= 0 && step.col < this.islandGrid[0].length) {
            this.islandGrid[step.row][step.col] = '0'
            this.islandVisited[step.row][step.col] = true
            this.islandVisiting[step.row][step.col] = false
          }
          break
          
        case 'dfs_explore':
          this.currentIslandPosition = `(${step.row}, ${step.col})`
          break
          
        case 'dfs_return':
          if (this.islandCallStack.length > 0) {
            this.islandCallStack.pop()
          }
          break
          
        case 'complete':
          this.currentIslandAction = step.message
          this.islandCallStack = []
          break
      }
    }
  },
  
  beforeUnmount() {
    if (this.demoTimer) {
      clearTimeout(this.demoTimer)
    }
    if (this.islandDemoTimer) {
      clearTimeout(this.islandDemoTimer)
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box !important;
}

body, html {
  overflow-x: hidden !important;
}
.dfs-learning {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
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
  backdrop-filter: blur(20px);
  border: 1px solid rgba(66, 140, 255, 0.4);
  box-shadow: 0 16px 40px rgba(66, 140, 255, 0.25);
}

.intro-card h2, .code-card h2, .visualization-card h2, .practice-card h2 {
  color: white;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.concept-section h3 {
  color: rgba(255, 255, 255, 0.95);
  margin: 20px 0 10px 0;
  font-size: 20px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.concept-section ul {
  margin: 15px 0;
  padding-left: 20px;
}

.concept-section li {
  margin: 8px 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.trilogy {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.trilogy-item {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #569aff 0%, #428cff 50%, #2267e6 100%);
  border-radius: 15px;
  color: white;
  border: 1px solid rgba(66, 140, 255, 0.5);
  box-shadow: 0 8px 24px rgba(66, 140, 255, 0.3);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.step-content p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.4;
}

.code-container {
  margin: 20px 0;
}

.code-block {
  background: rgba(0, 0, 0, 0.7);
  color: #e2e8f0;
  padding: 20px;
  border-radius: 15px;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.explanation-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffb366, #ff9a56);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 179, 102, 0.2);
}

.explanation-content h4 {
  margin: 0 0 5px 0;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.explanation-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(66, 140, 255, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(66, 140, 255, 0.5);
}

.demo-area {
  display: flex;
  gap: 30px;
}

.graph-container {
  flex: 1;
}

.graph-svg, .practice-svg {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
}

.edge {
  stroke: #bdc3c7;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.edge.visited {
  stroke: #ff6b35;
  stroke-width: 3;
}

.node {
  fill: #ecf0f1;
  stroke: #bdc3c7;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.node.visiting {
  fill: #ffeb3b;
  stroke: #ffc107;
  animation: pulse 1s infinite;
}

.node.visited {
  fill: #4caf50;
  stroke: #388e3c;
}

.node.candidate {
  fill: #2196f3;
  stroke: #1976d2;
  animation: glow 1.5s ease-in-out infinite alternate;
}

.node.completed {
  fill: #9c27b0;
  stroke: #7b1fa2;
  animation: celebrate 0.5s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes glow {
  from { opacity: 0.7; }
  to { opacity: 1; }
}

@keyframes celebrate {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.practice-node {
  cursor: pointer;
}

.practice-node:hover {
  fill: #ddd;
}

.node-text {
  fill: #2c3e50;
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
}

.demo-info {
  width: 300px;
}

.current-step-info, .stack-info, .path-info {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(66, 140, 255, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(66, 140, 255, 0.5);
}

.current-step-info h3, .stack-info h3, .path-info h3 {
  margin: 0 0 10px 0;
  color: white;
  font-size: 16px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.stack {
  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
}

.stack-item {
  padding: 8px 12px;
  background: linear-gradient(135deg, #ffb366, #ff9a56);
  color: white;
  border-radius: 8px;
  font-family: 'SF Mono', monospace;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(255, 179, 102, 0.2);
}

.path {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.practice-area {
  display: flex;
  gap: 30px;
}

.practice-graph {
  flex: 1;
}

.practice-info {
  width: 300px;
}

.practice-progress, .practice-feedback, .practice-actions {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feedback-message {
  padding: 10px;
  border-radius: 8px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feedback-message.info {
  background: rgba(33, 150, 243, 0.2);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.feedback-message.success {
  background: rgba(76, 175, 80, 0.2);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.feedback-message.error {
  background: rgba(244, 67, 54, 0.2);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.feedback-message.warning {
  background: rgba(255, 152, 0, 0.2);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.step-actions {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
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

/* 岛屿数量演示样式 */
.island-demo-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.island-demo-card .el-card__body {
  padding: 30px;
}

.problem-description {
  margin-bottom: 30px;
}

.example-section {
  margin-top: 20px;
}

.example-code {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  margin: 10px 0;
  overflow-x: auto;
}

.island-visualization {
  margin: 30px 0;
}

.island-controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.island-demo-area {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.grid-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.grid {
  display: inline-block;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
}

.grid-cell.land {
  background: #4CAF50;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.grid-cell.water {
  background: #2196F3;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.grid-cell.visiting {
  background: #FF9800 !important;
  animation: pulse 1s infinite;
  box-shadow: 0 0 20px rgba(255, 152, 0, 0.6);
}

.grid-cell.visited {
  background: #9E9E9E !important;
  opacity: 0.7;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.island-info {
  width: 300px;
}

.island-stats, .dfs-stack {
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.island-stats h4, .dfs-stack h4 {
  margin: 0 0 15px 0;
  color: white;
  font-size: 16px;
}

.island-stats p {
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.island-code-section {
  margin: 30px 0;
}

.island-code-section h3 {
  margin-bottom: 20px;
  color: white;
}

.island-solution {
  margin-top: 30px;
}

.island-solution h3 {
  margin-bottom: 20px;
  color: white;
}

.solution-content {
  color: #333;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.solution-content * {
  max-width: 100% !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  box-sizing: border-box !important;
  white-space: normal !important;
}

.solution-content strong {
  display: inline !important;
  max-width: 100% !important;
  word-break: break-all !important;
}

.solution-content p, .solution-content li {
  max-width: 100% !important;
  word-break: break-word !important;
  hyphens: auto !important;
}

.solution-content ol, .solution-content ul {
  max-width: 100% !important;
  padding-left: 20px !important;
  margin: 0 !important;
}

.solution-content h4 {
  color: #2c3e50;
  margin: 15px 0 10px 0;
  font-weight: 600;
}

.solution-content ol {
  padding-left: 20px;
}

.solution-content li {
  margin: 8px 0;
  color: #555;
}

.solution-content p {
  margin: 10px 0;
  color: #666;
}

.el-collapse {
  width: 100% !important;
  max-width: 100% !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.el-collapse-item {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

.el-collapse-item__wrap {
  width: 100% !important;
  max-width: 100% !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.el-collapse-item__content {
  width: 100% !important;
  max-width: 100% !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.island-solution {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}
</style>