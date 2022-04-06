import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { startGetViajes } from '../../actions/viajes'
import { ArealizarList } from './arealizar/ArealizarList'
import { BuscarScreen } from './home/BuscarScreen'
import { CrearScreen } from './home/CrearScreen'
import { PorconfirmarList } from './porconfirmar/PorconfirmarList'
import { RealizadoList } from './realizados/RealizadoList'
import { DetallesModal } from './modals/DetallesModal'
import { EditarModal } from './modals/EditarModal'
import { SolicitudesModal } from './modals/SolicitudesModal'

import './app.css'

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)

  const [key, setKey] = useState('home')

  const disabled =
    rol === 'USER_ROLE' ? { disabled: false } : { disabled: true }

  useEffect(() => {
    dispatch(startGetViajes())
  }, [dispatch])

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

      <SolicitudesModal />
    </>
  )
}
