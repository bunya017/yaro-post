<template>
  <q-page padding>
    <div class="bg-grey-3 rounded-borders">
      <!-- Request Section-->
      <div class="text-h6 q-px-md q-pt-md">Request</div>
      <div class="row q-pa-md">
        <div class="col-3">
          <q-select
            dense
            outlined
            label="Method"
            :options="options"
            v-model="requestMethod"
          />
        </div>
        <div class="col-8 q-px-md">
          <q-input dense outlined v-model="requestURL" label="URL" />
        </div>
        <div class="col-1">
          <q-btn color="primary" label="Send" @click="sendRequest" />
        </div>
      </div>
    </div>
    <div class="bg-grey-3 q-mt-md rounded-borders">
      <!-- Request Body Section-->
      <div class="text-h6 q-px-md q-pt-md">Request Body</div>
      <div
        :key="field.index"
        v-for="field in requestParams"
        class="row q-pa-md q-gutter-md"
      >
        <div class="col-5">
          <q-input
            dense
            outlined
            type="text"
            placeholder="parameter name"
            @change="
              $store.commit('request/setRequestParameter', {
                field: 'name',
                index: field.index,
                param: $event.target.value
              })
            "
            :value="requestParams['parameter' + field.index].name"
          />
        </div>
        <div class="col-5">
          <q-input
            dense
            outlined
            :type="field.type"
            placeholder="value"
            @change="
              $store.commit('request/setRequestParameter', {
                field: 'value',
                index: field.index,
                param: $event.target.value
              })
            "
            :value="requestParams['parameter' + field.index].value"
          />
        </div>
        <div class="col-1">
          <!-- Remove parameter button -->
          <q-btn
            dense
            color="grey"
            icon="delete"
            @click="removeParameter(field.index)"
          />
        </div>
      </div>
      <div class="row q-pa-md">
        <div class="col-3 q-mx-auto">
          <!-- New parameter button -->
          <q-btn color="grey" icon="add" label="New parameter">
            <q-menu fit>
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="addParameter({ index: parameters.length + 1, type: 'text' })"
                >
                  <q-item-section>Text</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="addParameter({ index: parameters.length + 1, type: 'file' })"
                >
                  <q-item-section>File</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      requestMethod: {
        label: 'GET',
        value: 'get'
      },
      requestURL: 'https://',
      options: [
        {
          label: 'GET',
          value: 'get'
        },
        {
          label: 'POST',
          value: 'post'
        },
        {
          label: 'PUT',
          value: 'put'
        },
        {
          label: 'DELETE',
          value: 'delete'
        },
        {
          label: 'PATCH',
          value: 'patch'
        }
      ],
      parameters: [],
      requestResponse: {}
    }
  },
  methods: {
    addParameter (payload, type) {
      this.parameters.push(payload)
      this.$store.dispatch('request/addRequestParameterAction', payload.type)
    },
    removeParameter (index) {
      this.$store.dispatch('request/removeRequestParameterAction', index)
    },
    sendRequest () {
      let self = this
      self.$axios({
        method: self.requestMethod.value,
        url: self.requestURL,
        data: self.requestPayload ? self.requestPayload : {}
      })
        .then(function (response) {
          self.requestResponse['rawResponse'] = response
          self.requestResponse['responseData'] = JSON.stringify(response.data, null, 2)
        })
        .catch(function (error) {
          self.requestResponse['rawResponse'] = error.response
          self.requestResponse['responseData'] = JSON.stringify(error.response.data, null, 2)
        })
    }
  },
  computed: {
    requestParams () {
      return this.$store.state.request.requestParams
    },
    requestPayload () {
      let payload = {}
      let params = this.$store.state.request.requestParams
      for (let param in params) {
        payload[params[param].name] = params[param].value
      }
      return payload
    }
  }
}
</script>
