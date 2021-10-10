import React, {useState, useEffect} from 'react'
import { BASE_URL } from "../constraints/index"

function Trip({trip, onDelete, onEdit, changeAssigned}) {
    const [toggle, setToggle]=useState(false)    
    const [updatedItem, setUpdatedItem]=useState()
    const [vehicles, setVehicles]=useState(null)

    //READ VEHICLES
    useEffect(() => {
        fetch(BASE_URL +`/vehicles`)
            .then(r=>r.json())
            .then(setVehicles)
    }, [toggle]);

   //HANDLE INPUT CHANGE
   function handleInputChange(event) {       
        setUpdatedItem({
            ...trip, 
            [event.target.name]:event.target.value
        })  
    }

    //POPULATE VEHICLES FOR INPUT FORM
    function populateVehicles(){
        return (vehicles.map(vehicle => vehicle.assigned? null: <option key={vehicle.id} value={vehicle.id} >ID:{vehicle.id}-{vehicle.v_type} / Company: {vehicle.transport_company.name}</option>))
    }


    //HANDLE SUBMIT
    function handleSubmit(e){
        e.preventDefault()
        onEdit(updatedItem)
        changeAssigned(trip)
        setToggle(!toggle)
    }
    

    return (
        <div className="pt-5">
            {
                trip&&(
                
                <li>           
                    <br/>
                    Trip # {trip.id} | Order # {trip.order.id} | Client Name:{trip.order.client.name} | Address:{trip.order.client.address} | Transport Company: {trip.transport_company.name} | Vehicle ID: {trip.vehicle.id}
                    <br/>
                    <button onClick={()=>setToggle(!toggle)}>Update Trip's Vehicle</button>        
                    <button onClick={()=>onDelete(trip)}>Delete</button>            
                </li>)
            }
            {
                toggle&&(
                    <form onSubmit={handleSubmit}>
                    <select name='vehicle_id' onChange={handleInputChange}>
                        <option >Select Vehicle</option>
                        {vehicles&&populateVehicles()}
                    </select>                    
                    <button type="submit">
                        Modify Trip
                    </button> 
                </form>
                )
            }
        
        </div>
    )
}

export default Trip
