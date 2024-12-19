<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <!-- 用户名 -->
      <div class="form-group">
        <label for="username">用户名</label>
        <input v-model="form.username" type="text" id="username" placeholder="请输入用户名" required />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>

      <!-- 密码 -->
      <div class="form-group">
        <label for="password">密码</label>
        <input v-model="form.password" type="password" id="password" placeholder="请输入密码" required />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <!-- 确认密码 -->
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input v-model="form.confirmPassword" type="password" id="confirmPassword" placeholder="请再次输入密码" required />
        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
      </div>

      <!-- 提交按钮 -->
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    // 注册逻辑
    register() {
      this.clearErrors();

      // 表单验证
      if (!this.form.username) {
        this.errors.username = '用户名不能为空';
      }
      if (!this.form.password) {
        this.errors.password = '密码不能为空';
      } else if (this.form.password.length < 6) {
        this.errors.password = '密码长度不能小于6位';
      }
      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = '两次密码输入不一致';
      }

      // 如果有错误，阻止提交
      if (Object.values(this.errors).some((error) => error)) {
        return;
      }

      // 模拟 API 调用注册
      this.$axios
        .post('/api/register', this.form)
        .then((response) => {
          // 注册成功后的操作
          this.$router.push('/login'); // 跳转到登录页
        })
        .catch((error) => {
          // 处理注册错误
          console.error('注册失败', error);
        });
    },
    // 清除错误信息
    clearErrors() {
      this.errors.username = '';
      this.errors.password = '';
      this.errors.confirmPassword = '';
    },
  },
};
</script>

<style scoped>
.register {
  width: 400px;  /* 增大宽度 */
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 24px;  /* 增大标题字体 */
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;  /* 增加每个输入框之间的间距 */
}

label {
  width: 120px;  /* 增大标签宽度 */
  margin-right: 15px;
  font-weight: bold;
  font-size: 16px;  /* 增大标签字体 */
}

input {
  flex-grow: 1;
  padding: 12px;  /* 增大输入框内边距 */
  font-size: 16px;  /* 增大输入框字体 */
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;  /* 增大按钮字体 */
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;  /* 增大错误信息字体 */
  margin-left: 10px;
}
</style>