import React from 'react'
import { Card } from 'react-bootstrap'

export const NotificationItem = (notify) => {
  const { tipo, mensaje } = notify

  return (
    <Card
      // bg={tipo}
      // bg="success"
      // bg="danger"
      bg="info"
      text="white"
      className="shadow-sm m-3 rounded"
    >
      <Card.Body>
        <Card.Title>Titulo</Card.Title>
        <Card.Text className="text-white">{mensaje}</Card.Text>
      </Card.Body>
    </Card>
  )
}