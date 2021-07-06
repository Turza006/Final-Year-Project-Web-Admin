import gql from 'graphql-tag'

export const CREATE_SUPPLIER = gql`
  mutation createSupplier($payload: SupplierInput) {
    createSupplier(payload: $payload) {
      msg
      code
    }
  }
`

export const UPDATE_SUPPLIER = gql`
  mutation updateSupplier($payload: SupplierInput, $supplierId: ID) {
    updateSupplier(payload: $payload, supplierId: $supplierId) {
      msg
      code
    }
  }
`
