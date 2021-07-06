import gql from 'graphql-tag'

export const SHOW_ALL_OWNED_PACKAGE = gql`
    query{
        ShowAllOwnedPackage{
            OwnedPackages{
                _id
                package{
                    # id
                    serviceCategory{
                        Category
                    }
                    packageName
                    packagePrice
                }
                restaurant{
                    _id
                    uniqueName
                    name
                    logo
                }
                status
                startedFrom
                createdAt
                updatedAt
            }
            msg
            code
        }
    }`
