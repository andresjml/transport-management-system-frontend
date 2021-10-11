import React from 'react'

function Vehicle({vehicle, onDelete}) {
    return (
        <>
            {vehicle&&(
                <>
                <th scope="row">{vehicle.id}</th>
                <td>{vehicle.v_type}</td>
                <td>{vehicle.capacity}</td>
                <td>{vehicle.transport_company.name}</td>
                <td><button onClick={()=>onDelete(vehicle)} className="btn btn-outline-dark">Delete</button></td>
                    
                </>
            )}      
                            
        </>
    )
}

export default Vehicle
