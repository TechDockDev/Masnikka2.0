import MyWishlist from '@/components/myWishlist/myWishlist'
import MyAccountLayout from '@/components/myAccountLayout'
import React from 'react'

const index = () => {
  return (
    <MyAccountLayout>
        <MyWishlist/>
    </MyAccountLayout>
  )
}

export default index