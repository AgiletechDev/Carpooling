import React from 'react'
import { Card } from 'react-bootstrap'

export const NotificationItem = (notify) => {
  const { tipo, mensaje, titulo } = notify

  return (
    <Card border={tipo} className="shadow-sm m-3 rounded">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{mensaje}</Card.Text>
      </Card.Body>
    </Card>
  )
}
