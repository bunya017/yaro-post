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
            label="Type"
            :options="options"
            v-model="requestType"
          />
        </div>
        <div class="col-8 q-px-md">
          <q-input dense outlined v-model="requestURL" label="URL" />
        </div>
        <div class="col-1">
          <q-btn color="primary" label="Send" />
        </div>
      </div>
    </div>
    <div class="bg-grey-3 q-mt-md rounded-borders">
      <!-- Request Body Section-->
      <div class="text-h6 q-px-md q-pt-md">Request Body</div>
      <div class="row q-pa-md q-gutter-md" v-for="field in parameters" :key="field.index">
        <div class="col-5">
          <q-input
            dense
            outlined
            type="text"
            @change="
              $store.commit('request/setRequestParameter', {
                index: field.index,
                field: 'name',
                param: $event.target.value
              })
            "
            placeholder="parameter name"
          />
        </div>
        <div class="col-5">
          <q-input dense outlined :type="field.type" placeholder="value" />
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
          <q-btn color="grey" icon="add" label="Add new parameter">
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
      requestType: {
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
      parameters: []
    }
  },
  methods: {
    addParameter (payload) {
      this.parameters.push(payload)
      this.$store.dispatch('request/addRequestParameterAction')
    },
    removeParameter (index) {
      this.parameters = this.parameters.filter(parameter => parameter.index !== index)
    }
  },
  computed: {
    requestParams: {
      get () {
        return this.$store.state.request.requestParams
      }
    }
  }
}
</script>
