<template>
  <form
    @submit.prevent="updateCurrentCompany"
    v-for="company in fetchedCompany"
    :key="company.id"
  >
    <label for="logo">Logo URL</label>
    <input type="text" id="logo" v-model="company.logo" required />
    <label for="name">Name</label>
    <input type="text" id="name" v-model="company.name" required />
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
</template>

<script>
import { loadCompany, updateCompany } from "../composables/callApi";
import { useRouter, useRoute } from "vue-router";
export default {
  props: ["companyID"],
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
