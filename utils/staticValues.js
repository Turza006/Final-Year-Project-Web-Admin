export const USER_TYPE = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF'
}

export const CUSTOMER_TYPE = [
  'Dine in customer',
  'Online customer'
]

export const ORDER_TYPES = [
  {
    title: 'Dine In Customer',
    image: '/img/dining-order.jpg',
    to: '/sales/order/floor',
    orderType: 'dining'
  },
  {
    title: 'Delivery',
    image: '/img/delivery.jpg',
    to: '/sales/order/create?order_type=delivery',
    orderType: 'delivery'
  },
  {
    title: 'Pick Up',
    image: '/img/pickup.jpg',
    to: '/sales/order/create?order_type=pick_up',
    orderType: 'pick_up'
  },
  {
    title: 'Online',
    image: '/img/online.jpg',
    to: '/sales/order/create?order_type=online',
    orderType: 'online'
  }
]
