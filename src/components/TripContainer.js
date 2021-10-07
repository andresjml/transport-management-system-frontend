import React, {useEffect, useState} from 'react'
import Trip from './Trip'
import { BASE_URL } from "../constraints/index"

function TripContainer() {
    const [trips, setTrips]=useState(null)
    const [toggle, setToggle]=useState(false)
    const [vehicles, setVehicles]=useState(null)
    const [newItem, setNewItem]=useState({vehicle_id:"", order_id:"", status:false})
    const [orders, setOrders]=useState(null)
    

    
    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            .then(setTrips)
    }, []);


    //READ VEHICLES
    useEffect(() => {
        fetch(BASE_URL +`/vehicles`)
            .then(r=>r.json())
            .then(setVehicles)
    }, [trips]);


    //READ ORDERS
    useEffect(() => {
        fetch(BASE_URL +`/orders`)
            .then(r=>r.json())
            .then(setOrders)
    }, [trips]);
    

    //CREATE A NEW TRIP
    function handleSubmit(e){
        e.preventDefault()
        
        
        fetch(BASE_URL +`orders/${newItem.order_id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({status:true}),
        })

        fetch(BASE_URL +`vehicles/${newItem.vehicle_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({assigned:true}),
        })  

        fetch(BASE_URL +`trips`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
        
        .then(r=>r.json())
        .then(resp=>setTrips([...trips,resp]))       
        
        setToggle(!toggle)
    } 


    //UPDATE TRIP
    function onEdit(updatedItem){
        
        fetch(BASE_URL + `trips/${updatedItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          })

          .then(r=>r.json())
          .then(resp=>{
            const updatedTrips = trips.map((t) => {
                if (t.id === resp.id) return resp;
                return t;
              });
              setTrips(updatedTrips);
        })

        fetch(BASE_URL +`vehicles/${updatedItem.vehicle_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({assigned:true}),
        })

        
    }


    //DELETE TRIP
    function onDelete(deletedTrip){
        
        fetch(BASE_URL +`orders/${deletedTrip.order.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({status:false}),
        })

        fetch(BASE_URL +`vehicles/${deletedTrip.vehicle_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({assigned:false}),
        })
          
        
        fetch(BASE_URL + `trips/${deletedTrip.id}`, {
            method: "DELETE",
        })
        
        let updatedTrips = trips.filter(trip=>trip.id !== deletedTrip.id)
        setTrips(updatedTrips)
    }

    //MODIFY ASSIGNED VEHICLE
    function changeAssigned(trip){
        
        fetch(BASE_URL +`vehicles/${trip.vehicle_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({assigned:false}),
        })
    }


    //POPULATE TRIPS
    function populateTrips(){        
        return (trips.map(trip => <Trip key={trip.id} trip={trip} onDelete={onDelete} onEdit={onEdit} changeAssigned={changeAssigned}/>))
    }


    //POPULATE VEHICLES FOR INPUT FORM
    function populateVehicles(){
        return (vehicles.map(vehicle => vehicle.assigned? null: <option key={vehicle.id} value={vehicle.id} >ID:{vehicle.id}-{vehicle.v_type} / Company: {vehicle.transport_company.name}</option>))
    }


    //POPULATE ORDERS FOR INPUT FORM
    function populateOrders(){
        return (orders.map(order => order.status? null:<option key={order.id} value={order.id} >ID:{order.id}-Client:{order.client.name} / Volume: {order.volume}</option>))
    }


    //HANDLE INPUT CHANGE
    function handleInputChange(event) {
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })  
    }    


    return (
        <>
            <button onClick={()=>setToggle(!toggle)}>New Trip</button>
            {
                toggle&&(
                    <form onSubmit={handleSubmit}>
                        <select name='vehicle_id' onChange={handleInputChange}>
                            <option >Select Vehicle</option>
                            {vehicles&&populateVehicles()}
                        </select>
                        <select name='order_id' onChange={handleInputChange}>
                            <option >Select Order</option>
                            {orders&&populateOrders()}
                        </select>
                        <button type="submit">
                            Create New Trip
                        </button> 
                    </form>
                )
            }


            <ul>
                {trips&&populateTrips()}
            </ul>
        </>
    )
}

export default TripContainer
