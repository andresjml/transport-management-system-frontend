import React from 'react'

function Trip({trip}) {
    return (
        <li>
            Trip # {trip.id} | Order # {trip.order.id} | Client Name:{trip.order.client.name} | Address:{trip.order.client.address} | Transport Company: {trip.transport_company.name} | Vehicle ID: {trip.vehicle.id}
        </li>
    )
}

export default Trip
