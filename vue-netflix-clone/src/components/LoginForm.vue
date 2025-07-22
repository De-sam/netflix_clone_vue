<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Sign In</h1>

      <div v-if="error" class="error-box">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            placeholder="Email or phone number"
            @input="validateEmailOrPhone"
            :class="{ 'error-border': emailError }"
          />
          <div v-if="emailError" class="error-text">
            <svg class="error-icon" viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="#e87c03"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
            </svg>
            Please enter a valid email or phone number
          </div>
        </div>

        <div class="form-group">
          <div class="password-field">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Password"
              @input="validatePassword"
              :class="{ 'error-border': passwordError }"
            />
            <button type="button" class="toggle-btn" @click="togglePassword">
              <svg
                v-if="showPassword"
                class="toggle-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  fill="#b3b3b3"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13C8.13 17.5 4.5 15.31 3.12 12 4.5 8.69 8.13 6.5 12 6.5s7.5 2.19 8.88 5.5c-1.38 3.31-5.01 5.5-8.88 5.5zm0-11c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                />
              </svg>
              <svg
                v-else
                class="toggle-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  fill="#b3b3b3"
                  d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                />
              </svg>
            </button>
          </div>
          <div v-if="passwordError" class="error-text">
            <svg class="error-icon" viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="#e87c03"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
            </svg>
            Your password must be between 4 and 60 characters
          </div>
        </div>

        <button type="submit" class="btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Sign In</span>
        </button>

        <div class="or-divider">OR</div>

        <router-link to="/login-code" class="router-button">
          <button type="button" class="btn code-btn">Use a sign-in code</button>
        </router-link>

        <div class="forgot-link">
          <a href="#">Forgot password?</a>
        </div>

        <div class="options">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </label>
        </div>

        <div class="signup">
          New to Netflix?
          <a href="#">Sign up now.</a>
        </div>

        <p class="disclaimer">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <a href="#">Learn more.</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
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
      if (!emailRegex.test(this.username) && !phoneRegex.test(this.username)) {
        this.emailError = "Please enter a valid email or phone number";
      } else {
        this.emailError = "";
      }
    },
    validatePassword() {
      if (this.password.length < 4 || this.password.length > 60) {
        this.passwordError =
          "Your password must be between 4 and 60 characters";
      } else {
        this.passwordError = "";
      }
    },
    async handleLogin() {
      this.validateEmailOrPhone();
      this.validatePassword();

      if (this.emailError || this.passwordError) {
        return;
      }

      this.loading = true;

      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        username: "samsoncoded@gmail.com",
        password: "password123",
      };

      if (
        this.username === mockUser.username &&
        this.password === mockUser.password
      ) {
        this.error = "";
        this.$emit("success");
      } else {
        this.error = `Incorrect password for ${this.username}. You can use a sign-in code, reset your password or try again.`;
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
  transform: translateY(-30px);
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

input.error-border {
  border: 2px solid #e87c03 !important;
}

.password-field {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-icon {
  width: 16px;
  height: 16px;
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
  position: relative;
}

.btn:disabled {
  background: #b2070f;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

.forgot-link {
  margin: 1rem 0;
  text-align: center;
}

.forgot-link a {
  color: #fff;
  font-size: 0.9rem;
  text-decoration: underline;
}

.options {
  margin-bottom: 1rem;
  font-size: 0.9rem;
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

.error-box {
  background-color: #e87c03;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #fff;
  box-sizing: border-box;
}

.error-text {
  color: #e87c03;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-icon {
  width: 16px;
  height: 16px;
}

/* Mobile view adjustments */
@media (max-width: 600px) {
  .login-card {
    padding: 2rem 1.5rem;
    max-width: 90%;
  }

  .background-wrapper {
    background: #000;
  }

  .background-overlay {
    display: none;
  }

  .logo {
    position: absolute;
    top: 15px;
    left: 20px;
    z-index: 10;
  }
}
</style>
