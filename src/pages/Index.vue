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
    <div
      class="bg-grey-3 q-mt-md rounded-borders"
      v-if="(requestMethod.value !== 'get') && (requestMethod.value !== 'delete')"
    >
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
    <!-- Response Section-->
    <q-card class="q-mt-md" v-if="responseData">
      <q-card-section>
        <div class="text-h6">Response</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <span class="text-h3 text-positive">
          {{ rawResponse.status }}
        </span> <span class="grey-8">{{ rawResponse.statusText }}</span>
      </q-card-section>
      <!-- Response Headers-->
      <q-card-section>
        <q-expansion-item
          v-model="headerExpanded"
        >
          <template v-slot:header>
            <div class="text-h6">Headers</div>
          </template>
          <div class="bg-grey-2 rounded-borders q-pa-md">
            <p v-for="(val, key, index) in rawResponse.headers" :key="index">
              <b>{{ key }}</b>: {{ val }}
            </p>
          </div>
        </q-expansion-item>
      </q-card-section>
      <q-card-section style="overflow-x: scroll;">
        <pre
          class="bg-grey-2 rounded-borders q-pa-sm shadow-1"
        ><code>{{ responseData }}</code></pre>
      </q-card-section>
    </q-card>
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
      headerExpanded: false
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
          self.$store.dispatch('request/setRequestResponseAction', response)
        })
        .catch(function (error) {
          self.$store.dispatch('request/setRequestResponseAction', error.response)
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
    },
    rawResponse () {
      return this.$store.state.request.requestResponse
    },
    responseData () {
      return JSON.stringify(this.rawResponse.data, null, 2)
    }
  }
}
</script>
