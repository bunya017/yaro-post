import Vue from 'vue'

export function addRequestParameter (state, type) {
  let paramCount = Object.keys(state.requestParams).length + 1
  // Add 1 to paramCount so key turns out to be parameter1, parameter2 ...
  Vue.set(state.requestParams, 'parameter' + paramCount, {
    name: '',
    value: '',
    type: type,
    index: paramCount
  })
}

export function setRequestParameter (state, payload) {
  let param = state.requestParams['parameter' + payload.index]
  switch (payload.field) {
    case 'name':
      param.name = payload.param
      break
    case 'value':
      param.value = payload.param
      break
  }
}

export function removeRequestParameter (state, index) {
  Vue.delete(state.requestParams, 'parameter' + index)
}

export function setRequestResponse (state, payload) {
  state.requestResponse = payload
}
