<script>
  // import AppHeader from "@/components/AppHeader.vue";

  export default {
    components: {
      // AppHeader,
    },
  };
</script>

<template>
  <div id="app">
    <!-- <AppHeader /> -->
    <div class="container-fluid mt-1">
      <router-view />
    </div>
  </div>
</template>

<style>
  .page {
    margin: auto;
  }
</style>