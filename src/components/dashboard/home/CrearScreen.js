import React from 'react'

import { MultiStepsForm } from './forms/MultiStepsForm'

export const CrearScreen = () => {
  return (
    <div className="container mt-3 text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5">
          <MultiStepsForm />
        </div>
      </div>
    </div>
  )
}
