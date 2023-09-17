<template>
  <div class="row">
    <nav :class="{ toggled: isToggled }">
      <div class="title-box">
        <p v-if="userType === 'Writer'">Writer Chassis</p>
        <p v-if="userType === 'Editor'">Editor Chassis</p>
      </div>
      <div class="current-user row" @click="toggleUserList">
        <div class="user row">
          <img
            src="https://i.pinimg.com/280x280_RS/c6/7a/c1/c67ac1a235895869ee92e9cc5d77430c.jpg"
          />
          <p>{{ selectedUser }}</p>
        </div>
        <div v-if="!isManageRoute" class="chevron-down">
          <fa icon="chevron-down" class="chevron-down" />
        </div>
      </div>
      <div
        class="user-box col"
        v-if="!isManageRoute"
        :class="{ isActive: isActive }"
      >
        <div
          class="user-list"
          v-for="user in users"
          :key="user.id"
          @click="updateParamsAndNavigate(user.id)"
        >
          {{ user.firstname }}
          {{ user.lastname }}
          ({{ user.type }})
        </div>
      </div>
      <div class="links-box col">
        <RouterLink
          :to="{
            name: 'Dashboard',
            params: {
              userID: currentUserID,
            },
          }"
          active-class="active"
          >Dashboard</RouterLink
        >
        <RouterLink
          :to="{
            name: 'AllMedia',
            params: {
              userID: currentUserID,
            },
          }"
          active-class="active"
        >
          All Media
        </RouterLink>
      </div>
      <div class="bottom-info"></div>
    </nav>
    <header class="row" :class="{ toggled: isToggled }">
      <div class="bars" @click="toggleClass">
        <fa icon="bars" />
      </div>
      <div class="title">ArchIntel</div>
    </header>
  </div>
</template>

<script>
import { loadAllUsers, loadUser } from "../composables/callApi";
import { RouterLink, useRouter, useRoute } from "vue-router";

import { ref, reactive, watch, onMounted } from "vue";

export default {
  data() {
    return {
      isToggled: false,
      isActive: false,
    };
  },
  methods: {
    toggleClass() {
      this.isToggled = !this.isToggled;
    },
    toggleUserList() {
      this.isActive = !this.isActive;
    },
    handleClickOutside(event) {
      const navbarElement = this.$el; // Get the root element of the Navbar component
      if (!navbarElement.contains(event.target)) {
        this.isToggled = false;
      }
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const users = ref([]);
    const user = ref();
    const userType = ref({ type: "" });
    const selectedUser = ref();
    const currentUserID = ref();

    onMounted(async () => {
      currentUserID.value = route.params.userID;
      users.value = await loadAllUsers();
      user.value = await loadUser(currentUserID.value);
      userType.value = user.value[0].type;
      selectedUser.value = `${user.value[0].firstname} ${user.value[0].lastname}`;
    });

    watch(
      () => route.params.userID,
      async (newUserID) => {
        currentUserID.value = newUserID;
        user.value = await loadUser(currentUserID.value);
        userType.value = user.value[0].type;
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

    return {
      users,
      updateParamsAndNavigate,
      currentUserID,
      selectedUser,
      userType,
    };
  },
  computed: {
    isManageRoute() {
      return (
        this.$route.name === "ManageCompany" ||
        this.$route.name === "ManageUser" ||
        this.$route.name === "ManageArticle"
      );
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style></style>
