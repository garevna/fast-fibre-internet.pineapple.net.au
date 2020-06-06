/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  testimonials: null
}

const getters = {
  db: (state, getters, rootState) => `${rootState.host}/testimonials`,
  photos: (state, getters, rootState) => `${rootState.host}/avatars`
}

const mutations = {
  UPDATE_CONTENT (state, payload) {
    state.testimonials = Object.assign({}, payload)
  }
}

const actions = {
  async GET_CONTENT ({ getters, commit }) {
    commit('UPDATE_CONTENT', await (await fetch(getters.db)).json())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
