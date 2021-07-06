import gql from 'graphql-tag'

export const ADD_GALLERY_IMAGE = gql`
  mutation AddGalleryImage($payload: GalleryInput) {
    AddGalleryImage(payload: $payload) {
      msg
      code
    }
  }
`

export const EDIT_GALLERY_IMAGE = gql`
  mutation EditGalleryImage($payload: GalleryInput, $GalleryId: ID) {
    EditGalleryImage(payload: $payload, GalleryId: $GalleryId) {
      msg
      code
    }
  }
`
