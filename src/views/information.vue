<template>
<el-main>
  <el-dialog
  title="修改"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form :label-position="labelPosition" label-width="80px" :model="information" >
  <el-form-item label="标题">
    <el-input v-model="information.title"></el-input>
  </el-form-item>
  <el-form-item label="内容">
    <el-input type="textarea" v-model="information.outcome"  autosize ></el-input>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="touch()">修 改</el-button>
  </span>
</el-dialog>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
  
  
  <el-form-item label="标题">
    <el-input v-model="title" placeholder="标题" size="mini"></el-input>
  </el-form-item>
  


   <el-form-item>
    <el-button type="primary" icon="el-icon-search" size="mini" @click="onSubmit()">查询</el-button>
  </el-form-item>
 
</el-form>

 <el-table
    :data="shuju1"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="150"
      align="center">
    </el-table-column>
      <el-table-column
      fixed
      prop="title"
      label="标题"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="content"
      label="标题和时间"
      width="250"
      align="center">
    </el-table-column>

  <el-table-column
      prop="outcome"
      label="内容"
      width="800"
      align="center">
    </el-table-column>
      <el-table-column
      prop="image"
      label="图片"
      width="100"
      align="center">
    </el-table-column>
   
     <el-table-column
      fixed="right"
      label="操作"
      width="300"
      align="center">
   






     <template  slot-scope="scope" >






          
   <el-button type="primary" icon="el-icon-edit" size="mini"  @click="xg(scope.row)">编辑</el-button>
  <el-button type="danger" icon="el-icon-delete" size="mini"  @click="sc(scope.row)">删除</el-button>
         </template>
          </el-table-column>
        
  </el-table>




    </el-main>



</template>



<script>

import axios, { Axios } from 'axios'
export default {
created(){
       this.request1();
       //this.scheduleRefresh();  刷新页面
        },


    data() {
      return {
        shuju1:[],
        title:'',          //用于查询
        dialogVisible:false,
        currentData:'',    //当前日期
        currentTime: '',   //当前时间
        information: {     //用于修改
          id: '',
          content:'',
          image: '',
          outcome: '',
          
        },
        formInline: {      
          id: '',
          content:'',
          image: '',
          outcome: '',
          
        },
        
      }
    },

methods: {
    getCurrentDate() {
      const now = new Date();
      return now.toLocaleDateString(); // 返回本地化格式的日期
    },

    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString(); // 返回本地时间格式的时间
    },
//修改
    touch(){
        let a = this.information.id
        let b = this.information.title
        let c = this.information.outcome
        let d = this.information.title+ '--' + this.getCurrentDate() + '--' + this.getCurrentTime()
   axios.get("/ca/information/ReviseInformation",{params:{id:a,title:b,content:d,outcome:c}})
    this.$message.success('修改成功');
    this.dialogVisible = false;
  },
//修改数据的id
    xg(row){
 this.dialogVisible = true
 this.information.id = row.id
},

//查询
    onSubmit() {
    console.log(this.title)
    let a = this.title 
    axios.get("/ca/information/InquireInformation",{params:{title:a}}).then(res =>{
      console.log(res.data.data)
      this.shuju1 = res.data.data
      })

      },
//删除
    sc(row){
        console.log(row.id)

       this.$confirm('此操作将永久删除, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.get("/ca/information/DelInformation",{params:{id:row.id}}).then(() => {
        // 删除成功后，刷新当前路由
       //location.reload();  // 刷新页面
      });
          this.$message({
            type: 'error',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },

    request1() {
               axios.get("/ca/information/GetInformation")
        .then(res =>{
          console.log(res)
         this.shuju1 = res.data.data
         console.log(this.shuju1)
        })
        },


}
}

</script>

