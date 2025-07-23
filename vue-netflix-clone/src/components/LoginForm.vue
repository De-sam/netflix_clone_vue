<template>
  <div class="login-page">
    <div class="background-overlay"></div>
    <logo-header />
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
            <button type="button" class="btn code-btn">
              Sign in with code
            </button>
          </router-link>

          <p class="signup">
            New to Netflix?
            <a href="#">Sign up now.</a>
          </p>

          <p class="disclaimer">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a href="#">Learn more.</a>
          </p>
        </form>
      </div>
    </div>
    <auth-footer />
  </div>
</template>

<script>
import LogoHeader from "../components/LogoHeader.vue";
import AuthFooter from "../components/AuthFooter.vue";

export default {
  name: "LoginView",
  components: {
    LogoHeader,
    AuthFooter,
  },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      emailError: false,
      passwordError: false,
      error: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    validateEmailOrPhone() {
      const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
      const phoneRegex = /^\+?\d{7,15}$/;
      this.emailError = !(
        emailRegex.test(this.username) || phoneRegex.test(this.username)
      );
    },
    validatePassword() {
      this.passwordError = !(
        this.password &&
        this.password.length >= 8 &&
        this.password.length <= 60
      );
    },
    async handleLogin() {
      this.validateEmailOrPhone();
      this.validatePassword();

      if (this.emailError || this.passwordError) return;

      try {
        this.error = "";
        this.$router.push("/");
      } catch (e) {
        this.error = "Incorrect password or account doesn't exist.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-image: url("@/assets/background.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: transparent;
  transform: translateY(-30px);
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
  z-index: 5;
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

.btn:disabled {
  background: #b2070f;
  cursor: not-allowed;
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

auth-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

@media (max-width: 600px) {
  .login-page {
    background: #000 !important;
    background-image: none !important;
    width: 100vw;
    height: 100vh;
  }

  .background-overlay {
    display: none;
  }

  .login-container {
    transform: translateY(-30px);
  }

  .login-card {
    padding: 1rem 1rem;
    max-width: 90%;
  }
}
</style>
