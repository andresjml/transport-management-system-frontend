import React, {useEffect, useState} from 'react'
import Vehicle from './Vehicle'
import { BASE_URL } from "../constraints/index"

function VehicleContainer() {
    const [vehicles, setVehicles]=useState(null)
    const [toggle, setToggle]=useState(false)
    const [companies, setCompanies]=useState(null)
    const [newItem, setNewItem]=useState({v_type:"", capacity:"",transport_company_id:""})
    
    
    //READ VEHICLES
    useEffect(() => {
        fetch(BASE_URL +`/vehicles`)
            .then(r=>r.json())
            .then(setVehicles)
    }, []);

    //READ COMPANIES
    useEffect(() => {
        fetch(BASE_URL +`/transport_companies`)
            .then(r=>r.json())
            .then(setCompanies)
    }, []);

     //HANDLE INPUT CHANGE
     function handleInputChange(event) {
        setNewItem({
            ...newItem, 
            [event.target.name]:event.target.value
        })  
    } 


    //CREATE A NEW VEHICLE
    function handleSubmit(e){
        e.preventDefault()        
        
        fetch(BASE_URL +`vehicles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
        
        .then(r=>r.json())
        .then(resp=>setVehicles([...vehicles,resp]))  

        setToggle(!toggle)
    } 

    //DELETE VEHICLE
    function onDelete(deletedVehicle){
        
        fetch(BASE_URL + `vehicles/${deletedVehicle.id}`, {
            method: "DELETE",
        })
        
        let updatedVehicles = vehicles.filter(vehicle=>vehicle.id !== deletedVehicle.id)
        setVehicles(updatedVehicles)
    }

    //POPULATE VEHICLES
    function populateVehicles(){        
        return (vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} onDelete={onDelete}/>))
    }

    //POPULATE COMPANIES FOR INPUT FORM
    function populateCompanies(){
        return (companies.map(company => <option key={company.id} value={company.id} >ID:{company.id} / Name: {company.name}</option>))
    }


    return (
        <>
            <button onClick={()=>setToggle(!toggle)}>New Vehicle</button>
            {
                toggle&&(
                    <form onSubmit={handleSubmit}>
                        Company:
                        <select name='transport_company_id' onChange={handleInputChange}>
                            <option >Select Company</option>
                            {vehicles&&populateCompanies()}
                        </select>
                        Type:
                        <input type="text" name="v_type" value={newItem.v_type} onChange={handleInputChange}/>
                        Capacity:
                        <input type="number" name="capacity" value={newItem.capacity} onChange={handleInputChange}/>
                        <button type="submit">
                            Create New Vehicle
                        </button> 
                    </form>
                )
            }
            <ul>
                {vehicles&&populateVehicles()}
            </ul>
        </>
    )
}

export default VehicleContainer
