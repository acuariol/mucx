<template>
  <div>
    <div class="item-card" v-for="(item) in songs" :key="item.id">
      <p
        class="item-title"
      >{{item.name}}{{item.alias.length?` - ${item.alias.join()}`:''}} - {{item.artists.map(i=>i.name).join('，')}}</p>

      <button class="item-btn" @click="fetchUrl(item)">
        <img :src="downloadSvg" alt class="download-svg" />
      </button>
    </div>
  </div>
</template>

<script>
import request from "umi-request";
import { saveAs } from "file-saver";
import downloadSvg from "@/assets/download.svg";
//  <div v-show="!songsLength" class="text-h2 text-center pt-12">Mucx</div>
export default {
  name: "SearchContent",
  data() {
    return {
      show: false,
      msg: "",
      downloadSvg
    };
  },
  computed: {
    songs() {
      return this.$store.state.songs;
    }
    // songsLength() {
    //   return this.$store.state.songs.length;
    // }
  },
  methods: {
    fetchUrl(item) {
      if (!item || !item.id) return;
      request(`http://106.12.40.19:3000/song/url?id=${item.id}`)
        .then(res => {
          if (res) {
            const { code, data } = res;
            if (code === 200) {
              if (data && Array.isArray(data) && data[0]) {
                this.downloadSong(data[0].url, item);
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadSong(url, item) {
      if (!url) {
        this.alert("没有该歌曲资源QAQ");
        return;
      }
      this.alert("下载中，请稍后...");
      const artists = item && item.artists.map(i => i.name).join();
      const alias = item && item.alias && item.alias.join();
      saveAs(url, `${item.name}-${alias}-${artists}.mp3` || "songs.mp3");
    },
    alert(msg) {
      this.$store.commit("notic", { text: msg });
    }
  }
};
</script>

<style scoped>
.item-card {
  border-radius: 8px;
  background: #53f0f3;
  box-shadow: 8px 8px 16px #46cacc, -8px -8px 16px #60ffff;

  max-width: 600px;
  margin: 0 auto 28px;

  padding: 12px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-title {
  padding: 0 24px 0 0;
  margin: 0;
}
.item-btn {
  outline: none;
  border: none;
  border-radius: 50%;
  padding: 12px;
  box-shadow: 8px 8px 16px #46cacc, -8px -8px 16px #60ffff;
  background-color: transparent;
  transition: all 0.5s ease-in;
}
.item-btn:hover {
  box-shadow: inset 8px 8px 16px #46cacc, inset -8px -8px 16px #60ffff;
  cursor: pointer;
}

.download-svg {
  width: 24px;
  height: 24px;
}
</style>
