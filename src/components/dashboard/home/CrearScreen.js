import React from 'react'

import { MultiStepsForm } from './forms/MultiStepsForm'

export const CrearScreen = ({ isLoaded }) => {
  return (
    <div className="container mt-3 text-center">
      <div className="row align-items-center justify-content-center mt-5">
        <div className="col-lg-5">
          <MultiStepsForm isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  )
}
