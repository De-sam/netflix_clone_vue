<template>
  <div class="login-page">
    <LogoHeader />
    <LoginForm @success="handleLoginSuccess" />
    <AuthFooter />
  </div>
</template>

<script>
import LogoHeader from "@/components/LogoHeader.vue";
import AuthFooter from "@/components/AuthFooter.vue";
import LoginForm from "@/components/LoginForm.vue";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "LoginView",
  components: {
    LogoHeader,
    LoginForm,
    AuthFooter,
  },
  setup() {
    const authStore = useAuthStore();

    const handleLoginSuccess = () => {
      authStore.login("demo");
      window.location.href = "/2fa";
    };

    return { handleLoginSuccess };
  },
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
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

/* Netflix-style semi-transparent dark overlay */
.login-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Dark fade for readability */
  z-index: 1;
}

/* Ensure children render above overlay */
.login-page > * {
  position: relative;
  z-index: 2;
}
</style>
