<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay user-form"
  >
    <div class="form-container">
      <form @submit.prevent="addNewUser">
        <div class="name-container row">
          <div class="firstname-container">
            <label for="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              v-model="newUser.firstname"
              required
            />
          </div>
          <div class="lastname-container">
            <label for="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              v-model="newUser.lastname"
              required
            />
          </div>
        </div>
        <div class="type-container">
          <label for="type">Type:</label>
          <input
            type="radio"
            id="writer"
            value="Writer"
            v-model="newUser.type"
            required
          />
          <label for="writer">Writer</label>
          <input
            type="radio"
            id="editor"
            value="Editor"
            v-model="newUser.type"
            required
          />
          <label for="editor">Editor</label>
        </div>
        <div class="status-container">
          <label for="status">Status:</label>
          <input
            type="radio"
            id="active"
            value="Active"
            v-model="newUser.status"
            required
          />
          <label for="active">Active</label>
          <input
            type="radio"
            id="inactive"
            value="Inactive"
            v-model="newUser.status"
            required
          />
          <label for="inactive">Inactive</label>
        </div>
        <p v-if="showValidationError">
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
import { addUser } from "../composables/callApi";
export default {
  data() {
    return {
      newUser: {
        id: uuidv4(),
        firstname: "",
        lastname: "",
        type: "",
        status: "",
      },
      showValidationError: false,
    };
  },
  methods: {
    async addNewUser() {
      if (this.newUser.type != "" && this.newUser.status != "") {
        await addUser(this.newUser);
        this.resetInput();
        window.location.reload();
      } else {
        this.showValidationError = true;
      }
    },
    resetInput() {
      this.newUser.id = uuidv4();
      this.newUser.firstname = "";
      this.newUser.lastname = "";
      this.newUser.type = "";
      this.newUser.status = "";
    },
  },
};
</script>

<style></style>
