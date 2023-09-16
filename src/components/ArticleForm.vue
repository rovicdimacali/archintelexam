<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay"
  >
    <div class="form-container">
      <form @submit.prevent="addNewArticle">
        <select name="companies" id="" v-model="newArticle.company">
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
        <label for="title">Title</label>
        <input type="text" v-model="newArticle.title" required />
        <label for="image">Image URL</label>
        <input type="text" v-model="newArticle.image" required />
        <label for="link">Link</label>
        <input type="text" v-model="newArticle.link" required />
        <label for="date">Date</label>
        <input type="date" v-model="newArticle.date" required />
        <label for="content">Content</label>
        <QuillEditor
          theme="snow"
          toolbar="full"
          contentType="html"
          v-model:content="newArticle.content"
        />
        <p v-if="showValidationError">
          Please Complete the form before submitting!
        </p>
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
      showValidationError: false,
    };
  },
  methods: {
    async addNewArticle() {
      if (this.newArticle.content != "" && this.newArticle.company != "") {
        console.log("Data", this.newArticle);
        this.showValidationError = false;
        await addArticle(this.newArticle);
        window.location.reload();
      } else {
        this.showValidationError = true;
      }
    },
  },
  async mounted() {
    this.companies = await loadAllCompanies();
    console.log(this.companies);
  },
};
</script>

<style scoped>
.overlay {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 11;
}
.form-container {
  width: 800px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  transition: 0.3s all;
}
</style>
