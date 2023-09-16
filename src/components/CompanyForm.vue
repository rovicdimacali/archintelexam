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
      <form @submit.prevent="addNewCompany">
        <label for="logo">Logo URL</label>
        <input type="text" id="logo" v-model="newCompany.logo" required />
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newCompany.name" required />
        <label for="type">Status</label>
        <div>
          <input
            type="radio"
            id="active"
            value="Active"
            v-model="newCompany.status"
            required
          />
          <label for="writer">Active</label>
          <input
            type="radio"
            id="inactive"
            value="Inactive"
            v-model="newCompany.status"
          />
          <label for="editor">Inactive</label>
        </div>
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
    };
  },
  methods: {
    async addNewCompany() {
      if (this.newCompany.status != "") {
        await addCompany(this.newCompany);
        this.resetInput();
        this.$emit("close");
      } else {
        this.showValidationError = true;
      }
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
