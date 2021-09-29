import React from 'react'

function TransportCompany({company}) {
    return (
        <li>
            Company Name:{company.name}|Vehicles: {company.vehicles.length > 0?company.vehicles.length:"None"}
        </li>
    )
}

export default TransportCompany
