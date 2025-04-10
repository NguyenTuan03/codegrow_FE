import React, { ReactNode } from 'react'

const layout = ({children} : {children: ReactNode}) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(90deg, #7ECFAF 0%, #C7E6D7 32%, #6C7ED0 100%)',
      }}
      className='flex items-center justify-center'
    >
      {children}
    </div>
  )
}

export default layout