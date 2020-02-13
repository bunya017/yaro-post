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
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      requestType: null,
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
      ]
    }
  }
}
</script>
