/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content/1`
}

const mutations = {
  UPDATE_ALL: (state, payload) => {
    for (const field of ['browserTabTitle', 'emailSubject', 'emailText']) {
      state[field] = payload[field] || state[field]
      delete payload[field]
    }
    for (const field in payload) {
      state[field] = Object.assign({}, payload[field])
    }
  }
}

const actions = {
  async GET_CONTENT ({ getters, commit }) {
    const content = await (await fetch(getters.contentEndpoint)).json()
    commit('UPDATE_ALL', content)
    return state.browserTabTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
