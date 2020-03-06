export function addRequestParameterAction ({ commit }) {
  commit('addRequestParameter')
}

export function setRequestParameterAction ({ commit }, payload) {
  commit('setRequestParameter', payload)
}
