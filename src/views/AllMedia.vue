<template>
  <UserForm v-if="showUserForm" @close="toggleUserForm" />
  <CompanyForm v-if="showCompanyForm" @close="toggleCompanyForm" />
  <ArticleForm v-if="showArticleForm" @close="toggleArticleForm" />
  <CompanyList v-if="showCompanyList" @close="toggleCompanyList" />
  <UserList v-if="showUserList" @close="toggleUserList" />
  <div class="all-media">
    <h1 class="title">All Media</h1>
    <div class="all-media-actions">
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
    <input
      class="search-input"
      type="text"
      v-model="searchQuery"
      placeholder="Search by title"
    />
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Image</th>
            <th>Title</th>
            <th>Link</th>
            <th>Writer</th>
            <th>Editor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in filteredArticles" :key="article.id">
            <th>
              <RouterLink
                v-if="article.status === 'For Edit'"
                :to="{
                  name: 'ManageArticle',
                  params: {
                    userID: currentUserID,
                    articleID: article.id,
                  },
                }"
                >Update</RouterLink
              >
              <button v-if="article.status === 'Published'" disabled>
                Update
              </button>
            </th>
            <th>
              <img :src="article.image" alt="article_image" />
            </th>
            <th>{{ article.title }}</th>
            <th>
              <a
                class="article-link"
                style="word-break: break-all"
                :href="article.link"
                target="_blank"
              >
                {{ article.link }}
              </a>
            </th>
            <th>{{ getUserName(article.writer) }}</th>
            <th>{{ getUserName(article.editor) }}</th>
            <th>{{ article.status }}</th>
          </tr>
          <tr v-if="filteredArticles.length === 0">
            <th>No Data Found</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mobile-container">
      <div
        v-for="article in filteredArticles"
        :key="article.id"
        class="mobile-list"
      >
        <div class="header row">
          <div class="subtitle">Title:</div>
          <div class="content">
            {{ article.title }}
          </div>
        </div>
        <div class="row">
          <div class="image-content">
            <img :src="article.image" alt="article-image" />
          </div>
        </div>
        <div class="row">
          <div class="subtitle">Link:</div>
          <div class="content">
            <a :href="article.link">Click this Link</a>
          </div>
        </div>
        <div class="row">
          <div class="subtitle">Writer:</div>
          <div class="content">
            {{ getUserName(article.writer) }}
          </div>
        </div>
        <div class="row">
          <div class="subtitle">Editor:</div>
          <div class="content">
            {{ getUserName(article.editor) }}
          </div>
        </div>
        <div class="row">
          <div class="subtitle">Status:</div>
          <div class="content">
            {{ article.status }}
          </div>
        </div>
        <div class="row">
          <div class="action">
            <RouterLink
              v-if="article.status === 'For Edit'"
              :to="{
                name: 'ManageArticle',
                params: {
                  userID: currentUserID,
                  articleID: article.id,
                },
              }"
              >Update</RouterLink
            >
            <button v-if="article.status === 'Published'" disabled>
              Update
            </button>
          </div>
        </div>
      </div>
      <p v-if="filteredArticles.length === 0">No Data Found</p>
    </div>
  </div>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import CompanyForm from "../components/CompanyForm.vue";
import ArticleForm from "../components/ArticleForm.vue";

import {
  loadAllArticles,
  loadAllUsers,
  loadUser,
} from "../composables/callApi";
import { ref, watch, onBeforeMount } from "vue";
import { RouterLink, useRoute } from "vue-router";
export default {
  components: { UserForm, CompanyForm, ArticleForm },
  data() {
    return {
      showUserForm: false,
      showCompanyForm: false,
      showArticleForm: false,
      showCompanyList: false,
      showUserList: false,
      searchQuery: "",
    };
  },
  methods: {
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
    const articles = ref([]);
    const userType = ref({ type: "" });
    const users = ref([]);
    const currentUserID = ref();

    onBeforeMount(async () => {
      currentUserID.value = route.params.userID;
      articles.value = await loadAllArticles();
      users.value = await loadAllUsers();
      userType.value = await loadUser(route.params.userID);
      userType.value = userType.value[0].type;
    });

    watch(
      () => route.params,
      async (newParams, oldParams) => {
        console.log(
          "Route params changed:",
          "New Params:",
          newParams,
          "Old Params:",
          oldParams
        );
        articles.value = await loadAllArticles();
        users.value = await loadAllUsers();
        userType.value = await loadUser(route.params.userID);
        userType.value = userType.value[0].type;
        currentUserID.value = newParams.userID;
      }
    );

    const getUserName = (userID) => {
      const user = users.value.find((user) => user.id === userID);
      return user ? `${user.firstname} ${user.lastname}` : "";
    };

    return { articles, userType, getUserName, currentUserID };
  },
  computed: {
    filteredArticles() {
      if (this.searchQuery) {
        return this.articles.filter((article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.articles;
      }
    },
  },
};
</script>

<style></style>
