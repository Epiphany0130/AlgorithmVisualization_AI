<template>
  <div class="quiz-module">
    <div class="quiz-header">
      <h1 class="quiz-title">
        <el-icon><Edit /></el-icon>
        算法知识测试
      </h1>
      <p class="quiz-subtitle">测试你对 DFS 和 BFS 算法的理解程度</p>
    </div>

    <!-- 测试进行中 -->
    <div v-if="!showResult" class="quiz-content">
      <div class="progress-section">
        <el-progress 
          :percentage="Math.round(((currentQuestion + 1) / questions.length) * 100)" 
          :stroke-width="8"
          color="#409EFF"
        />
        <p class="progress-text">第 {{ currentQuestion + 1 }} 题 / 共 {{ questions.length }} 题</p>
      </div>

      <el-card class="question-card">
        <div class="question-content">
          <h3 class="question-title">{{ questions[currentQuestion].question }}</h3>
          <div class="options">
            <el-radio-group v-model="userAnswers[currentQuestion]" class="option-group">
              <el-radio 
                v-for="(option, index) in questions[currentQuestion].options" 
                :key="index" 
                :label="index"
                class="option-item"
              >
                {{ option }}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
        
        <div class="question-actions">
          <el-button 
            v-if="currentQuestion > 0" 
            @click="previousQuestion" 
            size="large"
          >
            <el-icon><ArrowLeft /></el-icon>
            上一题
          </el-button>
          
          <el-button 
            v-if="currentQuestion < questions.length - 1" 
            @click="nextQuestion" 
            type="primary" 
            size="large"
            :disabled="userAnswers[currentQuestion] === null"
          >
            下一题
            <el-icon><ArrowRight /></el-icon>
          </el-button>
          
          <el-button 
            v-if="currentQuestion === questions.length - 1" 
            @click="submitQuiz" 
            type="success" 
            size="large"
            :disabled="!allQuestionsAnswered"
          >
            提交答案
            <el-icon><Check /></el-icon>
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 测试结果 -->
    <div v-if="showResult" class="result-content" :class="resultClass">
      <el-card class="result-card">
        <div class="result-header">
          <el-icon size="80" :color="resultIconColor">
            <component :is="resultIcon" />
          </el-icon>
          <h2 class="result-title">{{ resultTitle }}</h2>
          <div class="score-display">
            <span class="score-number">{{ score }}</span>
            <span class="score-total">/ {{ questions.length }}</span>
          </div>
          <div class="score-percentage">{{ Math.round((score / questions.length) * 100) }}%</div>
          <p class="result-message">{{ resultMessage }}</p>
        </div>

        <div class="detailed-results">
          <h3>详细结果</h3>
          <div class="question-results">
            <div 
              v-for="(question, index) in questions" 
              :key="index" 
              class="question-result-item"
              :class="{ 'correct': userAnswers[index] === question.correct, 'incorrect': userAnswers[index] !== question.correct }"
            >
              <div class="question-number">第{{ index + 1 }}题</div>
              <div class="question-text">{{ question.question }}</div>
              <div class="answer-info">
                <div class="user-answer">
                  你的答案: {{ question.options[userAnswers[index]] }}
                </div>
                <div class="correct-answer">
                  正确答案: {{ question.options[question.correct] }}
                </div>
              </div>
              <el-icon class="result-icon">
                <Check v-if="userAnswers[index] === question.correct" />
                <Close v-else />
              </el-icon>
            </div>
          </div>
        </div>

        <div class="result-actions">
          <el-button @click="restartQuiz" type="primary" size="large">
            <el-icon><Refresh /></el-icon>
            重新测试
          </el-button>
          <el-button @click="goHome" size="large">
            <el-icon><House /></el-icon>
            返回首页
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizModule',
  data() {
    return {
      currentQuestion: 0,
      userAnswers: new Array(10).fill(null),
      showResult: false,
      score: 0,
      questions: [
        {
          question: "DFS（深度优先搜索）的主要特点是什么？",
          options: [
            "优先访问同一层的所有节点",
            "优先访问更深层的节点",
            "使用队列数据结构",
            "总是能找到最短路径"
          ],
          correct: 1
        },
        {
          question: "BFS（广度优先搜索）使用什么数据结构来实现？",
          options: [
            "栈（Stack）",
            "队列（Queue）",
            "堆（Heap）",
            "链表（LinkedList）"
          ],
          correct: 1
        },
        {
          question: "在无权图中，哪种算法能够找到最短路径？",
          options: [
            "DFS",
            "BFS",
            "两者都可以",
            "两者都不可以"
          ],
          correct: 1
        },
        {
          question: "DFS算法通常使用什么方式来实现？",
          options: [
            "迭代",
            "递归",
            "动态规划",
            "贪心算法"
          ],
          correct: 1
        },
        {
          question: "在图的遍历中，BFS的时间复杂度是多少？（V为顶点数，E为边数）",
          options: [
            "O(V)",
            "O(E)",
            "O(V + E)",
            "O(V * E)"
          ],
          correct: 2
        },
        {
          question: "DFS在什么情况下会发生回溯？",
          options: [
            "找到目标节点时",
            "当前节点没有未访问的邻居节点时",
            "队列为空时",
            "栈溢出时"
          ],
          correct: 1
        },
        {
          question: "BFS算法最适合解决以下哪类问题？",
          options: [
            "寻找所有可能的路径",
            "寻找最短路径",
            "检测环的存在",
            "拓扑排序"
          ],
          correct: 1
        },
        {
          question: "在二叉树中，哪种遍历方式属于DFS？",
          options: [
            "层次遍历",
            "前序遍历",
            "广度优先遍历",
            "以上都不是"
          ],
          correct: 1
        },
        {
          question: "相比于DFS，BFS的主要缺点是什么？",
          options: [
            "时间复杂度更高",
            "空间复杂度更高",
            "无法找到解",
            "实现更复杂"
          ],
          correct: 1
        },
        {
          question: "在岛屿数量问题中，我们通常使用哪种算法？",
          options: [
            "只能使用DFS",
            "只能使用BFS",
            "DFS和BFS都可以使用",
            "需要使用动态规划"
          ],
          correct: 2
        }
      ]
    }
  },
  computed: {
    allQuestionsAnswered() {
      return this.userAnswers.every(answer => answer !== null)
    },
    resultClass() {
      const percentage = (this.score / this.questions.length) * 100
      if (percentage >= 90) return 'excellent'
      if (percentage >= 80) return 'good'
      if (percentage >= 60) return 'average'
      return 'poor'
    },
    resultTitle() {
      const percentage = (this.score / this.questions.length) * 100
      if (percentage >= 90) return '优秀！'
      if (percentage >= 80) return '良好！'
      if (percentage >= 60) return '及格'
      return '需要加强'
    },
    resultMessage() {
      const percentage = (this.score / this.questions.length) * 100
      if (percentage >= 90) return '你对DFS和BFS算法掌握得非常好！继续保持！'
      if (percentage >= 80) return '你对算法有很好的理解，再加把劲就能达到优秀！'
      if (percentage >= 60) return '基础还可以，建议多练习一些算法题目。'
      return '建议重新学习DFS和BFS的相关知识，多做练习。'
    },
    resultIcon() {
      const percentage = (this.score / this.questions.length) * 100
      if (percentage >= 90) return 'Trophy'
      if (percentage >= 80) return 'Medal'
      if (percentage >= 60) return 'Check'
      return 'Warning'
    },
    resultIconColor() {
      const percentage = (this.score / this.questions.length) * 100
      if (percentage >= 90) return '#FFD700'
      if (percentage >= 80) return '#67C23A'
      if (percentage >= 60) return '#409EFF'
      return '#F56C6C'
    }
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--
      }
    },
    submitQuiz() {
      this.calculateScore()
      this.showResult = true
    },
    calculateScore() {
      this.score = 0
      for (let i = 0; i < this.questions.length; i++) {
        if (this.userAnswers[i] === this.questions[i].correct) {
          this.score++
        }
      }
    },
    restartQuiz() {
      this.currentQuestion = 0
      this.userAnswers = new Array(10).fill(null)
      this.showResult = false
      this.score = 0
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.quiz-module {
  padding: 20px;
  min-height: 100vh;
}

.quiz-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.quiz-title {
  font-size: 36px;
  margin-bottom: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.quiz-subtitle {
  font-size: 18px;
  opacity: 0.9;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-text {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}

.question-card {
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.question-content {
  padding: 30px;
}

.question-title {
  font-size: 20px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.6;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  padding: 0 !important;
  border: 2px solid #e4e7ed;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 60px !important;
  display: flex !important;
  align-items: center !important;
  width: 100%;
  box-sizing: border-box;
  margin: 0 !important;
}

.option-item:hover {
  border-color: #409EFF;
  background-color: #f0f9ff;
}

.option-item.is-checked {
  border-color: #409EFF;
  background-color: #e6f7ff;
}

.option-item .el-radio {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  display: flex !important;
  align-items: center !important;
  padding: 15px 20px 15px 25px;
  box-sizing: border-box;
}

.option-item .el-radio__input {
  margin-right: 20px !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  flex-shrink: 0;
  align-self: center;
}

.option-item .el-radio__label {
  line-height: 1.4 !important;
  word-wrap: break-word;
  flex: 1;
  margin: 0 !important;
  padding: 0 !important;
  font-size: 16px;
  display: flex !important;
  align-items: center !important;
  height: 100%;
  vertical-align: middle;
}

.question-actions {
  padding: 20px 30px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 结果页面样式 */
.result-content {
  padding: 20px;
}

.result-content.excellent {
  background: linear-gradient(135deg, #FFD700, #FFA500);
}

.result-content.good {
  background: linear-gradient(135deg, #67C23A, #85CE61);
}

.result-content.average {
  background: linear-gradient(135deg, #409EFF, #66B1FF);
}

.result-content.poor {
  background: linear-gradient(135deg, #F56C6C, #F78989);
}

.result-card {
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.result-header {
  text-align: center;
  padding: 40px 30px;
  border-bottom: 1px solid #e4e7ed;
}

.result-title {
  font-size: 32px;
  margin: 20px 0;
  font-weight: 700;
}

.score-display {
  margin: 20px 0;
}

.score-number {
  font-size: 48px;
  font-weight: 700;
  color: #409EFF;
}

.score-total {
  font-size: 24px;
  color: #666;
}

.score-percentage {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.result-message {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.detailed-results {
  padding: 30px;
}

.detailed-results h3 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.question-result-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 2px solid #e4e7ed;
}

.question-result-item.correct {
  border-color: #67C23A;
  background-color: #f0f9ff;
}

.question-result-item.incorrect {
  border-color: #F56C6C;
  background-color: #fef0f0;
}

.question-number {
  font-weight: 600;
  margin-right: 15px;
  min-width: 60px;
}

.question-text {
  flex: 1;
  margin-right: 15px;
}

.answer-info {
  margin-right: 15px;
  text-align: right;
  font-size: 14px;
}

.user-answer {
  margin-bottom: 5px;
}

.correct-answer {
  color: #67C23A;
  font-weight: 600;
}

.result-icon {
  font-size: 20px;
}

.result-actions {
  padding: 30px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .quiz-module {
    padding: 10px;
  }
  
  .quiz-title {
    font-size: 28px;
  }
  
  .question-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .result-actions {
    flex-direction: column;
  }
  
  .question-result-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
  
  .answer-info {
    text-align: left;
    margin-top: 10px;
  }
}
</style>