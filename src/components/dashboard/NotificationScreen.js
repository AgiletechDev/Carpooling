import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeNotifications } from '../../actions/ui'
import { NotificationItem } from './NotificationItem'

export const NotificationScreen = () => {
  const dispatch = useDispatch()
  const { showNotifications } = useSelector((state) => state.ui)
  const { notifications } = useSelector((state) => state.notify)

  const options = {
    backdrop: false
  }

  const handleClose = () => {
    dispatch(closeNotifications())
  }

  return (
    <Offcanvas
      show={showNotifications}
      onHide={handleClose}
      placement="end"
      {...options}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notificaciones</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          {notifications.map((item) => (
            <NotificationItem key={item} />
          ))}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
