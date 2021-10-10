import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../constraints/index"
import Order from './Order'


function OrderContainer() {
    const [orders, setOrders]=useState(null)
    
    //READ ORDERS
    useEffect(() => {
        fetch(BASE_URL +`/orders`)
            .then(r=>r.json())
            .then(setOrders)
    }, []);

    //POPULATE ORDERS    
    function populateOrders(){        
        return (orders.map(order => <Order key={order.id} order={order}/>))
    }


    return (
        <ul className="pt-5">
            {orders&&populateOrders()}
        </ul>
    )
}

export default OrderContainer
