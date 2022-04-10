import React, { useState } from 'react'

export const Form2 = ({
  setStep,
  handleBack,
  formValues2,
  handleInputChange2
}) => {
  const [precioValid, setPrecioValid] = useState(true)
  const [asientosValid, setAsientosValid] = useState(true)
  const [vehiculoValid, setVehiculoValid] = useState(true)

  const { precio, asientos, vehiculo, detalles } = formValues2

  const validateForm2 = () => {
    let valid = true

    if (precio.trim().length < 1 || Number(precio.trim()) < 0) {
      setPrecioValid(false)
      valid = valid && false
    } else setPrecioValid(true)

    if (asientos.trim().length < 1 || Number(asientos.trim()) <= 0) {
      setAsientosValid(false)
      valid = valid && false
    } else setAsientosValid(true)

    if (vehiculo.trim().length < 2) {
      setVehiculoValid(false)
      valid = valid && false
    } else setVehiculoValid(true)

    return valid
  }

  const handleSubmit2 = (e) => {
    e.preventDefault()
    const isValid = validateForm2()

    if (isValid) {
      setStep(3)
    } else return
  }

  return (
    <form onSubmit={handleSubmit2}>
      <h3 className="mb-2">Detalle</h3>
      <h5 className="mb-3">Informacion del auto</h5>

      <div className="form-group text-start mb-2">
        <label className="form-label">Precio</label>
        <input
          type="text"
          className={`form-control ${!precioValid && 'is-invalid'}`}
          placeholder="Precio"
          name="precio"
          value={precio}
          onChange={handleInputChange2}
          autoComplete="off"
        />
      </div>

      <div className="form-group text-start mb-2">
        <label className="form-label">Pasajeros</label>
        <input
          type="text"
          className={`form-control ${!asientosValid && 'is-invalid'}`}
          placeholder="Pasajeros"
          name="asientos"
          value={asientos}
          onChange={handleInputChange2}
          autoComplete="off"
        />
      </div>

      <div className="form-group text-start mb-2">
        <label className="form-label">Vehiculo</label>
        <input
          type="text"
          className={`form-control ${!vehiculoValid && 'is-invalid'}`}
          placeholder="Vehiculo"
          name="vehiculo"
          value={vehiculo}
          onChange={handleInputChange2}
          autoComplete="off"
        />
      </div>

      <div className="form-group text-start mb-4">
        <label className="form-label">Detalles</label>
        <textarea
          type="text"
          className="form-control"
          placeholder="Agrega cualquier información extra que creas relevante"
          name="detalles"
          value={detalles}
          onChange={handleInputChange2}
          autoComplete="off"
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>

        <button onClick={handleBack} className="btn btn-secondary">
          Volver
        </button>
      </div>
    </form>
  )
}
