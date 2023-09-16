<template>
  {{ selectedUser }}
  <div class="div" style="display: flex; flex-direction: column">
    <div class="user-box" v-if="!isManageRoute">
      <div
        v-for="user in users"
        :key="user.id"
        @click="updateParamsAndNavigate(user.id)"
      >
        {{ user.firstname }}
        {{ user.lastname }}
      </div>
    </div>
    <RouterLink
      :to="{
        name: 'Dashboard',
        params: {
          userID: currentUserID,
        },
      }"
      >Dashboard</RouterLink
    >
    <RouterLink
      :to="{
        name: 'AllMedia',
        params: {
          userID: currentUserID,
        },
      }"
    >
      All Media
    </RouterLink>
  </div>
</template>

<script>
import { loadAllUsers, loadUser } from "../composables/callApi";
import { RouterLink, useRouter, useRoute } from "vue-router";

import { ref, reactive, watch, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const users = ref([]);
    const user = ref();
    const selectedUser = ref();
    const currentUserID = ref();

    onMounted(async () => {
      currentUserID.value = route.params.userID;
      users.value = await loadAllUsers();
      user.value = await loadUser(currentUserID.value);
      selectedUser.value = `${user.value[0].firstname} ${user.value[0].lastname}`;
    });

    watch(
      () => route.params.userID,
      (newUserID) => {
        currentUserID.value = newUserID;
      }
    );

    async function updateParamsAndNavigate(newParams) {
      router.push({
        name: router.currentRoute.value.name,
        params: {
          userID: newParams,
        },
        replace: true,
      });
      user.value = await loadUser(newParams);
      selectedUser.value = `${user.value[0].firstname} ${user.value[0].lastname}`;
    }

    return { users, updateParamsAndNavigate, currentUserID, selectedUser };
  },
  computed: {
    isManageRoute() {
      return (
        this.$route.name === "ManageCompany" ||
        this.$route.name === "ManageUser"
      );
    },
  },
};
</script>

<style></style>
