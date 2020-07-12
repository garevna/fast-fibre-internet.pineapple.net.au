/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  emailSubject: '',
  emailText: ''
}

const getters = {
  pages: (state, getters, rootState) => rootState.pages.filter(item => item !== 'Contact Us'),
  selectors: (state, getters, rootState) => rootState.selectors.filter(item => item !== '#contact')
}

const mutations = {
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  UPDATE_FIELD: (state, payload) => {
    state.contactFormFields[payload.num][payload.prop] = payload.value
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
