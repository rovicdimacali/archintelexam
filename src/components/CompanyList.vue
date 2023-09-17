<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay company-list"
  >
    <div class="list-container">
      <h1>Company List</h1>
      <ul>
        <li class="list row" v-for="company in companies" :key="company.id">
          <div class="company-name">
            {{ company.name }}
          </div>
          <div class="update-link">
            <RouterLink
              :to="{
                name: 'ManageCompany',
                params: {
                  userID: currentUserID,
                  companyID: company.id,
                },
              }"
              >Update</RouterLink
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadAllCompanies } from "../composables/callApi";
import { RouterLink, useRoute } from "vue-router";
import { ref, watch, onBeforeMount } from "vue";
export default {
  data() {
    return {
      companies: [],
    };
  },
  async mounted() {
    this.companies = await loadAllCompanies();
  },
  setup() {
    const route = useRoute();
    const currentUserID = ref();

    onBeforeMount(() => {
      currentUserID.value = route.params.userID;
      console.log("currentUserID", currentUserID.value);
    });

    watch(
      () => route.params,
      async (newParams) => {
        currentUserID.value = newParams.userID;
      }
    );

    return { currentUserID };
  },
};
</script>

<style></style>
