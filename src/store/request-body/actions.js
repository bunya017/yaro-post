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

export function setRequestMethodAction ({ commit }, payload) {
  commit('setRequestMethod', payload)
}

export function setRequestURLAction ({ commit }, payload) {
  commit('setRequestURL', payload)
}

export function setRequestContentTypeAction ({ commit }, payload) {
  commit('setRequestContentType', payload)
}
