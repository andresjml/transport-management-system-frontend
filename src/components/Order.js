import React from 'react'


function Order({order}) {


    return (
        <li>
           Order # {order.id}|Client Name:{order.client.name}|Route:{order.client.route.name}|Trip: {order.trips.length > 0?"Assigned":"Pending"}
        </li>
    )
}

export default Order
