import React, { useEffect, useState } from 'react'
import { Modal, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { startGetViajes } from '../../actions/viajes'
import { ArealizarList } from './arealizar/ArealizarList'
import { BuscarScreen } from './home/BuscarScreen'
import { CrearScreen } from './home/CrearScreen'
import { PorconfirmarList } from './porconfirmar/PorconfirmarList'
import { RealizadoList } from './realizados/RealizadoList'
import { closeSolicitudesModal } from '../../actions/ui'
import { SolicitudItem } from './SolicitudItem'
import { DetallesModal } from './modals/DetallesModal'
import { EditarModal } from './modals/EditarModal'

import './app.css'

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const { showSolicitudes } = useSelector((state) => state.ui)
  const { activeViaje } = useSelector((state) => state.trip)

  const [key, setKey] = useState('home')

  const disabled =
    rol === 'USER_ROLE' ? { disabled: false } : { disabled: true }

  useEffect(() => {
    dispatch(startGetViajes())
  }, [dispatch])

  const closeSolicitudes = () => {
    dispatch(closeSolicitudesModal())
  }

  return (
    <>
      <div className="container mt-5 pb-5 app-container rounded shadow">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="home"
            title={rol === 'CONDUCTOR_ROLE' ? 'Crear' : 'Buscar'}
          >
            <div
              style={{
                display: `${rol === 'CONDUCTOR_ROLE' ? '' : 'none'}`
              }}
            >
              <CrearScreen />
            </div>
            <div
              style={{
                display: `${rol === 'USER_ROLE' ? '' : 'none'}`
              }}
            >
              <BuscarScreen />
            </div>
          </Tab>
          <Tab eventKey="realizados" title="Realizados">
            <RealizadoList />
          </Tab>
          <Tab eventKey="arealizar" title="Arealizar">
            <ArealizarList />
          </Tab>
          <Tab eventKey="por confirmar" title="Por confirmar" {...disabled}>
            <PorconfirmarList />
          </Tab>
        </Tabs>
      </div>

      <DetallesModal />

      <EditarModal />

      <Modal show={showSolicitudes} onHide={closeSolicitudes}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitudes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!!activeViaje && rol === 'CONDUCTOR_ROLE' ? (
            activeViaje.listaespera !== null ? (
              activeViaje.listaespera.map((item) => (
                <SolicitudItem key={item._id} {...item} />
              ))
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}
