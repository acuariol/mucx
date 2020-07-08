import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { delay } from 'lodash'

export default new Vuex.Store({
  state: {
    songs: [],
    showNotice: false,
    notice: ''
  },
  mutations: {
    add(state, { songs }) {
      state.songs = songs
    },
    clearSongs(state) {
      state.songs = []
    },
    notic(state, { text }) {
      state.showNotice = true;
      state.notice = text;
      delay(() => {
        state.showNotice = false;
      }, 3000)

    }
  },
  actions: {
  },
  modules: {
  }
})
