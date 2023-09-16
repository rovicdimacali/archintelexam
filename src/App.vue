<template>
  <div class="row">
    <Navigation />
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";

export default {
  components: { Navigation },
};
</script>

<style scoped></style>
