<template>
<el-container>
 <el-header>
   <div class="h">
      <h1>记事本测试系统</h1>
      <el-dropdown trigger="click">
      <el-button class="custom-button"  circle></el-button>
       <el-dropdown-menu slot="dropdown">
      <el-dropdown-item  @click.native="tc()">退出登陆</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
        </div>
 </el-header>

<el-container>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu default-active="/src/views/home.vue"  
        :router="true"><!-- :router="true"开启导航 -->
      
<el-submenu index="1">
     <template slot="title"><i class="el-icon-message"></i>记事本功能</template>
          <el-menu-item index="聊天">聊天</el-menu-item>
          <el-menu-item index="查看信息">查看信息</el-menu-item>
          <el-menu-item index="测试">测试页面</el-menu-item>
          <el-menu-item index="测试图片">测试图片</el-menu-item>
      </el-submenu>
    </el-menu>


  </el-aside>

<el-main>  
<router-view>  
 
</router-view>
 </el-main>









</el-container>

</el-container>








</template>

<script>
export default {
  created(){
    // 在组件加载时读取 localStorage 中的登录状态
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log(this.$route.query.message)
    this.$message({
          message: '欢迎登陆,'+this.$route.query.message,
          type: 'success'
        });
        },
    data() {
    return {
       isAuthenticated: false,  // 初始化登录状态
      data: ['1'] // 正确声明 data 属性
    };
    
  },
  methods: {
    tc(){
      localStorage.removeItem('isAuthenticated');
            this.$message({
          showClose: true,
          message: '退出成功',
          type: 'success'
        });
        this.$router.push("/")
    }
  }

      
}
</script>

<style scoped>
.h {
  display: flex;
  justify-content: space-between;  /* 将标题和按钮分布到两边 */
  align-items: center;  /* 垂直居中 */
  width: 100%;  /* 确保容器宽度为 100% */
  background-color:black;
}

h1 {
  margin: 0;  /* 移除 h1 的默认外边距 */
  flex-grow: 1;  /* 让标题占据剩余的空间，从而居中 */
  text-align: center;  /* 使标题文本居中 */
  color:white;
}

.el-button {
  margin-left: auto;  /* 将按钮推到右边 */
}
.custom-button {
    background-image: url('/src/assets/1.jpg');
    background-size: cover;  /* 让图片填满按钮 */
    background-position: center;  /* 保证图片居中显示 */
    width: 50px;  /* 设置按钮的宽度 */
    height: 50px; /* 设置按钮的高度 */
    border-radius: 50%; /* 确保按钮是圆形 */
}
</style>