<template>
  <div
    @click.self="
      () => {
        this.$emit('close');
      }
    "
    class="overlay user-list"
  >
    <div class="list-container">
      <h1>User List</h1>
      <ul>
        <li class="list row" v-for="user in users" :key="user.id">
          <div class="user-name">
            {{ user.firstname }}
            {{ user.lastname }}
          </div>
          <div class="update-link">
            <RouterLink
              :to="{
                name: 'ManageUser',
                params: {
                  userID: currentUserID,
                  userIdToUpdate: user.id,
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
import { loadAllUsers } from "../composables/callApi";
import { RouterLink, useRoute } from "vue-router";
import { ref, watch, onBeforeMount } from "vue";
export default {
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    this.users = await loadAllUsers();
  },
  setup() {
    const route = useRoute();
    const currentUserID = ref();

    onBeforeMount(() => {
      currentUserID.value = route.params.userID;
      console.log("currentUserID", currentUserID.value);
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
