import gql from 'graphql-tag'

export const GET_ALL_SUPPLIER = gql`
  query GetAllSuppliers($restaurantId: ID, $limit: Int, $offset: Int) {
    GetAllSupplier(
      restaurantId: $restaurantId
      limit: $limit,
      offset: $offset
    ) {
      count,
      code,
      msg,
      suppliers{
        id
        supplierName
        supplierPhoneNo
        supplierEmail,
        supplierShopName,
        address
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_SINGLE_SUPPLIER = gql`
  query GetSingleSupplier($supplierId: ID) {
    GetSingleSupplier(
      supplierId: $supplierId
    ) {
      code,
      msg,
      id
      supplierName
      supplierPhoneNo
      supplierEmail,
      supplierShopName,
      address
      createdAt
      updatedAt

    }
  }
`
