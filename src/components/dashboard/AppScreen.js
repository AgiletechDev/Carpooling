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
import { NotificationScreen } from './NotificationScreen'
import { startLoadingNotifications } from '../../actions/notify'

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)

  const [key, setKey] = useState('home')

  useEffect(() => {
    dispatch(startGetViajes())
    dispatch(startLoadingNotifications())
  }, [dispatch])

  return (
    <>
      <div className="container mt-5 pb-5 app-container rounded shadow">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="home"
            title={rol === 'CONDUCTOR_ROLE' ? 'Crear' : 'Buscar'}
          >
            {rol === 'CONDUCTOR_ROLE' ? <CrearScreen /> : <BuscarScreen />}
          </Tab>
          <Tab eventKey="realizados" title="Realizados">
            <RealizadoList />
          </Tab>
          <Tab eventKey="arealizar" title="Arealizar">
            <ArealizarList />
          </Tab>
          {rol === 'USER_ROLE' ? (
            <Tab eventKey="por confirmar" title="Por confirmar">
              <PorconfirmarList />
            </Tab>
          ) : null}
        </Tabs>
      </div>

      <DetallesModal />
      <EditarModal />
      <SolicitudesModal />
      <NotificationScreen />
    </>
  )
}
