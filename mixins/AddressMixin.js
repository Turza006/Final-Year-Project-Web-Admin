export default {
  methods: {
    _getAddressFromLocation (location) {
      if (location !== null && (location.city !== null && location.city !== undefined)) {
        let address = ''
        address += `${location.street !== null ? location.street + ', ' : ''}`
        address += `${location.city + '- '}`
        address += `${address.zip_code !== null ? location.zip_code + ', ' : ''}`
        address += `${location.country !== null ? location.country + '. ' : ''}`
        // address += `${location.province !== null ? '(' + location.province + ')' : ''}`
        // address += `${location.addressBrief !== null ? location.addressBrief : ''}`

        return address
      } else {
        return 'Address not added'
      }
    }
  }
}
