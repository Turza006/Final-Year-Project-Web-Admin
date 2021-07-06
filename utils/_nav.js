export const NAVIGATION_ITEMS = [
  // {
  //   title: 'Dashboard',
  //   icon: 'mdi-view-dashboard',
  //   to: '/'
  // },
  // {
  //   title: 'Kitchen Dashboard',
  //   to: '/kitchen-dashboard',
  //   icon: 'mdi-campfire'
  // },
  {
    title: 'Menu',
    icon: 'mdi-view-list',
    to: '',
    child: [
      {
        title: 'Category',
        icon: 'mdi-notebook-check',
        to: '/menu/category'
      },
      {
        title: 'Manage Type Subtype',
        icon: 'mdi-notebook-check',
        to: '/menu/manage-type'
      },
      {
        title: 'Manage Food',
        icon: 'mdi-notebook-check',
        to: '/menu/food'
      },
      {
        title: 'Manage Platter',
        icon: 'mdi-notebook-check',
        to: '/menu/platter'
      },
      {
        title: 'Manage Special Menu',
        icon: 'mdi-notebook-check',
        to: '/menu/special-menu'
      }
    ]
  },
  // { title: 'Subcategory', icon: 'mdi-view-list-outline', to: '/subcategory' },
  // {
  //   title: 'Order',
  //   icon: 'mdi-book-open',
  //   to: '/sales',
  //   child: [
  //     {
  //       title: 'Create Order',
  //       icon: 'mdi-printer ',
  //       to: '/sales/order/choose-order-type'
  //     },
  //     // {
  //     //   title: 'Due Orders',
  //     //   icon: 'mdi-printer ',
  //     //   to: '/sales/order/due'
  //     // },
  //     {
  //       title: 'Manage Orders',
  //       icon: 'mdi-wrench ',
  //       to: '/sales/order/manage-order'
  //     }
  //   ]
  // },
  {
    title: 'Table Settings',
    to: '/',
    icon: 'mdi-table-furniture',
    child: [
      {
        title: 'Add Table',
        icon: 'mdi-table-large-plus',
        to: '/sales/order/table/create'
      },
      {
        title: 'Manage Table',
        icon: 'mdi-table-cog',
        to: '/sales/order/table/manage'
      }
    ]
  },
  {
    title: 'Reservation',
    to: '/reservation',
    icon: 'mdi-calendar-check',
    child: [
      {
        title: 'Manage Reservation',
        to: '/reservation',
        icon: 'mdi-calendar-multiselect'
      },
      {
        title: 'Add Reservation',
        to: '/reservation/add',
        icon: 'mdi-calendar-plus'
      }
    ]
  },
  // {
  //   title: 'Production Management',
  //   to: '/production',
  //   icon: 'mdi-book-plus-multiple',
  //   child: [
  //     {
  //       title: 'Food Productions',
  //       to: '/production/single-food',
  //       icon: 'mdi-book-check'
  //     },
  //     {
  //       title: 'Platter Productions',
  //       to: '/production/platter-food',
  //       icon: 'mdi-book-check'
  //     }
  //   ]
  // },
  // {
  //   title: 'Inventory',
  //   to: '/inventory',
  //   icon: 'mdi-slot-machine',
  //   child: [
  //     {
  //       title: 'Stock',
  //       to: '/inventory/stock/all',
  //       icon: 'mdi-slot-machine'
  //     },
  //     {
  //       title: 'Pending Stock',
  //       to: '/inventory/stock/pending',
  //       icon: 'mdi-beaker-question'
  //     },
  //
  //     {
  //       title: 'Shortlist',
  //       to: '/inventory/stock/shortlist',
  //       icon: 'mdi-list-status'
  //     },
  //     {
  //       title: 'Soon Expiring',
  //       to: '/inventory/stock/soon_expiring',
  //       icon: 'mdi-book-information-variant'
  //     },
  //     {
  //       title: 'Expired',
  //       to: '/inventory/stock/expired',
  //       icon: 'mdi-playlist-remove'
  //     }
  //
  //   ]
  // },
  // {
  //   title: 'Purchase',
  //   to: '/purchase',
  //   icon: 'mdi-cart',
  //   child: [
  //     {
  //       title: 'All Purchase',
  //       to: '/purchase/all',
  //       icon: 'mdi-chart-bubble'
  //     },
  //     {
  //       title: 'Add Purchase',
  //       to: '/purchase/add',
  //       icon: 'mdi-cart-plus  '
  //     }
  //   ]
  // },
  // {
  //   title: 'Report',
  //   to: '/report',
  //   icon: 'mdi-chart-areaspline-variant',
  //   child: [
  //     {
  //       title: 'All Report',
  //       to: '/report/all',
  //       icon: 'mdi-chart-timeline-variant'
  //     },
  //     {
  //       title: 'Today',
  //       to: '/report/today',
  //       icon: 'mdi-chart-pie'
  //     },
  //     {
  //       title: 'Sales',
  //       to: '/report/sales',
  //       icon: 'mdi-chart-bar'
  //     },
  //     {
  //       title: 'Purchase',
  //       to: '/report/purchase',
  //       icon: 'mdi-chart-bell-curve-cumulative'
  //     },
  //     {
  //       title: 'Profit',
  //       to: '/report/profit',
  //       icon: 'mdi-chart-line'
  //     }
  //   ]
  // },
  // {
  //   title: 'Supplier',
  //   to: '/supplier/all',
  //   icon: 'mdi-account-tie',
  //   child: [
  //     {
  //       title: 'Manage Supplier',
  //       to: '/supplier/all',
  //       icon: 'mdi-account-box-multiple'
  //     },
  //     {
  //       title: 'Add Supplier',
  //       to: '/supplier/add',
  //       icon: 'mdi-account-arrow-left'
  //     }
  //   ]
  // },
  // {
  //   title: 'Accounts',
  //   icon: 'mdi-bank',
  //   to: '/accounts',
  //   child: [
  //     {
  //       title: 'Create Account',
  //       to: '/account/create',
  //       icon: 'mdi-account-cash-outline'
  //     },
  //     {
  //       title: 'Manage Account',
  //       to: '/account/manage',
  //       icon: 'mdi-bank-transfer'
  //     },
  //     {
  //       title: 'Ledger',
  //       to: '/account/ledger',
  //       icon: 'mdi-hourglass',
  //       child: [
  //
  //         {
  //           title: 'Purchase Ledger',
  //           to: '/account/ledger/purchase',
  //           icon: 'mdi-credit-card-minus'
  //         },
  //         {
  //           title: 'Purchase Return Ledger',
  //           to: '/account/ledger/purchaseReturn',
  //           icon: 'mdi-wallet-plus-outline'
  //         },
  //         {
  //           title: 'Employee Ledger',
  //           to: '/account/ledger/employee',
  //           icon: 'mdi-credit-card-minus'
  //         },
  //         {
  //           title: 'Order Ledger',
  //           to: '/account/ledger/order',
  //           icon: 'mdi-wallet-plus-outline'
  //         },
  //         {
  //           title: 'Extra Expense Ledger',
  //           to: '/account/ledger/extraExpense',
  //           icon: 'mdi-credit-card-minus'
  //         },
  //         {
  //           title: 'Main Account Ledger',
  //           to: '/account/ledger/mainAccount',
  //           icon: 'mdi-credit-card-clock-outline'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Manage Transaction',
  //       to: '/account/transactions',
  //       icon: 'mdi-bank-transfer',
  //       child: [
  //
  //         {
  //           title: 'Income',
  //           to: '/account/transactions/income',
  //           icon: 'mdi-bank-plus'
  //         },
  //         {
  //           title: 'Expense',
  //           to: '/account/transactions/expense',
  //           icon: 'mdi-bank-minus'
  //         },
  //         {
  //           title: 'Capital',
  //           to: '/account/transactions/capital',
  //           icon: 'mdi-home-currency-usd'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Add Transaction',
  //       to: '/account/transaction/payment',
  //       icon: 'mdi-plus',
  //       child: [
  //         {
  //           title: 'Payment',
  //           to: '/account/transaction/payment',
  //           icon: 'mdi-cash-minus'
  //         },
  //         {
  //           title: 'Receipt',
  //           to: '/account/transaction/receipt',
  //           icon: 'mdi-cash-plus'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Closing',
  //       to: '/account/closing/manage',
  //       icon: 'mdi-drawer',
  //       child: [
  //         {
  //           title: 'Manage Closing',
  //           to: '/account/closing/manage',
  //           icon: 'mdi-door-closed-lock'
  //         },
  //         {
  //           title: 'Add Closing',
  //           to: '/account/closing/add',
  //           icon: 'mdi-clock'
  //         }
  //       ]
  //     },
  //     {
  //       title: 'Account Report',
  //       to: '/account/report/summary',
  //       icon: 'mdi-chart-areaspline',
  //       child: [
  //         {
  //           title: 'Summary',
  //           to: '/account/report/summary',
  //           icon: 'mdi-text-box-outline'
  //         },
  //         {
  //           title: 'Cashflow',
  //           to: '/account/report/summary',
  //           icon: 'mdi-currency-usd-circle-outline'
  //         }
  //
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: 'HR Management',
  //   icon: 'mdi-account-group',
  //   to: '/hr',
  //   child: [
  //     {
  //       title: 'Staff',
  //       to: '/hr/staff',
  //       icon: 'mdi-account-box-multiple'
  //     },
  //     {
  //       title: 'Add Staff',
  //       to: '/hr/staff/add',
  //       icon: 'mdi-account-plus'
  //     },
  //     {
  //       title: 'Edit Staff',
  //       to: '/hr/staff/edit',
  //       icon: 'mdi-account-edit'
  //     }
  //   ]
  // },
  // {
  //   title: 'Contact Us',
  //   to: '/contact-us',
  //   icon: 'mdi-message-text-outline'
  // },
  // {
  //   title: 'Settings',
  //   icon: 'mdi-cog',
  //   to: '/settings',
  //   child: [
  //     {
  //       title: 'Website Settings',
  //       to: '/settings/web',
  //       icon: 'mdi-web',
  //       child: [
  //         {
  //           title: 'Website Info',
  //           icon: 'mdi-information',
  //           to: '/settings/website-settings/website-info'
  //         },
  //         {
  //           title: 'Third Party Delivery',
  //           icon: 'mdi-information',
  //           to: '/settings/website-settings/third-party-delivery-service'
  //         },
  //         {
  //           title: 'Social Links',
  //           icon: 'mdi-information',
  //           to: '/settings/website-settings/social-links'
  //         },
  //         {
  //           title: 'Slider',
  //           icon: 'mdi-image-multiple',
  //           to: '/settings/website-settings/slider'
  //         },
  //         {
  //           title: 'Gallery',
  //           icon: 'mdi-image-multiple',
  //           to: '/settings/website-settings/gallery'
  //         },
  //         {
  //           title: 'Hosting',
  //           icon: 'mdi-application-cog',
  //           to: '/settings/website-settings/hosting'
  //         }
  //       ]
  //     },
  //     // {
  //     //   title: 'Package Info',
  //     //   icon: 'mdi-image-multiple',
  //     //   to: '/package-info'
  //     //   /* child: [
  //     //     {
  //     //       title: 'Manage',
  //     //       icon: 'mdi-image-multiple',
  //     //       to: '/gallery'
  //     //     },
  //     //     {
  //     //       title: 'Add',
  //     //       icon: 'mdi-plus',
  //     //       to: '/gallery/add'
  //     //     }
  //     //   ] */
  //     // }
  //   ]
  // }

  {
    title: 'Website Info',
    icon: 'mdi-information',
    to: '/settings/website-settings/website-info'
  },
  {
    title: 'Third Party Delivery',
    icon: 'mdi-information',
    to: '/settings/website-settings/third-party-delivery-service'
  },
  {
    title: 'Social Links',
    icon: 'mdi-information',
    to: '/settings/website-settings/social-links'
  },
  {
    title: 'Slider',
    icon: 'mdi-image-multiple',
    to: '/settings/website-settings/slider'
  },
  {
    title: 'Gallery',
    icon: 'mdi-image-multiple',
    to: '/settings/website-settings/gallery'
  },
  {
    title: 'Hosting',
    icon: 'mdi-application-cog',
    to: '/settings/website-settings/hosting'
  }
]
