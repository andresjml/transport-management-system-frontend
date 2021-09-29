import React from 'react'

function Vehicle({vehicle}) {
    return (
        <li>
            Vehicle # {vehicle.id} | Vehicle Type: {vehicle.v_type} | Capacity:{vehicle.capacity} | Company:{vehicle.transport_company.name}
        </li>
    )
}

export default Vehicle
