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
      <ul>
        <li v-for="company in companies" :key="company.id">
          {{ company.name }}
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { loadAllCompanies } from "../composables/callApi";
import { RouterLink, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
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

    onMounted(async () => {
      currentUserID.value = route.params.userID;
    });

    watch(
      () => route.params.userID,
      (newUserID) => {
        currentUserID.value = newUserID;
      }
    );

    return { currentUserID };
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
