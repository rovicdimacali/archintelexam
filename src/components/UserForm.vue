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
      <form @submit.prevent="addNewUser">
        <label for="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          v-model="newUser.firstname"
          required
        />
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="newUser.lastname" required />
        <div>
          <label for="type">Type</label>
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
        <div>
          <label for="status">Status</label>
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
