import React, {useState, useEffect} from 'react'
import { BASE_URL } from "../constraints/index"

function Trip({trip, onDelete, onEdit, changeAssigned, onComplete}) {
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
        <>
            {
                trip&&(
                <>
                    <th scope="row">
                        {trip.id}
                    </th>
                    <td>
                        {trip.order.id}
                    </td>
                    <td>
                        {trip.order.client.name}
                    </td>
                    <td>
                        {trip.order.client.address}
                    </td>
                    <td>
                        {trip.transport_company.name}
                    </td>
                    <td>
                        {trip.vehicle.id}
                    </td>
                    <td>
                    {trip.status? <h6>Trip Completed</h6>:<button onClick={()=>setToggle(!toggle)} className="btn btn-outline-dark">Update Trip's Vehicle</button>}
                        {
                            toggle&&(
                                <form onSubmit={handleSubmit}>
                                <select name='vehicle_id' onChange={handleInputChange}>
                                    <option >Select Vehicle</option>
                                    {vehicles&&populateVehicles()}
                                </select>                    
                                <button type="submit" className="btn btn-outline-dark">
                                    Modify Trip
                                </button> 
                            </form>
                            )
                        }
                    </td>
                    <td>
                        {trip.status? null:<button onClick={()=>onComplete(trip)} className="btn btn-outline-dark">Complete Trip</button>}
                    </td>
                    <td>
                    {trip.status? null:<button onClick={()=>onDelete(trip)} className="btn btn-outline-dark">Delete Trip</button>}
                    </td>
                </>
                    )}
            
        
        </>
    )
}

export default Trip
