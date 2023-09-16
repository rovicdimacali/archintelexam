<template>
  <form
    @submit.prevent="updateCurrentUser"
    v-for="user in fetchedUser"
    :key="user.id"
  >
    <label for="firstname">First Name</label>
    <input type="text" id="firstname" v-model="user.firstname" required />
    <label for="lastname">Last Name</label>
    <input type="text" id="lastname" v-model="user.lastname" required />
    <div>
      <label for="type">Type</label>
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
    <div>
      <label for="status">Status</label>
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
    <p v-if="showValidationError">
      Please Complete the form before submitting!
    </p>
    <button type="submit">Submit</button>
  </form>
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
