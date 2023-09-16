<template>
  <UserForm v-if="showUserForm" @close="toggleUserForm" />
  <CompanyForm v-if="showCompanyForm" @close="toggleCompanyForm" />
  <ArticleForm v-if="showArticleForm" @close="toggleArticleForm" />
  <CompanyList v-if="showCompanyList" @close="toggleCompanyList" />
  <UserList v-if="showUserList" @close="toggleUserList" />
  <h1>Dashboard</h1>
  <button v-if="userType === 'Editor'" @click="toggleUserForm">Add User</button>
  <button v-if="userType === 'Editor'" @click="toggleCompanyForm">
    Add Company
  </button>
  <button v-if="userType === 'Editor'" @click="toggleCompanyList">
    Manage Company
  </button>
  <button v-if="userType === 'Editor'" @click="toggleUserList">
    Manage User
  </button>
  <button v-if="userType === 'Writer'" @click="toggleArticleForm">
    Create Article
  </button>
  <div>For Edit Articles</div>
  <ul>
    <li v-for="forEditArticle in forEditArticles" :key="forEditArticle.id">
      {{ forEditArticle.title }}
    </li>
  </ul>
  <div>Published Articles</div>
  <ul>
    <li
      v-for="publishedArticle in publishedArticles"
      :key="publishedArticle.id"
    >
      {{ publishedArticle.title }}
    </li>
  </ul>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import CompanyForm from "../components/CompanyForm.vue";
import ArticleForm from "../components/ArticleForm.vue";
import CompanyList from "../components/CompanyList.vue";
import UserList from "../components/UserList.vue";

import {
  loadForEditArticles,
  loadPublishedArticles,
  loadUser,
} from "../composables/callApi";
import { ref, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
export default {
  components: { UserForm, CompanyForm, ArticleForm, CompanyList, UserList },
  data() {
    return {
      showUserForm: false,
      showCompanyForm: false,
      showArticleForm: false,
      showCompanyList: false,
      showUserList: false,
      atDashboard: true,
    };
  },
  methods: {
    handleUserAdded(newUser) {
      this.newUser = newUser;
    },
    toggleUserForm() {
      this.showUserForm = !this.showUserForm;
    },
    toggleCompanyForm() {
      this.showCompanyForm = !this.showCompanyForm;
    },
    toggleArticleForm() {
      this.showArticleForm = !this.showArticleForm;
    },
    toggleCompanyList() {
      this.showCompanyList = !this.showCompanyList;
    },
    toggleUserList() {
      this.showUserList = !this.showUserList;
    },
  },
  setup() {
    const route = useRoute();
    const forEditArticles = ref([]);
    const publishedArticles = ref([]);
    const userType = ref({ type: "" });

    onBeforeMount(async () => {
      forEditArticles.value = await loadForEditArticles();
      publishedArticles.value = await loadPublishedArticles();
      userType.value = await loadUser(route.params.userID);
      userType.value = userType.value[0].type;
    });

    watch(
      () => route.params,
      async () => {
        forEditArticles.value = await loadForEditArticles();
        publishedArticles.value = await loadPublishedArticles();
        userType.value = await loadUser(route.params.userID);
        userType.value = userType.value[0].type;
      }
    );

    return { forEditArticles, publishedArticles, userType };
  },
};
</script>

<style></style>
