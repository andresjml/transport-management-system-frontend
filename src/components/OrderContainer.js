import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../constraints/index"
import Order from './Order'
import { VictoryPie, VictoryTheme} from 'victory';


function OrderContainer() {
    const [orders, setOrders]=useState(null)
    const [dataToGraph, setDataToGraph]=useState(null)
    
    //READ ORDERS
    useEffect(() => {
        fetch(BASE_URL +`/orders`)
            .then(r=>r.json())
            .then(resp=>{
                setOrders(resp)
                createData(resp)})
            
    }, []);

    //POPULATE ASSIGNED ORDERS    
    function populateAssignedOrders(){        
        return (orders.map(order => order.status? <Order key={order.id} order={order}/>:null))
    }
    
    //POPULATE UNASSIGNED ORDERS    
    function populateUnassignedOrders(){        
        return (orders.map(order => order.status? null:<Order key={order.id} order={order}/>))
    }

    //DATA FOR VICTORY
    function createData(orders){        
        let dataToGraph=[]
        if(orders){
            orders.map(order=>{
                let findOrder = dataToGraph.find(element=>element.status === order.status)     
                if(findOrder){
                  return findOrder.y=findOrder.y+1
                }else{
                   return dataToGraph.push(order.status? {status:true, x:"Assigned", y:1}:{status:false, x:"Unassigned", y:1})
                }        
            })
        }
        setDataToGraph(dataToGraph) 
               
    }

    
    
   
    


    return (
        <div className="container">
            <VictoryPie data={dataToGraph} height={200} theme={VictoryTheme.material}/>
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
