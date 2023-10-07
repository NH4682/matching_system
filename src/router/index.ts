import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import Login from "../pages/Login.vue";
import RegistrationForm from "../pages/RegistrationForm.vue";
import BasicLayouts from "../layouts/BasicLayouts.vue";
import { useCounterStore } from "@/stores/counter";
import { currentUser } from "@/myaxios/api";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "BasicLayouts",
      redirect: "/home", // "/" 跳转到 "/home"
      component: BasicLayouts,
      children: [
        {
          path: "/home",
          name: "home",
          component: Index,
          meta: {
            title: "主页",
          },
        },
        {
          path: "/user",
          name: "user",
          component: User,
          meta: {
            title: "个人",
          },
        },
        {
          path: "/team",
          name: "team",
          component: Team,
          meta: {
            title: "队伍",
          },
        },
        {
          path: "/search",
          name: "search",
          component: Search,
          meta: {
            title: "搜索",
          },
        },
        {
          path: "/user/edit",
          name: "edit",
          component: UserEdit,
          meta: {
            title: "修改",
          },
        },
        {
          path: "/search/result",
          name: "search_result",
          component: SearchResult,
          meta: {
            title: "搜索结果",
          },
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationForm,
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  useCounterStore().titleName = to.meta.title;
  useCounterStore().logininfo = await currentUser();
  next();
});

//拦截未登录用户
router.beforeEach(async (to, from) => {
  if (
    // 检查用户是否已登录
    !useCounterStore().logininfo &&
    // ❗️ 避免无限重定向
    to.name !== "login" &&
    to.name !== "registration"
  ) {
    // 将用户重定向到登录页面
    return { name: "login" };
  }
});

export default router;
