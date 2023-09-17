<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay company-form"
  >
    <div class="form-container">
      <form @submit.prevent="addNewCompany">
        <div class="logo-name-container row">
          <div class="logo-container">
            <label for="logo">Logo URL</label>
            <input
              @input="validateLogoUrl"
              type="text"
              id="logo"
              v-model="newCompany.logo"
              required
            />
          </div>
          <div class="name-container">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="newCompany.name" required />
          </div>
        </div>
        <p class="form-error" v-if="!isValidLogoUrl">Invalid Link Url.</p>
        <div class="status-container row">
          <label for="type">Status:</label>
          <div>
            <input
              type="radio"
              id="active"
              value="Active"
              v-model="newCompany.status"
              required
            />
            <label for="active">Active</label>
            <input
              type="radio"
              id="inactive"
              value="Inactive"
              v-model="newCompany.status"
            />
            <label for="inactive">Inactive</label>
          </div>
        </div>

        <p class="form-error" v-if="showValidationError">
          Please Complete the form before submitting!
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
import { v4 as uuidv4 } from "uuid";
import { addCompany } from "../composables/callApi";
export default {
  data() {
    return {
      newCompany: {
        id: uuidv4(),
        logo: "",
        name: "",
        status: "",
      },
      showValidationError: false,
      isValidLogoUrl: true,
    };
  },
  methods: {
    async addNewCompany() {
      if (this.newCompany.status != "" && this.isValidLogoUrl) {
        await addCompany(this.newCompany);
        this.resetInput();
        this.$emit("close");
      } else {
        this.showValidationError = true;
      }
    },
    validateLogoUrl() {
      const pattern = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
      this.isValidLogoUrl = pattern.test(this.newCompany.logo);
    },
    resetInput() {
      this.newCompany.id = uuidv4();
      this.newCompany.logo = "";
      this.newCompany.name = "";
      this.newCompany.status = "";
    },
  },
};
</script>

<style></style>
