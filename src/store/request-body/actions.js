export function addRequestParameterAction ({ commit }, type) {
  commit('addRequestParameter', type)
}

export function setRequestParameterAction ({ commit }, payload) {
  commit('setRequestParameter', payload)
}

export function removeRequestParameterAction ({ commit }, index) {
  commit('removeRequestParameter', index)
}

export function setRequestResponseAction ({ commit }, payload) {
  commit('setRequestResponse', payload)
}
