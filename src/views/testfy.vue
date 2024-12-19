<template>
  <div class="upload-container">
    <h2>上传图片</h2>

    <!-- 图片上传 -->
    <input type="file" @change="handleFileChange" accept="image/*" />
    
    <!-- 显示图片预览 -->
    <div v-if="imageUrl">
      <h3>图片预览:</h3>
      <img :src="imageUrl" alt="preview" width="200" />
    </div>
    
    <!-- 上传按钮 -->
    <button @click="uploadImage" :disabled="!file">上传图片</button>
    
    <!-- 上传状态 -->
    <div v-if="uploading">上传中...</div>
    <div v-if="uploadSuccess !== null">
      <p v-if="uploadSuccess">图片上传成功！</p>
      <p v-else>图片上传失败，请重试。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,       // 存储选中的文件
      imageUrl: null,   // 存储图片预览 URL
      uploading: false, // 上传中标志
      uploadSuccess: null, // 上传成功或失败的标志
    };
  },
  methods: {
    // 处理文件选择
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.file = file;

        // 创建图片的预览 URL
        this.imageUrl = URL.createObjectURL(file);
      }
    },

    // 上传图片
    async uploadImage() {
      if (!this.file) {
        return;
      }

      this.uploading = true;
      this.uploadSuccess = null;

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        // 调用后端接口上传文件
        const response = await this.$axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // 根据后端返回的状态处理
        if (response.status === 200) {
          this.uploadSuccess = true;
        } else {
          this.uploadSuccess = false;
        }
      } catch (error) {
        console.error('上传失败', error);
        this.uploadSuccess = false;
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
}

button {
  margin-top: 20px;
}

img {
  margin-top: 20px;
}
</style>