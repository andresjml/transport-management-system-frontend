import React, {useEffect, useState} from 'react'
import Vehicle from './Vehicle'
import { BASE_URL } from "../constraints/index"

function VehicleContainer() {
    const [vehicles, setVehicles]=useState(null)
    
    //READ VEHICLES
    useEffect(() => {
        fetch(BASE_URL +`/vehicles`)
            .then(r=>r.json())
            .then(setVehicles)
    }, []);

    //POPULATE VEHICLES
    function populateVehicles(){        
        return (vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle}/>))
    }


    return (
        <ul>
            {vehicles&&populateVehicles()}
        </ul>
    )
}

export default VehicleContainer
