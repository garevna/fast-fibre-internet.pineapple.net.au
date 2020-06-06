/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content/1`
}

const mutations = {
  UPDATE_ALL: (state, payload) => {
    for (const field in payload) {
      state[field] = Object.assign({}, payload[field])
    }
  }
}

const actions = {
  async GET_CONTENT ({ getters, commit }) {
    const content = await (await fetch(getters.contentEndpoint)).json()
    commit('UPDATE_PAGES', { pages: content.mainNavButtons, selectors: content.mainNavSectors }, { root: true })
    commit('contact/UPDATE_EMAIL_SUBJECT', content.emailSubject, { root: true })
    commit('contact/UPDATE_EMAIL_TEXT', content.emailText, { root: true })
    const browserTabTitle = content.browserTabTitle
    for (const field of ['mainNavButtons', 'mainNavSectors', 'browserTabTitle', 'emailSubject', 'emailText']) {
      delete content[field]
    }
    // delete content.mainNavButtons
    // delete content.mainNavSectors
    // delete content.browserTabTitle
    // delete content.emailSubject
    // delete content.emailText
    commit('UPDATE_ALL', content)
    return browserTabTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
