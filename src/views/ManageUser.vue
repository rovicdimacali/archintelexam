<template>
  <div class="manage-user">
    <div class="form-container">
      <form
        @submit.prevent="updateCurrentUser"
        v-for="user in fetchedUser"
        :key="user.id"
      >
        <div class="row">
          <label for="firstname">First Name</label>
          <input type="text" id="firstname" v-model="user.firstname" required />
        </div>
        <div class="row">
          <label for="lastname">Last Name</label>
          <input type="text" id="lastname" v-model="user.lastname" required />
        </div>
        <div class="row">
          <label for="type">Type</label>
          <div>
            <input
              type="radio"
              id="writer"
              value="Writer"
              v-model="user.type"
              required
            />
            <label for="writer">Writer</label>
            <input
              type="radio"
              id="editor"
              value="Editor"
              v-model="user.type"
              required
            />
            <label for="editor">Editor</label>
          </div>
        </div>
        <div class="row">
          <label for="status">Status</label>
          <div>
            <input
              type="radio"
              id="active"
              value="Active"
              v-model="user.status"
              required
            />
            <label for="active">Active</label>
            <input
              type="radio"
              id="inactive"
              value="Inactive"
              v-model="user.status"
              required
            />
            <label for="inactive">Inactive</label>
          </div>
        </div>

        <p v-if="showValidationError">
          Please Complete the form before submitting!
        </p>
        <div class="action-btn">
          <button @click="backToDashboard">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { loadUser, updateUser } from "../composables/callApi";
import { useRouter, useRoute } from "vue-router";
export default {
  props: ["userIdToUpdate"],
  data() {
    return {
      fetchedUser: [],
      userToUpdate: {},
    };
  },
  methods: {
    async updateCurrentUser() {
      this.userToUpdate.firstname = this.fetchedUser[0].firstname;
      this.userToUpdate.lastname = this.fetchedUser[0].lastname;
      this.userToUpdate.type = this.fetchedUser[0].type;
      this.userToUpdate.status = this.fetchedUser[0].status;
      await updateUser(this.userIdToUpdate, this.userToUpdate);
      this.backToDashboard();
    },
  },
  async mounted() {
    this.fetchedUser = await loadUser(this.userIdToUpdate);
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    function backToDashboard() {
      router.push({
        name: "Dashboard",
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
