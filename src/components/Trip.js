import React from 'react'

function Trip({trip, onDelete}) {
    const [toggle, setToggle]=useState(false)    



    return (
        <>
            {
                trip&&(
                
                <li>           
                    <br/>
                    Trip # {trip.id} | Order # {trip.order.id} | Client Name:{trip.order.client.name} | Address:{trip.order.client.address} | Transport Company: {trip.transport_company.name} | Vehicle ID: {trip.vehicle.id}
                    <br/>
                    <button>Update</button>        
                    <button onClick={()=>onDelete(trip)}>Delete</button>            
                </li>)
            }
        
        </>
    )
}

export default Trip
