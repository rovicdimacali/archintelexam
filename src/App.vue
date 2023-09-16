<template>
  <Navigation />
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";

export default {
  components: { Navigation },
};
</script>

<style scoped></style>
