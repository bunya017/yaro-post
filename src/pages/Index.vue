<template>
  <q-page padding>
    <!-- Request Section-->
    <q-card>
      <q-card-section class="q-py-sm">
        <div class="text-h6">Request</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-sm">
        <div class="row q-px-md q-pt-md q-pb-none">
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
      </q-card-section>
      <q-card-section class="q-py-sm">
        <q-expansion-item
          dense
          v-model="requestHeaderExpanded"
        >
          <template v-slot:header>
            <div class="text-h6 q-pl-none">Headers</div>
          </template>
          <div
            :key="field.index"
            v-for="field in requestHeaders"
            class="row q-pa-md q-gutter-md"
          >
            <div class="col-5">
              <q-input
                dense
                outlined
                type="text"
                :placeholder="`header ${field.index}`"
                @change="
                  $store.dispatch('request/setRequestHeaderAction', {
                    field: 'name',
                    index: field.index,
                    name: $event.target.value
                  })
                "
                :value="requestHeaders['header' + field.index].name"
              />
            </div>
            <div class="col-5">
              <q-input
                dense
                outlined
                type="text"
                placeholder="value"
                @change="
                  $store.dispatch('request/setRequestHeaderAction', {
                    field: 'value',
                    index: field.index,
                    value: $event.target.value
                  })
                "
                :value="requestHeaders['header' + field.index].value"
              />
            </div>
          </div>
          <div class="row q-pa-md">
            <div class="col-3 q-mx-auto">
              <!-- Add header button -->
              <q-btn
                color="white"
                text-color="primary"
                icon="add"
                label="Add header"
                @click="$store.dispatch('request/addRequestHeaderAction')"
              />
            </div>
          </div>
        </q-expansion-item>
      </q-card-section>
    </q-card>

    <!-- Request Body Section-->
    <q-card
      class="q-mt-md"
      v-if="(requestMethod.value !== 'get') && (requestMethod.value !== 'delete')"
    >
      <q-card-section class="q-py-sm">
        <div class="text-h6">Request Body</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-py-sm row">
        <div class="col-6 q-mx-auto">
          <q-select
            dense
            outlined
            label="Content Type"
            :options="contentTypeOptions"
            v-model="requestContentType"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-py-sm">
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
          <div class="col-5" v-if="field.type === 'text'">
            <q-input
              dense
              outlined
              type="text"
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
          <q-uploader
            multiple
            class="col-5"
            color="white"
            text-color="grey-8"
            :ref="'fileInput' + field.index"
            v-if="field.type === 'file'"
            @added="(files) => {
              $store.commit('request/setRequestParameter', {
                field: 'value',
                index: field.index,
                param: files
              })
            }"
            @removed="(files) => {
              if ($refs['fileInput' + field.index][0].files.length > 0) {
                $store.commit('request/setRequestParameter', {
                  field: 'value',
                  index: field.index,
                  param: $refs['fileInput' + field.index][0].files
                })
              } else {
                $store.commit('request/setRequestParameter', {
                  field: 'value',
                  index: field.index,
                  param: null
                })
              }
            }"
          >
            <template v-slot:header="scope">
              <div
                class="row no-wrap items-center q-pa-sm q-gutter-xs"
              >
                <q-btn
                  v-if="scope.queuedFiles.length > 0"
                  icon="clear_all" @click="scope.removeQueuedFiles"
                  round
                  dense
                  flat
                />
                <div class="col">
                  <div class="q-uploader__title">
                    Files
                  </div>
                  <div class="q-uploader__subtitle">
                    Click the + button or drag and drop file(s)
                  </div>
                </div>
                <q-btn v-if="scope.canAddFiles" icon="add_box" round dense flat>
                  <q-uploader-add-trigger />
                </q-btn>
              </div>
            </template>
            <template v-slot:list="scope">
              <div class="q-gutter-xs truncate-chip-labels">
                <q-chip
                  dense
                  removable
                  color="grey"
                  text-color="white"
                  :label="file.name"
                  @remove="scope.removeFile(file)"
                  v-for="file in scope.files" :key="file.name"
                />
              </div>
            </template>
          </q-uploader>
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
            <q-btn color="white" text-color="primary" icon="add" label="New parameter">
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
      </q-card-section>
    </q-card>

    <!-- Response Section-->
    <q-card class="q-mt-md" v-if="responseData">
      <q-card-section class="q-py-sm">
        <div class="text-h6">Response</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <span :class="['text-h3', statusIsOk ? 'text-positive' : 'text-negative' ]">
          {{ rawResponse.status }}
        </span> <span class="grey-8">{{ rawResponse.statusText }}</span>
      </q-card-section>
      <!-- Response Headers-->
      <q-card-section class="q-py-sm">
        <q-expansion-item
          dense
          v-model="headerExpanded"
        >
          <template v-slot:header>
            <div class="text-h6 q-pl-none">Headers</div>
          </template>
          <div class="bg-grey-2 rounded-borders q-pa-md">
            <p v-for="(val, key, index) in rawResponse.headers" :key="index">
              <b class="text-capitalize">{{ key }}</b>: {{ val }}
            </p>
          </div>
        </q-expansion-item>
      </q-card-section>
      <q-card-section class="q-py-sm" v-if="rawResponse.headers['content-type'] === 'text/html'">
        <q-expansion-item
          dense
          class="q-pb-lg"
          v-model="htmlExpanded"
        >
          <template v-slot:header>
            <div class="text-h6 q-pl-none">Preview</div>
          </template>
          <span class="scroll" v-html="rawResponse.data"></span>
        </q-expansion-item>
        <pre
          class="bg-grey-2 rounded-borders q-pa-sm scroll"
        ><code>{{ rawResponse.data }}</code></pre>
      </q-card-section>
      <q-card-section class="q-py-sm" v-else>
        <pre
          class="bg-grey-2 rounded-borders q-pa-sm scroll"
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
      contentTypeOptions: [
        {
          label: 'JSON',
          value: 'application/json'
        },
        {
          label: 'Multipart Form Data',
          value: 'multipart/form-data'
        },
        {
          label: 'URLEncoded Form Data',
          value: 'application/x-www-form-urlencoded'
        }
      ],
      parameters: [],
      headerExpanded: false,
      statusIsOk: null,
      htmlExpanded: false,
      requestHeaderExpanded: false
    }
  },
  methods: {
    addParameter (payload) {
      this.$store.dispatch('request/addRequestParameterAction', payload.type)
      if ((Object.keys(this.$refs).length === 0) && (payload.type === 'file')) {
        this.$store.dispatch(
          'request/setRequestContentTypeAction',
          {
            label: 'Multipart Form Data',
            value: 'multipart/form-data'
          }
        )
        this.contentTypeOptions = [{
          label: 'Multipart Form Data',
          value: 'multipart/form-data'
        }]
      }
    },
    removeParameter (index) {
      this.$store.dispatch('request/removeRequestParameterAction', index)
      if (this.$refs['fileInput' + index]) {
        this.$delete(this.$refs, 'fileInput' + index)
      }
      if (Object.keys(this.$refs).length === 0) {
        this.$store.dispatch(
          'request/setRequestContentTypeAction',
          {
            label: 'JSON',
            value: 'application/json'
          }
        )
        this.contentTypeOptions = [
          {
            label: 'JSON',
            value: 'application/json'
          },
          {
            label: 'Multipart Form Data',
            value: 'multipart/form-data'
          },
          {
            label: 'URLEncoded Form Data',
            value: 'application/x-www-form-urlencoded'
          }
        ]
      }
    },
    sendRequest () {
      let self = this
      let headers = {}
      let payload = null
      let params = self.$store.state.request.requestParams
      headers['content-type'] = self.requestContentType.value

      if (self.requestContentType.value === 'multipart/form-data') {
        payload = new FormData()
        for (const param in params) {
          if (params[param].type !== 'file') {
            payload.append(params[param].name, params[param].value)
          } else {
            let files = params[param].value
            for (var i = 0; i < files.length; i++) {
              payload.append(params[param].name, files[i])
            }
          }
        }
      } else {
        payload = self.requestPayload
      }
      self.$axios({
        url: self.requestURL,
        method: self.requestMethod.value,
        data: payload,
        headers: headers
      })
        .then(function (response) {
          self.statusIsOk = true
          self.$store.dispatch('request/setRequestResponseAction', response)
        })
        .catch(function (error) {
          self.statusIsOk = false
          self.$store.dispatch('request/setRequestResponseAction', error.response)
        })
    }
  },
  computed: {
    requestParams () {
      return this.$store.state.request.requestParams
    },
    requestHeaders () {
      return this.$store.state.request.requestHeaders
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
    },
    requestMethod: {
      get () {
        return this.$store.state.request.requestMethod
      },
      set (value) {
        this.$store.dispatch('request/setRequestMethodAction', value)
      }
    },
    requestURL: {
      get () {
        return this.$store.state.request.requestURL
      },
      set (value) {
        this.$store.dispatch('request/setRequestURLAction', value)
      }
    },
    requestContentType: {
      get () {
        return this.$store.state.request.requestContentType
      },
      set (value) {
        this.$store.dispatch('request/setRequestContentTypeAction', value)
      }
    }
  }
}
</script>
