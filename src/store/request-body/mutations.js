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

export function setRequestMethod (state, payload) {
  state.requestMethod = payload
}

export function setRequestURL (state, payload) {
  state.requestURL = payload
}

export function setRequestContentType (state, payload) {
  state.requestContentType = payload
}

export function addRequestHeader (state) {
  let count = Object.keys(state.requestHeaders).length
  let headerCount = 0

  if (count > 0) {
    let headers = Object.keys(state.requestHeaders).sort()
    headerCount = state.requestHeaders[headers[headers.length - 1]].index + 1
  } else {
    headerCount = count + 1
  }

  Vue.set(state.requestHeaders, 'header' + headerCount, {
    name: '',
    value: '',
    index: headerCount
  })
}

export function setRequestHeader (state, payload) {
  let header = state.requestHeaders['header' + payload.index]
  switch (payload.field) {
    case 'name':
      header.name = payload.name
      break
    case 'value':
      header.value = payload.value
      break
  }
}

export function removeRequestHeader (state, index) {
  Vue.delete(state.requestHeaders, 'header' + index)
}

export function setBasicAuth (state, payload) {
  switch (payload.field) {
    case 'username':
      state.basicAuth.username = payload.username
      break
    case 'password':
      state.basicAuth.password = payload.password
      break
  }
}
