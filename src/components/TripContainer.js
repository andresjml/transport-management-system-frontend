import React, {useEffect, useState} from 'react'
import Trip from './Trip'
import { BASE_URL } from "../constraints/index"

function TripContainer() {
    const [trips, setTrips]=useState(null)
    const [toggle, setToggle]=useState(false)
    const [vehicles, setVehicles]=useState(null)
    const [newItem, setNewItem]=useState({vehicle_id:"", order_id:"", status:false})
    const [orders, setOrders]=useState(null)
    const [updateState, setUpdateState]=useState(false)
    
    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            .then(setTrips)
    }, [updateState]);

    //READ VEHICLES
    useEffect(() => {
        fetch(BASE_URL +`/vehicles`)
            .then(r=>r.json())
            .then(setVehicles)
    }, []);

    //READ ORDERS
    useEffect(() => {
        fetch(BASE_URL +`/orders`)
            .then(r=>r.json())
            .then(setOrders)
    }, []);

    //UPDATE TRIP
    function onEdit(updatedItem){
        
        fetch(BASE_URL + `trips/${updatedItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          })

        setUpdateState(!updateState);
    }



    //DELETE
    function onDelete(deletedTrip){
        
        fetch(BASE_URL + `trips/${deletedTrip.id}`, {
            method: "DELETE",
        })
        
        let updatedTrips = trips.filter(trip=>trip.id !== deletedTrip.id)
        setTrips(updatedTrips)
    }

    //POPULATE TRIPS
    function populateTrips(){        
        return (trips.map(trip => <Trip key={trip.id} trip={trip} onDelete={onDelete} onEdit={onEdit}/>))
    }

    //POPULATE VEHICLES FOR INPUT FORM
    function populateVehicles(){
        return (vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id} >ID:{vehicle.id}-{vehicle.v_type} / Company: {vehicle.transport_company.name}</option>))
    }

    //POPULATE ORDERS FOR INPUT FORM
    function populateOrders(){
        return (orders.map(order => <option key={order.id} value={order.id} >ID:{order.id}-Client:{order.client.name} / Volume: {order.volume}</option>))
    }

    //HANDLE INPUT CHANGE
    function handleInputChange(event) {
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })  
    } 

    //CREATE A NEW TRIP
    function handleSubmit(e){
        e.preventDefault()        
        
        fetch(BASE_URL +`trips`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
        
        setUpdateState(!updateState);        
        
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
