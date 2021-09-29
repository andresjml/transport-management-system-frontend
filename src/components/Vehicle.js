import React from 'react'

function Vehicle({vehicle, onDelete}) {
    return (
        <>
            {vehicle&&(
                <li>
                    Vehicle # {vehicle.id} | Vehicle Type: {vehicle.v_type} | Capacity:{vehicle.capacity} | Company:{vehicle.transport_company.name}
                    <br/>
                    <button onClick={()=>onDelete(vehicle)}>Delete</button>
                </li>
            )}      
                            
        </>
    )
}

export default Vehicle
