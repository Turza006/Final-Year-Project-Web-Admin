<template>
  <SupplierFormComponent :is-edit="true" />
</template>

<script>
import SupplierFormComponent from '~/components/supplier/SupplierFormComponent'
export default {
  name: 'PageEditSupplier',
  components: {
    SupplierFormComponent
  }
}
</script>
