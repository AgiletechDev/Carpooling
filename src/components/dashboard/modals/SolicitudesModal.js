import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { closeSolicitudesModal } from '../../../actions/ui'
import { SolicitudItem } from '../SolicitudItem'
import { fetchConToken } from '../../../helpers/fetch'

export const SolicitudesModal = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showSolicitudes } = useSelector((state) => state.ui)
  const { activeViaje } = useSelector((state) => state.trip)
  const [pendinUsers, setPendingUsers] = useState(null)


  const closeSolicitudes = () => {
    dispatch(closeSolicitudesModal())
  }

  useEffect(() => {
    activeViaje && fetchConToken(`viajes/usuariosPendientes/${activeViaje?.vi_id}`)
    .then(resp => resp.json())
    .then(body => {
      setPendingUsers(body.users)
    })
    //console.log(pendinUsers)
  }, [activeViaje])

  return (
    <Modal show={showSolicitudes} onHide={closeSolicitudes}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitudes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!!activeViaje && rol === 'CONDUCTOR_ROLE' ? (
          !!pendinUsers ? (
            pendinUsers.map((item) => (
              <SolicitudItem key={item.us_id} {...item} />
            ))
          ) : (
            <p>Sin solicitudes</p>
          )
        ) : null}
      </Modal.Body>
    </Modal>
  )
}
