import { RESERVATION_STATUS } from '~/utils/apiStatusCode'

export default {
  methods: {
    _getColorByReservationStatus (status) {
      if (status === null) {
        return 'error'
      }
      status = status.toUpperCase()
      switch (status) {
        case RESERVATION_STATUS.PENDING:
          return 'warning'
        case RESERVATION_STATUS.ACCEPTED:
          return 'success'
        case RESERVATION_STATUS.CANCELED:
          return 'error'
        case RESERVATION_STATUS.FINISH:
          return 'disabled'
        case RESERVATION_STATUS.DECLINED:
          return 'error lighten-2'
        default:
          return 'primary'
      }
    }
  }
}
