<template>
  <form
    @submit.prevent="updateCurrentArticle"
    v-for="article in fetchedArticle"
    :key="article.id"
  >
    <select name="companies" id="" v-model="article.company">
      <option
        v-for="company in companies"
        :key="company.id"
        :value="company.id"
      >
        {{ company.name }}
      </option>
    </select>
    <label for="title">Title</label>
    <input type="text" v-model="article.title" required />
    <label for="image">Image URL</label>
    <input type="text" v-model="article.image" required />
    <label for="link">Link</label>
    <input type="text" v-model="article.link" required />
    <label for="date">Date</label>
    <label for="type">Status</label>
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
    <input type="date" v-model="article.date" required />
    <label for="content">Content</label>
    <QuillEditor
      theme="snow"
      toolbar="full"
      contentType="html"
      v-model:content="article.content"
    />
    <button
      @click="
        () => {
          this.$emit('close');
        }
      "
    >
      Cancel
    </button>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import {
  loadArticle,
  loadAllCompanies,
  updateArticle,
} from "../composables/callApi";
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
      const updatedArticle = await updateArticle(
        this.articleID,
        this.articleToUdpate
      );
      console.log("updated article", updatedArticle);
    },
  },
  async mounted() {
    this.fetchedArticle = await loadArticle(this.articleID);
    this.companies = await loadAllCompanies();
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    function backToDashboard() {
      router.push({
        name: "AllMedia",
        params: {
          userID: route.params.userID,
        },
        replace: true,
      });
    }

    return { backToDashboard };
  },
};
</script>

<style></style>
