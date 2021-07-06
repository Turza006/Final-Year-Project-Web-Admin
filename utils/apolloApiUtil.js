export const getMutationData = async function ($apollo, query, args) {
  return await $apollo.mutate({
    mutation: query,
    variables: args
  })
}

export const getData = async function ($apollo, query, args) {
  return await $apollo.query({
    query,
    variables: args,
    fetchPolicy: 'network-only'
  })
}

export const getDataWithCustomHeader = async function ($apollo, query, args, header) {
  return await $apollo.query({
    query,
    variables: args,
    context: {
      headers: {
        Authorization: `Bearer ${header.jwt}`
      }
    },
    fetchPolicy: 'network-only'
  })
}

export const getMutationDataWithCustomHeader = async function (
  $apollo,
  query,
  args,
  header
) {
  return await $apollo.mutate({
    mutation: query,
    variables: args,
    context: {
      headers: {
        Authorization: `Bearer ${header.jwt}`
      }
    }
  })
}
