import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../constraints/index"
import Order from './Order'
import { VictoryPie, VictoryTheme} from 'victory';
import {Link} from 'react-router-dom'

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

    
    function populateTableData(){
        return(dataToGraph.map(data =><tr><td>{data.x}</td><td>{data.y}</td></tr>))
    }
   
    


    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col">
                    <VictoryPie data={dataToGraph} height={200} theme={VictoryTheme.material}/>
                </div>
                <div className="col">
                    <table className="table">
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">count</th>
                        </tr>
                        {dataToGraph&&populateTableData()}            
                    </table>
                    <Link to="/trips"><button type="button" className="btn btn-outline-dark">Assing Orders</button></Link>
                </div>                           
            </div>
            
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
