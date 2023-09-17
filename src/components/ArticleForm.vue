<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay article-form"
  >
    <div class="form-container">
      <form @submit.prevent="addNewArticle">
        <div class="company-title row">
          <div class="company-container row">
            <label for="companies">Company</label>
            <select
              name="companies"
              id="companies"
              v-model="newArticle.company"
            >
              <option
                v-for="company in companies"
                :key="company.id"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
          </div>
          <div class="title-container row">
            <label for="title">Title</label>
            <input type="text" v-model="newArticle.title" required />
          </div>
        </div>
        <div class="image-link-container row">
          <div class="image-container row">
            <label for="image">Image URL</label>
            <input
              type="text"
              v-model="newArticle.image"
              @input="validateImageUrl"
              required
            />
          </div>
          <div class="link-container row">
            <label for="link">Link</label>
            <input
              type="text"
              v-model="newArticle.link"
              @input="validateLinkUrl"
              required
            />
          </div>
        </div>
        <p class="form-error" v-if="!isValidImageUrl">Invalid Image Url.</p>
        <p class="form-error" v-if="!isValidLinkUrl">Invalid Link Url.</p>
        <div class="date-container">
          <label for="date">Date</label>
          <input type="date" v-model="newArticle.date" required />
        </div>
        <div class="content-container">
          <label for="content">Content</label>
          <QuillEditor
            theme="snow"
            toolbar="minimal"
            contentType="html"
            v-model:content="newArticle.content"
          />
        </div>
        <p class="form-error" v-if="showValidationError">
          Please Complete the form without errors before submitting!
        </p>
        <div class="action-buttons row">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { loadAllCompanies, addArticle } from "../composables/callApi";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

export default {
  components: { QuillEditor },
  props: ["userID"],
  data() {
    const route = useRoute();
    return {
      companies: [],
      userID: null,
      newArticle: {
        id: uuidv4(),
        image: "",
        title: "",
        link: "",
        date: "",
        content: "",
        status: "For Edit",
        writer: route.params.userID,
        editor: "",
        company: "",
      },
      isValidImageUrl: true,
      isValidLinkUrl: true,
      showValidationError: false,
    };
  },
  methods: {
    async addNewArticle() {
      if (
        this.newArticle.content != "" &&
        this.newArticle.company != "" &&
        this.isValidImageUrl &&
        this.isValidLinkUrl
      ) {
        this.showValidationError = false;
        await addArticle(this.newArticle);
        window.location.reload();
      } else {
        this.showValidationError = true;
      }
    },
    validateImageUrl() {
      const pattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
      this.isValidImageUrl = pattern.test(this.newArticle.image);
    },
    validateLinkUrl() {
      const pattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
      this.isValidLinkUrl = pattern.test(this.newArticle.link);
    },
  },
  async mounted() {
    this.companies = await loadAllCompanies();
  },
};
</script>

<style></style>
