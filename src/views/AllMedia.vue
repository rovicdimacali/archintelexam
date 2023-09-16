<template>
  <UserForm v-if="showUserForm" @close="toggleUserForm" />
  <CompanyForm v-if="showCompanyForm" @close="toggleCompanyForm" />
  <ArticleForm v-if="showArticleForm" @close="toggleArticleForm" />
  <button @click="toggleUserForm">Add User</button>
  <button @click="toggleCompanyForm">Add Company</button>
  <button v-if="userType === 'Writer'" @click="toggleArticleForm">
    Create Article
  </button>
</template>

<script>
import UserForm from "../components/UserForm.vue";
import CompanyForm from "../components/CompanyForm.vue";
import ArticleForm from "../components/ArticleForm.vue";

import { loadAllArticles, loadUser } from "../composables/callApi";
import { ref, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
export default {
  components: { UserForm, CompanyForm, ArticleForm },
  data() {
    return {
      showUserForm: false,
      showCompanyForm: false,
      showArticleForm: false,
      atAllMedia: true,
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
  },
  setup() {
    const route = useRoute();
    const articles = ref([]);
    const userType = ref({ type: "" });

    onBeforeMount(async () => {
      articles.value = await loadAllArticles();
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
        userType.value = await loadUser(route.params.userID);
        userType.value = userType.value[0].type;
      }
    );
    return { articles, userType };
  },
};
</script>

<style></style>
