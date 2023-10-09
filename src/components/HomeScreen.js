import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { BsFillCalendarWeekFill, BsSearch } from 'react-icons/bs'

import './home.css'

export const HomeScreen = () => {
  return (
    <div className="home-container">
      <div className="container-fluid home-form">
        <div className="row pt-5 pb-3 justify-content-center home-form-row">
          <div className="col-auto align-self-center">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <FaMapMarkerAlt />
                <label className="ms-2">Ciudad</label>
              </div>
              <input
                type="text"
                className="input-header border-0 border-bottom border-dark bg-transparent"
                placeholder="ciudad"
              />
            </div>
          </div>

          <div className="col-auto align-self-center">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <FaMapMarkerAlt />
                <label className="ms-2">Destino</label>
              </div>
              <input
                type="text"
                className="border-0 border-bottom border-dark bg-transparent"
                placeholder="destino"
              />
            </div>
          </div>

          <div className="col-auto align-self-center">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <BsFillCalendarWeekFill />
                <label className="ms-2">Fecha</label>
              </div>
              <input
                type="date"
                className="border-0 border-bottom border-dark bg-transparent"
              />
            </div>
          </div>

          <div className="col-auto align-self-center">
            <button type="button" className="btn btn-primary px-4">
              Buscar <BsSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid home-footer">
        <div className="row bg-light py-5 justify-content-center home-footer-row">
          <div className="col-auto col-4 car-img"></div>
          <div className="col-auto ms-3">
            <p className="h2 text-primary">¿Cansado de viajar solo?</p>
            <ul className="list-unstyled text-primary text-center">
              <li>Conoce nueva gente</li>
              <li>Convierte tu viaje más</li>
              <li>divertido y economico.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
