import Vue from 'vue'

export function addRequestParameter (state) {
  let paramCount = Object.keys(state.requestParams).length + 1
  // Add 1 to paramCount so key turns out to be parameter1, parameter2 ...
  Vue.set(state.requestParams, 'parameter' + paramCount, {
    name: '',
    value: '',
    index: paramCount
  })
}
