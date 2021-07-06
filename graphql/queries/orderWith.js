import gql from 'graphql-tag'

export const GET_ALL_ORDER_WITH = gql`
  query GetALlOrderWithByStatus($status: String, $limit: Int, $offset: Int) {
    GetALlOrderWithByStatus(status: $status, limit: $limit, offset: $offset) {
      OrderWiths {
        id
        name
        logo
        status
        textColour
        FillColour
        customColour
      }
      count
      msg
      code
    }
  }
`
