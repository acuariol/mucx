<template>
  <input placeholder="请输入关键字" id="input" @input="inputChange" autocomplete="off" />
</template>

<script>
import request from "umi-request";
import { debounce, trim } from "lodash";

export default {
  name: "Input",
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    inputChange(e) {
      const { value } = e.target;
      if (value && trim(value)) {
        console.log(value)
        this.debounceFetch(value);
      }else{
        this.$store.commit('clearSongs')
      }
    },

    fetch(value) {
      request(`http://106.12.40.19:3000/search/suggest?keywords=${value}`)
        .then(res => {
          if (res) {
            const { code, result } = res;
            if (code === 200) {
              const { songs } = result;
              if (songs && Array.isArray(songs)) {
               
                this.$store.commit('add', { songs });
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.debounceFetch = debounce(this.fetch, 600);
  }
};
</script>

<style scoped>
#input {
  border-radius: 27px;
  background: #53f0f3;
  box-shadow: 8px 8px 16px #46cacc, -8px -8px 16px #60ffff;

  border: none;
  width: 500px;
  height: 54px;
  outline: none;

  padding: 0 27px;
  color: #000;
  font-weight: 500;
}
</style>
