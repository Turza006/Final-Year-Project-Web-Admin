export default {
  data () {
    return {
      _socialSites: [
        'facebook',
        'twitter',
        'instagram',
        'whatsapp',
        'youtube',
        'telegram',
        'google+',
        'linkedin',
        'line']
    }
  },
  methods: {
    _getSocialSiteColor (siteName) {
      if (siteName === null) {
        return 'error'
      }
      siteName = siteName.toLowerCase()
      switch (siteName) {
        case 'facebook':
          return '#3b5998'
        case 'twitter':
          return '#55acee'
        case 'instagram':
          return '#3f729b'
        case 'whatsapp':
          return '#43d854'
        case 'youtube':
          return '#cd201f'
        case 'telegram':
          return '#00405d'
        case 'google+':
          return '#dc4e41'
        case 'linkedin':
          return '#0077b5'
        case 'line':
          return '#00c300'
        default:
          return 'primary'
      }
    }
  }
}
