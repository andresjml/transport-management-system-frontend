import React, {useEffect, useState} from 'react'
import Trip from './Trip'
import { BASE_URL } from "../constraints/index"

function TripContainer() {
    const [trips, setTrips]=useState(null)
    
    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            .then(setTrips)
    }, []);

    //POPULATE TRIPS
    function populateTrips(){        
        return (trips.map(trip => <Trip key={trip.id} trip={trip}/>))
    }


    return (
        <ul>
            {trips&&populateTrips()}
        </ul>
    )
}

export default TripContainer
