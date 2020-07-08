<template>
  <div class="home-box">
    <div class="home-col">
      <div class="input-box">
        <TextInput />
      </div>

      <SearchContent />
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/Input.vue";
import SearchContent from "@/components/SearchContent.vue";

export default {
  name: "Home",
  components: { TextInput, SearchContent }
};
</script>

<style scoped>
.home-box {
  height: inherit;
  width: 100%;
}

.home-col {
  max-width: 996px;
  margin: auto;
}

.input-box {
  padding: 5vh 0 10vh;
  display: flex;
  justify-content: center;
}
</style>
