<template>
  <div class="manage-article">
    <div class="form-container">
      <form
        @submit.prevent="updateCurrentArticle"
        v-for="article in fetchedArticle"
        :key="article.id"
      >
        <div class="row">
          <label for="companies">Company</label>
          <select name="companies" id="companies" v-model="article.company">
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.name }}
            </option>
          </select>
        </div>
        <div class="row">
          <label for="title">Title</label>
          <input type="text" v-model="article.title" required />
        </div>
        <div class="row">
          <label for="image">Image URL</label>
          <input type="text" v-model="article.image" required />
        </div>
        <div class="row">
          <label for="link">Link</label>
          <input type="text" v-model="article.link" required />
        </div>
        <div class="row">
          <label for="date">Date</label>
          <input type="date" v-model="article.date" required />
        </div>
        <div v-if="userType === 'Editor'" class="row">
          <label for="type">Status:</label>
          <div>
            <input
              type="radio"
              id="for-edit"
              value="For Edit"
              v-model="article.status"
              required
            />
            <label for="writer">For Edit</label>
            <input
              type="radio"
              id="published"
              value="Published"
              v-model="article.status"
            />
            <label for="editor">Published</label>
          </div>
        </div>
        <div class="col">
          <label for="content">Content</label>
          <QuillEditor
            theme="snow"
            toolbar="minimal"
            contentType="html"
            v-model:content="article.content"
          />
        </div>
        <div class="action-btn">
          <button @click="backToDashboard">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import {
  loadArticle,
  loadAllCompanies,
  loadUser,
  updateArticle,
} from "../composables/callApi";
import { ref, watch, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: { QuillEditor },
  props: ["userID", "articleID"],
  data() {
    return {
      fetchedArticle: [],
      companies: [],
      articleToUdpate: {},
    };
  },
  methods: {
    async updateCurrentArticle() {
      this.articleToUdpate.company = this.fetchedArticle[0].company;
      this.articleToUdpate.title = this.fetchedArticle[0].title;
      this.articleToUdpate.image = this.fetchedArticle[0].image;
      this.articleToUdpate.link = this.fetchedArticle[0].link;
      this.articleToUdpate.date = this.fetchedArticle[0].date;
      this.articleToUdpate.status = this.fetchedArticle[0].status;
      this.articleToUdpate.content = this.fetchedArticle[0].content;
      this.articleToUdpate.editor = this.userID;
      await updateArticle(this.articleID, this.articleToUdpate);
      this.backToDashboard();
    },
  },
  async mounted() {
    this.fetchedArticle = await loadArticle(this.articleID);
    this.companies = await loadAllCompanies();
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const userType = ref({ type: "" });

    onBeforeMount(async () => {
      userType.value = await loadUser(route.params.userID);
      userType.value = userType.value[0].type;

      console.log("users", users.value);
    });

    watch(
      () => route.params,
      async (newParams) => {
        userType.value = await loadUser(newParamsuserID);
        userType.value = userType.value[0].type;
      }
    );

    function backToDashboard() {
      router.push({
        name: "AllMedia",
        params: {
          userID: route.params.userID,
        },
        replace: true,
      });
    }

    return { backToDashboard, userType };
  },
};
</script>

<style></style>
