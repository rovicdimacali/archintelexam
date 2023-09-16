<template>
  <UserForm v-if="showUserForm" @close="toggleUserForm" />
  <CompanyForm v-if="showCompanyForm" @close="toggleCompanyForm" />
  <ArticleForm v-if="showArticleForm" @close="toggleArticleForm" />
  <CompanyList v-if="showCompanyList" @close="toggleCompanyList" />
  <UserList v-if="showUserList" @close="toggleUserList" />
  <h1>All Media</h1>
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
        <tr v-for="article in articles" :key="article.id">
          <th>Update</th>
          <th>{{ article.image }}</th>
          <th>{{ article.title }}</th>
          <th>{{ article.link }}</th>
          <th>{{ getUserName(article.writer) }}</th>
          <th>{{ getUserName(article.editor) }}</th>
          <th>{{ article.status }}</th>
        </tr>
      </tbody>
    </table>
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
import { useRoute } from "vue-router";
export default {
  components: { UserForm, CompanyForm, ArticleForm },
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

    onBeforeMount(async () => {
      articles.value = await loadAllArticles();
      users.value = await loadAllUsers();
      userType.value = await loadUser(route.params.userID);
      userType.value = userType.value[0].type;

      console.log("users", users.value);
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
      }
    );

    const getUserName = (userID) => {
      const user = users.value.find((user) => user.id === userID);
      return user ? `${user.firstname} ${user.lastname}` : "";
    };

    return { articles, userType, getUserName };
  },
};
</script>

<style></style>
