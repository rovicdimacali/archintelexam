import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import AllMedia from "../views/AllMedia.vue";
import ManageCompany from "../views/ManageCompany.vue";
import ManageUser from "../views/ManageUser.vue";
import ManageArticle from "../views/ManageArticle.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/1",
    },
    {
      path: "/:userID?",
      name: "Dashboard",
      component: Dashboard,
      props: true,
    },
    {
      path: "/all-media",
      redirect: "/all-media/1",
    },
    {
      path: "/all-media/:userID?",
      name: "AllMedia",
      component: AllMedia,
      props: true,
    },
    {
      path: "/manage-company/:userID?/:companyID",
      name: "ManageCompany",
      component: ManageCompany,
      props: true,
    },
    {
      path: "/manage-user/:userID?/:userIdToUpdate",
      name: "ManageUser",
      component: ManageUser,
      props: true,
    },
    {
      path: "/manage-article/:userID?/:articleID",
      name: "ManageArticle",
      component: ManageArticle,
      props: true,
    },
  ],
});

export default router;
