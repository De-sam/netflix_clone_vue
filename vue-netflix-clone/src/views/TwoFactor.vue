<template>
  <div class="two-factor-page">
    <div class="background-overlay"></div>
    <logo-header />
    <div class="login-container">
      <div class="login-card">
        <h1>Two-Factor Authentication</h1>

        <div v-if="error" class="error-box">
          {{ error }}
        </div>

        <div v-if="success" class="success-box">
          {{ success }}
        </div>

        <form @submit.prevent="handleSubmit">
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
              Please enter a valid 6-digit code
            </div>
          </div>

          <button type="submit" class="btn" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            <span v-else>Submit</span>
          </button>

          <div class="resend-link">
            <a href="#">Resend code?</a>
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
  name: "TwoFactorView",
  components: {
    LogoHeader,
    AuthFooter,
  },
  data() {
    return {
      digits: ["", "", "", "", "", ""], // Array for six digits
      error: "",
      success: "",
      codeError: "",
      loading: false,
    };
  },
  methods: {
    validateCode() {
      const code = this.digits.join("");
      const codeRegex = /^\d{6}$/;
      if (!codeRegex.test(code)) {
        this.codeError = "Please enter a valid 6-digit code";
      } else {
        this.codeError = "";
      }
    },
    handleInput(event, index) {
      const value = event.target.value;
      // Allow only single digit
      if (value && !/^\d$/.test(value)) {
        this.digits[index] = "";
        return;
      }
      // Move to next input if digit entered and not the last field
      if (value && index < 5) {
        this.$refs.inputs[index + 1].focus();
      }
      this.validateCode();
    },
    handleKeydown(event, index) {
      // Move to previous input on backspace if field is empty
      if (event.key === "Backspace" && !this.digits[index] && index > 0) {
        this.$refs.inputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pastedData = event.clipboardData.getData("text").replace(/\D/g, "");
      if (pastedData.length === 6) {
        this.digits = pastedData.split("");
        this.validateCode();
        this.$refs.inputs[5].focus(); // Focus last input
      } else {
        this.codeError = "Please paste a valid 6-digit code";
      }
    },
    async handleSubmit() {
      this.validateCode();

      if (this.codeError) {
        return;
      }

      this.loading = true;

      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockCode = "123456";
      const code = this.digits.join("");

      if (code === mockCode) {
        this.error = "";
        this.success = "Authentication successful";
        this.$emit("success");
      } else {
        this.error =
          "Invalid verification code. Please try again or resend a new code.";
        this.success = "";
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.two-factor-page {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background-image: url("../assets/background.webp");
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
  background: rgba(0, 0, 0, 0.5);
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

.otp-container {
  display: flex;
  gap: 0.5rem;
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

input.error-border {
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

.resend-link {
  margin: 1rem 0;
  text-align: center;
}

.resend-link a {
  color: #fff;
  font-size: 0.9rem;
  text-decoration: underline;
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
  .two-factor-page {
    background: #000 !important; /* Solid dark background for mobile */
    background-image: none !important;
    width: 100vw;
    height: 100vh;
  }

  .background-overlay {
    display: none; /* Hide overlay in mobile */
  }

  .login-container {
    transform: translateY(-30px); /* Match LoginForm.vue */
  }

  .login-card {
    padding: 1rem 1rem; /* Reduced padding for compact mobile layout */
    max-width: 90%;
  }

  .otp-input {
    width: 36px; /* Slightly smaller for mobile */
    height: 40px;
    font-size: 1.1rem;
  }
}
</style>
