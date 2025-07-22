import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/Login.vue";
import LoginWithCodeView from "@/views/LoginWithCode.vue";
import TwoFactorView from "@/views/TwoFactor.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/login-code",
    name: "LoginWithCode",
    component: LoginWithCodeView,
  },
  {
    path: "/2fa",
    name: "TwoFactor",
    component: TwoFactorView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
