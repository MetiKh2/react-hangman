import React from 'react'

const Notification = ({showNotification}) => {

  return (
    <div className={`notification-container ${showNotification?'show':''}`} id="notification-container">
    <p>You have already entered this letter</p>
  </div>
  )
}

export default Notification