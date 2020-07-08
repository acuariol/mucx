<template>
  <div class="head">
    <div class="icon-btn" @click="go">
      <img :src="iconSvg" alt class="light-svg" />
    </div>
    <div class="notic" :class="showNotice?'show-notice':''">
      <p>{{notice}}</p>
    </div>
  </div>
</template>

<script>
import lightSvg from "@/assets/light.svg";
import homeSvg from "@/assets/home.svg";
export default {
  name: "Header",
  data() {
    return {
      iconSvg: '',
      path: ""
    };
  },
  computed: {
    showNotice() {
      return this.$store.state.showNotice;
    },
    notice() {
      return this.$store.state.notice;
    }
  },
  watch: {
    $route(to, from) {
      this.path = from.path;
      this.initIcon(to.path);
    }
  },
  methods: {
    go() {
      if (this.path) this.$router.replace(this.path);
    },
    initIcon(path) {
      if (path === "/about") this.iconSvg = homeSvg;
      if (path === "/") this.iconSvg = lightSvg;
    }
  },
  mounted() {
    const { path } = this.$route;
    this.path = path === "/" ? "/about" : "/";
    this.initIcon(path);
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: flex-end;

  align-items: center;
}

.icon-btn {
  display: flex;
  justify-content: center;

  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  box-shadow: 6px 6px 12px #46cacc, -6px -6px 12px #60ffff;
}

.icon-btn:hover {
  cursor: pointer;
}

.light-svg {
  width: 24px;
  height: 24px;
}

.notic {
  position: fixed;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  background-color: transparent;
  border-radius: 24px;
  box-shadow: 6px 6px 12px #46cacc, -6px -6px 12px #60ffff;
  color: rgb(31, 31, 31);
  transition: top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.show-notice {
  top: 20px;
}
</style>
