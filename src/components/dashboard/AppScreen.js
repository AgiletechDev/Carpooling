import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'

import { startGetViajes } from '../../actions/viajes'
import { ArealizarList } from './arealizar/ArealizarList'
import { BuscarScreen } from './home/BuscarScreen'
import { CrearScreen } from './home/CrearScreen'
import { PorconfirmarList } from './porconfirmar/PorconfirmarList'
import { RealizadoList } from './realizados/RealizadoList'
import { DetallesModal } from './modals/DetallesModal'
import { EditarModal } from './modals/EditarModal'
import { SolicitudesModal } from './modals/SolicitudesModal'
import { NotificationScreen } from './NotificationScreen'
import { startLoadingNotifications } from '../../actions/notify'

import './app.css'

// const libraries = (process.env.REACT_APP_GOOGLE_LIBRARIES || '').split(',')
const libraries = ["places"]

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => {
    console.log(state.auth)
    return state.auth
  })

  const [key, setKey] = useState('home')

  useEffect(() => {
    dispatch(startGetViajes())
    /* dispatch(startLoadingNotifications()) */
  }, [dispatch])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries: libraries
  })
  console.log(isLoaded)
  console.log(rol)
  return (
    <>
      <div className="container mt-5 pb-5 app-container rounded shadow">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="home"
            title={rol === 'CONDUCTOR_ROLE' ? 'Crear' : 'Buscar'}
          >
            {rol === 'CONDUCTOR_ROLE' ? (
              <CrearScreen isLoaded={isLoaded} />
            ) : (
              <BuscarScreen />
            )}
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

      <DetallesModal isLoaded={isLoaded} />
      <EditarModal />
      <SolicitudesModal />
      <NotificationScreen />
    </>
  )
}
