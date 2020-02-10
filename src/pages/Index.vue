<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 250px">
      <q-select outlined v-model="requestType" :options="options" label="Request Type" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      requestType: null,
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
