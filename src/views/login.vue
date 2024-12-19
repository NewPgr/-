<template >
 <div >
<div class="back">
     <div class="login">
       <h1>记事本系统登陆</h1>
       <br>
       <br>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号">
            <el-input v-model="form.model"  ></el-input>
        </el-form-item>

        <el-form-item label="密码">
            <el-input v-model="form.model1" type="password" ></el-input>
        </el-form-item>
         <el-button type="primary" @click="dl()">登录</el-button>
          <el-button  size="mini"  >忘记密码</el-button>
           <el-button  size="mini"  class="zc" @click="qzc()">?去注册</el-button>
    </el-form>
     </div>
     </div>
 </div>
</template>


<script>
import axios from 'axios';
  export default {
    data() {
      return {
     isAuthenticated:false,
     form: {
     model:'',
     model1:'',
     },
      rules: {
      model:[
        { required:true, message: '请输入账号', trigger: 'blur' },
            { max: 10, message: '长度不超过10个字符', trigger: 'blur' }
      ],
       model1:[
        { required:true, message: '请输入密码', trigger: 'blur' },
            {min:8, message: '长度要超过8个字符', trigger: 'blur' }
      ],
      }

      };
  
    },


    methods: {
    dl(){
        let a = this.form.model
        let b = this.form.model1
     axios.get("/ca/user/Login",{params:{username:a,password:b}}).then(res =>{
      console.log(res.data.data)
       if(res.data.data != null && res.data.data.length != 0){
// 成功登录后，设置登录状态
      localStorage.setItem('isAuthenticated', 'true');
      // 登录后跳转到仪表板
      this.$router.push( {path:"zhuye", query:{message: res.data.data}})
      }else{
     //     localStorage.setItem('isAuthenticated', 'false');
         localStorage.removeItem('isAuthenticated');
            this.$message({
          showClose: true,
          message: '账号或密码错误',
          type: 'error'
        });
      }
      })
     

    },
    qzc(){
       this.$router.push('/registered'); // 跳转到注册页
    }
      
    }
  }
</script>
<style>
.login{
    background-size: cover;
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat;
    height: 60%;
    width: 40%;
    position:absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border: 1px solid  black
}
.login:hover{
    background:white;
}
.zc{
    position:absolute;
    right: 0;
}
.back{
    width: 100%;
    height: 100%;

}
</style>