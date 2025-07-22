import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/Login.vue";
import LoginWithCodeView from "@/views/LoginWithCode.vue";
import TwoFactorView from "@/views/TwoFactor.vue";
import VerifyView from "@/views/VerifyView.vue";
import HomeView from "@/views/HomeView.vue";

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
  {
    path: "/verify",
    name: "Verify",
    component: VerifyView,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
