import MyAccountLayout from '@/components/myAccountLayout'
import MyOrders from '@/components/myOrders/myOrders'
import React from 'react'

const index = () => {
  return (
  <MyAccountLayout>
    <MyOrders/>
  </MyAccountLayout>
  )
}

export default index