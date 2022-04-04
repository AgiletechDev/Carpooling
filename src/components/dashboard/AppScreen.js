import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startGetViajes } from '../../actions/viajes'
import { BuscarScreen } from './home/BuscarScreen'
import { CrearScreen } from './home/CrearScreen'
import { RealizadoList } from './realizados/RealizadoList'

export const AppScreen = () => {
  const dispatch = useDispatch()
  const { rol } = useSelector((state) => state.auth)
  const [key, setKey] = useState('home')

  useEffect(() => {
    dispatch(startGetViajes())
  }, [dispatch])

  return (
    <div className="container mt-5">
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
      </Tabs>
    </div>
  )
}
