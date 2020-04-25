import Vue from 'vue'

export function addRequestParameter (state, type) {
  let count = Object.keys(state.requestParams).length
  let paramCount = 0

  if (count > 0) {
    let params = Object.keys(state.requestParams).sort()
    paramCount = state.requestParams[params[params.length - 1]].index + 1
  } else {
    paramCount = count + 1
  }

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
