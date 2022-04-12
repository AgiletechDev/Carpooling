import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import { useForm } from '../../../../hooks/useForm'
import { Form1 } from './Form1'
import { Form2 } from './Form2'
import { Resumen } from './Resumen'
import { startCrearViaje } from '../../../../actions/viajes'

moment.locale('es')

export const MultiStepsForm = ({ isLoaded }) => {
  const dispatch = useDispatch()

  const [step, setStep] = useState(1)

  const handleBack = () => {
    setStep(step - 1)
  }

  const [formValues1, handleInputChange1, reset1] = useForm({
    desde: '',
    hasta: '',
    fecha: ''
  })

  const [formValues2, handleInputChange2, reset2] = useForm({
    precio: '',
    asientos: '',
    vehiculo: '',
    detalles: ''
  })

  const handleFinalSubmit = () => {
    dispatch(startCrearViaje({ ...formValues1, ...formValues2 }))
    setStep(1)
    reset1()
    reset2()
  }
  switch (step) {
    case 1:
      return (
        <Form1
          setStep={setStep}
          formValues1={formValues1}
          handleInputChange1={handleInputChange1}
          isLoaded={isLoaded}
        />
      )

    case 2:
      return (
        <Form2
          setStep={setStep}
          handleBack={handleBack}
          formValues2={formValues2}
          handleInputChange2={handleInputChange2}
        />
      )

    case 3:
      return (
        <Resumen
          handleFinalSubmit={handleFinalSubmit}
          {...formValues1}
          {...formValues2}
          handleBack={handleBack}
          isLoaded={isLoaded}
        />
      )

    default:
      return <Form1 setStep={setStep} />
  }
}
