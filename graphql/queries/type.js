import gql from 'graphql-tag'

export const GET_ALL_TYPE = gql`
  query GetAllType($restaurant: ID, $searchParam: String, $limit: Int, $offset: Int) {
    GetAllType(restaurant: $restaurant, searchParam: $searchParam, limit: $limit, offset: $offset){
        MenuTypes{
          id
          status
          restaurant
          typeName,
          subTypes{
            id
            status,
            subTypeName
            typeId
          }
        }
        count
        msg
        code
    }
  }
`
