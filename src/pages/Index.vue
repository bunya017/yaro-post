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
          <q-input dense outlined type="text" placeholder="parameter name" />
        </div>
        <div class="col-5">
          <q-input dense outlined :type="field.type" placeholder="value" />
        </div>
      </div>
      <div class="row q-pa-md">
        <div class="col-3 q-mx-auto">
          <!-- New parameter button-->
          <q-btn color="grey" label="Add new parameter">
            <q-menu fit>
              <q-list>
                <q-item clickable @click="addParameter({ index: 1, type: 'text' })" v-close-popup>
                  <q-item-section>Text</q-item-section>
                </q-item>
                <q-item clickable @click="addParameter({ index: 1, type: 'file' })" v-close-popup>
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
    addParameter (type) {
      this.parameters.push(type)
    }
  }
}
</script>
