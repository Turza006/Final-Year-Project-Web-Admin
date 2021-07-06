<template>
  <SupplierFormComponent :is-edit="false" />
</template>

<script>
import SupplierFormComponent from '~/components/supplier/SupplierFormComponent'
export default {
  name: 'PageAddSupplier',
  components: {
    SupplierFormComponent
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL
    }
  }
}
</script>
