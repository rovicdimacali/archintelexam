<template>
  <UserForm v-if="showUserForm" @close="toggleUserForm" />
  <CompanyForm v-if="showCompanyForm" @close="toggleCompanyForm" />
  <ArticleForm v-if="showArticleForm" @close="toggleArticleForm" />
  <CompanyList v-if="showCompanyList" @close="toggleCompanyList" />
  <UserList v-if="showUserList" @close="toggleUserList" />
  <div class="dashboard">
    <h1 class="title">Dashboard</h1>
    <div class="dashboard-actions row">
      <button v-if="userType === 'Editor'" @click="toggleUserForm">
        Add User
      </button>
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
    </div>
    <div class="dashboard-articles row">
      <div class="edit-articles">
        <ul>
          <li
            v-for="forEditArticle in forEditArticles"
            :key="forEditArticle.id"
          >
            <div class="article-list row">
              <div class="image-container">
                <img :src="forEditArticle.image" alt="article-image" />
              </div>
              <div class="info-container col">
                <div class="title-container">
                  {{ forEditArticle.title }}
                </div>
                <div class="link-container">
                  <a :href="forEditArticle.link">{{ forEditArticle.link }}</a>
                </div>
                <div class="date-container">
                  {{ forEditArticle.date }}
                </div>
                <div class="writer-container">
                  Written by: {{ getUserName(forEditArticle.writer) }}
                </div>
                <div
                  v-if="getUserName(forEditArticle.editor)"
                  class="editor-container"
                >
                  Edited by: {{ getUserName(forEditArticle.editor) }}
                </div>
              </div>
              <div class="status-badge">
                {{ forEditArticle.status }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="publish-articles">
        <ul>
          <li
            v-for="publishedArticle in publishedArticles"
            :key="publishedArticle.id"
          >
            <div class="article-list row">
              <div class="image-container">
                <img :src="publishedArticle.image" alt="article-image" />
              </div>
              <div class="info-container col">
                <div class="title-container">
                  {{ publishedArticle.title }}
                </div>
                <div class="link-container">
                  <a :href="publishedArticle.link">{{
                    publishedArticle.link
                  }}</a>
                </div>
                <div class="date-container">
                  {{ publishedArticle.date }}
                </div>
                <div class="writer-container">
                  Written by: {{ getUserName(publishedArticle.writer) }}
                </div>
                <div
                  v-if="getUserName(publishedArticle.editor)"
                  class="editor-container"
                >
                  Edited by: {{ getUserName(publishedArticle.editor) }}
                </div>
              </div>
              <div class="status-badge">
                {{ publishedArticle.status }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import CompanyForm from "../components/CompanyForm.vue";
import ArticleForm from "../components/ArticleForm.vue";
import CompanyList from "../components/CompanyList.vue";
import UserList from "../components/UserList.vue";

import {
  loadAllUsers,
  loadForEditArticles,
  loadPublishedArticles,
  loadUser,
} from "../composables/callApi";
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, RouterLink } from "vue-router";
export default {
  components: { UserForm, CompanyForm, ArticleForm, CompanyList, UserList },
  data() {
    return {
      showUserForm: false,
      showCompanyForm: false,
      showArticleForm: false,
      showCompanyList: false,
      showUserList: false,
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
    const users = ref([]);
    const publishedArticles = ref([]);
    const userType = ref({ type: "" });

    onBeforeMount(async () => {
      forEditArticles.value = await loadForEditArticles();
      publishedArticles.value = await loadPublishedArticles();
      users.value = await loadAllUsers();
      userType.value = await loadUser(route.params.userID);
      userType.value = userType.value[0].type;
    });

    watch(
      () => route.params,
      async () => {
        forEditArticles.value = await loadForEditArticles();
        publishedArticles.value = await loadPublishedArticles();
        users.value = await loadAllUsers();
        userType.value = await loadUser(route.params.userID);
        userType.value = userType.value[0].type;
      }
    );

    const getUserName = (userID) => {
      const user = users.value.find((user) => user.id === userID);
      return user ? `${user.firstname} ${user.lastname}` : "";
    };

    return { forEditArticles, publishedArticles, userType, getUserName };
  },
};
</script>

<style></style>
