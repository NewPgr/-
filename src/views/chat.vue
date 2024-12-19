<template>
<el-main>
  <div class="a">
        <div class="top-controls">
        <!-- 字体大小下拉框 -->
        <el-select v-model="fontSize" placeholder="选择字体大小" class="control-item">
          <el-option label="12px" value="12"></el-option>
          <el-option label="16px" value="16"></el-option>
          <el-option label="20px" value="20"></el-option>
          <el-option label="24px" value="24"></el-option>
          <el-option label="28px" value="28"></el-option>
          <el-option label="32px" value="32"></el-option>
        </el-select>

   <el-color-picker v-model="fontColor" label="字体颜色" />
   <p>{{fontColor}}</p>

        <!-- 搜索框 -->
        <el-input
          v-model="input1"
          placeholder="请输入搜索内容..."
          class="search-input"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchText"></el-button>
        </el-input>


        </div>
<div>
<h2>{{te}}</h2>
<h7>{{riqi}}</h7>
<el-input
  type="textarea"
  rows="30"
  v-model="formData.outcome"
  :style="{ fontSize: fontSize + 'px',color: fontColor + '!important'}"
  >
  </el-input>
</div>
 <el-button type="success" icon="el-icon-check"  v-if="isVisible" @click="touch1()">保存</el-button>



  <div class="container">
<el-input v-model="input" placeholder="说点什么吧..." class="a1" clearable> 
  <el-button slot="append" icon="el-icon-arrow-right" @click="touch()"></el-button>
</el-input>
</div>
</div>
   
   
   
    </el-main>





</template>


<script>
import axios from 'axios';
  export default {
    data() {
      return {
       cs:'',
       isVisible:false,  //按钮隐藏
       te:'',             //输入的内容
       input:'',
       input1:'',          //用于搜索
       fontSize: 16,  // 默认字体大小
       fontColor: '#000000', // 默认字体颜色
       biaoti:'',
       currentData:'',    //当前日期
       currentTime: '',   //当前时间
       riqi:'',           
       shuju: '',
       formData: {
        title:'',
        content:'',
        outcome: '',
      }




      }
    },






    methods: {
      
    searchText() {
      const query = this.input1;
      const regex = new RegExp(query, 'gi');
      const text = this.formData.outcome;

      // 如果搜索到文字，则高亮显示
      if (query) {
        this.formData.outcome = text.replace(regex, match => `----${match}----`);
      } else {
        // 如果没有输入搜索文字，则清空高亮
        this.formData.outcome = text;
      }
    },


      
      getCurrentDate() {
      const now = new Date();
      return now.toLocaleDateString(); // 返回本地化格式的日期
    },



         getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString(); // 返回本地时间格式的时间
    },
      touch(){
      this.currentData = this.getCurrentDate();
      this.currentTime = this.getCurrentTime();
      this.riqi = this.currentData + '--' + this.currentTime;
      this.te = this.input;
      this.isVisible = true;
      this.input = '';
       axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        model: 'glm-4v-plus', // 模型名称
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: this.te },
              { type: 'text', text: '请按要求回答，字数不超过500' } // 提示文字
            ]
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '09087d922b0840ec080b8358fe89b20e.WddWeXS9YQPlzGhR' // 替换为实际 API Key
        }
      })
      .then(response => {
        // 请求成功时的处理
        if (response.status === 200) {
          console.log('请求成功:', response.data.choices[0].message.content);
          this.shuju = response.data.choices[0].message.content;
          this.formData.outcome = response.data.choices[0].message.content;
          this.formData.title = this.te;
          this.formData.content = this.te + '--' +this.riqi;
        } else {
          console.error('服务器返回错误:', response.data);
        }
      })
      .catch(error => {
        // 网络错误的处理
        console.error('网络错误:', error);
      });
    },


        //网络请求
         touch1(){
             const that = this;
        let a = this.formData.title
        let b = this.formData.content
        let c = this.formData.outcome
   axios.get("/ca/information/AddInformation",{params:{title:a,content:b,outcome:c}})
    this.$message.success('保存成功');
    this.isVisible = false;
       },























    }
  }
</script>

<style>
.a {
  display: flex;
  flex-direction: column;  /* 将子元素按列排列 */
  height: 100vh;           /* 让整个容器高度占满视口 */
  padding: 20px;
  box-sizing: border-box;   /* 包括 padding 和 border 在内的宽高计算 */
}
/* 控制面板（顶部） */
.top-controls {
  display: flex;
  align-items: center;
  gap: 20px; /* 控件之间的间距 */
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}
/* 控制面板每个控件 */
.control-item {
  margin-right: 15px;
}

/* 搜索框样式 */
.search-input {
  flex-grow: 1; /* 输入框占满可用空间 */
  margin-right: 15px;
}





/* 文本框容器 */
.textarea-container {
  flex-grow: 1;  /* 让textarea区域自适应占用剩余的空间 */
  overflow: auto; /* 如果内容溢出，允许滚动 */
  margin: 10px 0;  /* 在上面和下面留一些间距 */
}

/* 调整底部输入框容器 */
.container {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  width: 100%;
  margin-top: 20px;          /* 输入框和其他元素之间留出一点间距 */
}

/* 自定义输入框样式 */
.a1 {
  padding: 10px 50px;   /* 增加左右内边距 */
  font-size: 16px;
  width: 80%;  /* 让输入框占据大部分的宽度 */
}

/* 按钮样式调整 */
.el-button {
  margin-top: 20px;    /* 按钮距离文本框一定距离 */
}
</style>