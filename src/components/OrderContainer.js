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

    //POPULATE ASSIGNED ORDERS    
    function populateAssignedOrders(){        
        return (orders.map(order => order.status? <Order key={order.id} order={order}/>:null))
    }
    
    //POPULATE UNASSIGNED ORDERS    
    function populateUnassignedOrders(){        
        return (orders.map(order => order.status? null:<Order key={order.id} order={order}/>))
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>Assigned Orders</h3>
                    <ul className="list-group list-group-flush pt-5">
                        {orders&&populateAssignedOrders()}
                    </ul>
                </div>
                <div className="col">            
                    <h3>Unassigned Orders</h3>
                    <ul className="list-group list-group-flush pt-5">
                        {orders&&populateUnassignedOrders()}
                    </ul>
                </div>                
            </div>
        </div>
    )
}

export default OrderContainer
