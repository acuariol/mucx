<template>
  <div class="container">
    <Head />
    <router-view />
  </div>
</template>

<script>
import Head from "@/components/Header.vue";
export default {
  name: "App",
  components: { Head }
};
</script>


<style scoped>
.container {
  min-height: 100vh;
  width: 100%;
  height: auto;
  background-color: #53f0f3;
  padding: 12px;
  box-sizing: border-box;
}
</style>