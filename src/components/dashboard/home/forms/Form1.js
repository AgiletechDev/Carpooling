import React, { useState } from 'react'
import moment from 'moment'
import DatePicker, { registerLocale } from 'react-datepicker'
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from 'react-places-autocomplete'
import es from 'date-fns/locale/es'
import 'moment/locale/es'

moment.locale('es')
registerLocale('es', es)

const now = moment()

export const Form1 = ({ setStep, formValues1, handleInputChange1 }) => {
  const [desdeValid, setDesdeValid] = useState(true)
  const [hastaValid, setHastaValid] = useState(true)
  const [fechaValid, setFechaValid] = useState(true)

  const { desde, hasta, fecha } = formValues1

  const validateForm1 = () => {
    let valid = true
    const selectedDate = moment(fecha)

    if (desde.trim().length < 2) {
      setDesdeValid(false)
      valid = valid && false
    } else setDesdeValid(true)

    if (hasta.trim().length < 2) {
      setHastaValid(false)
      valid = valid && false
    } else setHastaValid(true)

    if (selectedDate.isBefore(now)) {
      setFechaValid(false)
      valid = valid && false
    } else setFechaValid(true)

    return valid
  }

  const handleSubmit1 = (e) => {
    e.preventDefault()
    const isValid = validateForm1()

    console.log(fecha)

    if (isValid) {
      setStep(2)
    } else return
  }

  const handleDateChange = (e) => {
    handleInputChange1({
      target: {
        name: 'fecha',
        value: e
      }
    })
  }

  // const handleDesdePlaceChange = (e) => {
  //   handleInputChange1({
  //     target: {
  //       name: 'desde',
  //       value: e
  //     }
  //   })
  // }

  // const handleDesdeSelect = (value) => {
  //   console.log(value)
  // }

  return (
    <form onSubmit={handleSubmit1}>
      <h3 className="mb-3">Encuentro</h3>

      <div className="form-group text-start mb-2">
        <label className="form-label">Desde</label>
        <input
          type="text"
          className={`form-control ${!desdeValid && 'is-invalid'}`}
          placeholder="Desde"
          name="desde"
          value={desde}
          onChange={handleInputChange1}
          autoComplete="off"
        />
        {/* <PlacesAutocomplete
          value={desde}
          onChange={handleDesdePlaceChange}
          onSelect={handleDesdeSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input form-control'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete> */}
      </div>

      <div className="form-group text-start mb-2">
        <label className="form-label">Hasta</label>
        <input
          type="text"
          className={`form-control ${!hastaValid && 'is-invalid'}`}
          placeholder="Hasta"
          name="hasta"
          value={hasta}
          onChange={handleInputChange1}
          autoComplete="off"
        />
      </div>

      <div className="form-group text-start mb-4">
        <label className="form-label">Fecha y hora</label>
        <DatePicker
          className={`form-control ${!fechaValid && 'is-invalid'}`}
          locale="es"
          dateFormat="dd/MM/yyyy, hh:mm:aa"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          selected={fecha}
          showTimeSelect
          timeIntervals={15}
          onChange={handleDateChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Continuar
        </button>
      </div>
    </form>
  )
}
