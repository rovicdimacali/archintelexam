<template>
  <div class="manage-company">
    <div class="form-container">
      <form
        @submit.prevent="updateCurrentCompany"
        v-for="company in fetchedCompany"
        :key="company.id"
      >
        <div class="row">
          <label for="logo">Logo URL</label>
          <input type="text" id="logo" v-model="company.logo" required />
        </div>
        <div class="row">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="company.name" required />
        </div>
        <div class="row">
          <label for="type">Status</label>
          <div>
            <input
              type="radio"
              id="active"
              value="Active"
              v-model="company.status"
              required
            />
            <label for="writer">Active</label>
            <input
              type="radio"
              id="inactive"
              value="Inactive"
              v-model="company.status"
            />
            <label for="editor">Inactive</label>
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
import { loadCompany, updateCompany } from "../composables/callApi";
import { useRouter, useRoute } from "vue-router";
export default {
  props: ["userID", "companyID"],
  data() {
    return {
      fetchedCompany: [],
      companyToUpdate: {},
    };
  },
  methods: {
    async updateCurrentCompany() {
      this.companyToUpdate.logo = this.fetchedCompany[0].logo;
      this.companyToUpdate.name = this.fetchedCompany[0].name;
      this.companyToUpdate.status = this.fetchedCompany[0].status;
      await updateCompany(this.companyID, this.companyToUpdate);
      this.backToDashboard();
    },
  },
  async mounted() {
    this.fetchedCompany = await loadCompany(this.companyID);
    console.log("userID", this.userID);
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
