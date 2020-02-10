<template>
  <q-page padding>
    <div class="row q-pa-md">
      <div class="col-3" style="min-width: 250px">
        <q-select
          outlined v-model="requestType"
          :options="options"
          label="Request Type"
        />
      </div>
      <div class="col-7 q-px-md">
        <q-input outlined v-model="requestURL" label="Request URL" />
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
