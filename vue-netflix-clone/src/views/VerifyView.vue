<template>
  <div class="login-page">
    <div class="background-overlay"></div>
    <logo-header />
    <div class="login-container">
      <div class="login-card">
        <div v-if="success" class="success-box">
          {{ success }}
        </div>
        <div v-if="error" class="error-box">
          {{ error }}
        </div>

        <form @submit.prevent="verifyCode">
          <div class="text-container">
            <h1>Verify Your Code</h1>
            <h2>Enter the code we just sent</h2>
            <p class="instruction">
              We sent a sign-in code to samsoncoded@gmail.com. The code will
              expire in 15 minutes.
            </p>
          </div>
          <div class="form-group">
            <div class="otp-container">
              <input
                v-for="(digit, index) in digits"
                :key="index"
                v-model="digits[index]"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="otp-input"
                :class="{ 'error-border': codeError }"
                @input="handleInput($event, index)"
                @keydown="handleKeydown($event, index)"
                @paste="index === 0 ? handlePaste($event) : null"
                ref="inputs"
              />
            </div>
            <div v-if="codeError" class="error-text">
              <svg
                class="error-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  fill="#e87c03"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                />
              </svg>
              Please enter a valid 4-digit code
            </div>
          </div>

          <button type="submit" class="btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Verify</span>
          </button>

          <div class="or-divider">OR</div>

          <router-link to="/login" class="router-button">
            <button type="button" class="btn code-btn">
              Sign in with password
            </button>
          </router-link>

          <p class="message-rates">Message and data rates may apply</p>

          <div class="signup">
            New to Netflix?
            <a href="#">Sign up now.</a>
          </div>

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
  name: "VerifyView",
  components: {
    LogoHeader,
    AuthFooter,
  },
  data() {
    return {
      digits: ["", "", "", ""],
      error: "",
      codeError: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    validateCode() {
      const code = this.digits.join("");
      const codeRegex = /^\d{4}$/;
      if (!codeRegex.test(code)) {
        this.codeError = "Please enter a valid 4-digit code";
      } else {
        this.codeError = "";
      }
    },
    handleInput(event, index) {
      const value = event.target.value;
      if (value && !/^\d$/.test(value)) {
        this.digits[index] = "";
        return;
      }
      if (value && index < 3) {
        this.$refs.inputs[index + 1].focus();
      }
      this.validateCode();
    },
    handleKeydown(event, index) {
      if (event.key === "Backspace" && !this.digits[index] && index > 0) {
        this.$refs.inputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text").replace(/\D/g, "");
      if (pastedData.length === 4) {
        this.digits = pastedData.split("");
        this.validateCode();
        this.$refs.inputs[3].focus();
      } else {
        this.codeError = "Please paste a valid 4-digit code";
      }
    },
    async verifyCode() {
      this.validateCode();

      if (this.codeError) {
        return;
      }

      this.loading = true;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockCode = "1234";
      const code = this.digits.join("");

      if (code === mockCode) {
        this.error = "";
        this.success = "Code verified successfully!";
        this.digits = ["", "", "", ""];
        this.codeError = "";
      } else {
        this.error = "Invalid code. Please try again.";
        this.success = "";
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  width: 100vw;
  background-image: url("@/assets/background.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: #fff;
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
  align-items: flex-start;
  min-height: calc(100vh - 100px);
  background: transparent;
  margin-top: 100px;
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
}

.text-container {
  text-align: center;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.25rem;
  font-weight: normal;
  color: #fff;
  margin-bottom: 0.5rem;
}

.instruction {
  color: #8c8c8c;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.form-group {
  margin-bottom: 1rem;
  position: relative;
  display: block;
}

.otp-container {
  display: flex;
  gap: 0.1rem;
  justify-content: space-between;
}

.otp-input {
  width: 40px;
  height: 48px;
  padding: 0;
  background: #333;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.25rem;
  text-align: center;
  box-sizing: border-box;
}

.otp-input.error-border {
  border: 2px solid #e87c03 !important;
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

.signup {
  font-size: 0.95rem;
  margin-top: 1rem;
}

.signup a {
  color: #fff;
  text-decoration: none;
  margin-left: 0.3rem;
}

.message-rates {
  color: #8c8c8c;
  font-size: 0.75rem;
  margin-top: 1rem;
  line-height: 1.4;
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

.success-box {
  background-color: #28a745;
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

auth-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

/* Mobile view adjustments */
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
    margin-top: 100px;
    min-height: calc(100vh - 100px);
  }

  .login-card {
    padding: 1rem 1rem;
    max-width: 90%;
  }

  .otp-input {
    width: 36px;
    height: 40px;
    font-size: 1.1rem;
  }

  .otp-container {
    gap: 0.1rem;
  }
}
</style>
