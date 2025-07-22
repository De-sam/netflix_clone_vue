<template>
  <div class="login-box">
    <h1>Sign In with Code</h1>

    <form @submit.prevent="verifyCode">
      <div class="form-group">
        <input
          v-model="code"
          type="text"
          placeholder="Enter the 6-digit code"
          maxlength="6"
        />
      </div>

      <div v-if="error" class="error-box">{{ error }}</div>

      <button class="btn">Verify</button>

      <p class="alt-method">
        <router-link to="/login">Or, use your password to sign in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      error: "",
    };
  },
  methods: {
    verifyCode() {
      const mockCode = "123456";
      if (this.code === mockCode) {
        this.$emit("success");
      } else {
        this.error = "Invalid code. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
/* Same styling as LoginForm.vue, adjust spacing only */
.login-box {
  background: rgba(0, 0, 0, 0.75);
  padding: 3rem 2.5rem;
  max-width: 360px;
  margin: 100px auto;
  color: #fff;
  border-radius: 4px;
}
input[type="text"] {
  width: 100%;
  padding: 0.75rem;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
}
.btn {
  width: 100%;
  padding: 0.75rem;
  background: #e50914;
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
}
.alt-method {
  text-align: center;
  margin: 1rem 0;
}
.alt-method a {
  color: #b3b3b3;
  text-decoration: none;
}
.error-box {
  background-color: #e87c03;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
