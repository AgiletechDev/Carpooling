import React from 'react'
import { Appbar } from './appbar/Appbar'

export const HomeScreen = () => {
  return (
    <div>
      <Appbar />
      <div className="container-fluid">
        <div className="row bg-info pt-5 pb-3 justify-content-center">
          <div className="col-auto">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <label className="ms-2">Ciudad</label>
              </div>
              <input
                type="text"
                className="input-header border-0 border-bottom border-dark bg-transparent"
                placeholder="ciudad"
              />
            </div>
          </div>

          <div className="col-auto">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                <label className="ms-2">Destino</label>
              </div>
              <input
                type="text"
                className="border-0 border-bottom border-dark bg-transparent"
                placeholder="destino"
              />
            </div>
          </div>

          <div className="col-auto">
            <div className="bg-light text-dark rounded-3 p-3 mb-3">
              <div className="my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar2-week-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
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
              Buscar{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row bg-light py-5 justify-content-center">
          <div className="col-auto col-4 border border-success"></div>
          <div className="col-auto">
            <p className="h2 text-primary">¿Cansado de viajar solo?</p>
            <ul className="list-unstyled text-primary text-center">
              <li>Conoce nueva gente</li>
              <li>Convierte tu vieja más</li>
              <li>divertido y economico.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
