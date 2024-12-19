const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  devServer: { 
    // port:8080,
    // host:'localhost',
    // open:true,
   proxy:{
     "/ca":{
       target:"http://127.0.0.1:80",
       changeOrigin: true,
       pathRewrite:{
         "^/ca":''
       },
     }
   }

    
    },
   



  
})