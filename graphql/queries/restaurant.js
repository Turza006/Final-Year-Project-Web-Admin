import gql from 'graphql-tag'

export const SHOW_SINGLE_RESTAURANT = gql`
  query ShowSingleRestaurant($uniqueName: String) {
    ShowSingleRestaurant(uniqueName: $uniqueName) {
      _id
      uniqueName
      name
      primaryColor
      secondaryColor
      logo
      totalFloorData{
        floorNo
        image
      }
      businessType
      restaurantType
      thumbnail
      fonts
      slider {
        sliderNo
        image
        text
      }
      address {
        street
        city
        area
        zip_code
        country
      }
      location {
        type
        coordinates {
          lat
          lan
        }
      }
      slogan
      socialLink {
        socialSite
        link
      }
      phoneNo
      email
      description {
        headers
        image
        body
      }
      aboutUs
      opening {
        day
        time
      }
      closing {
        day
        time
      }
      createdAt
      updatedAt
      orderFromOutside
      ordersWith {
        orderSystem {
          id
          name
          logo
          status
          textColour
          FillColour
          customColour
        }
        link
      }
      legalNotice
      msg
      code
    }
  }
`

export const SHOW_SINGLE_RESTAURANT_FOR_SETTINGS = gql`
  query ShowSingleRestaurant($uniqueName: String) {
    ShowSingleRestaurant(uniqueName: $uniqueName) {
      _id
      uniqueName
      name
      primaryColor
      secondaryColor
      logo
      businessType
      restaurantType
      thumbnail
      totalFloorData{
        floorNo
        image
      }
      fonts
      address {
        street
        city
        area
        zip_code
        country
      }
      location {
        type
        coordinates {
          lat
          lan
        }
      }
      slogan
      socialLink {
        socialSite
        link
      }
      phoneNo
      email
      description {
        headers
        image
        body
      }
      aboutUs
      opening {
        day
        time
      }
      closing {
        day
        time
      }
      orderFromOutside
      ordersWith {
        orderSystem {
          id
          name
          logo
          status
          textColour
          FillColour
          customColour
        }
        link
      }
      legalNotice
      msg
      code
    }
  }
`
