import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../constraints';

function Home() {
    const [trips, setTrips]=useState(null)
    const [dataToGraph, setDataToGraph]=useState([])

    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            .then(setTrips)
    }, []);

    //DATA FOR VICTORY
    function createData(trips){        
        let dataToGraph=[]
        if(trips){
            trips.map(trip=>{
                let findCompany = dataToGraph.find(element=>element.company_name === trip.transport_company.name)     
                if(findCompany){
                    findCompany.trips=findCompany.trips+1
                }else{
                    dataToGraph.push({company_name:trip.transport_company.name, trips:1})
                }        
            })
        }
        setDataToGraph(dataToGraph)
    }

    createData(trips);

    
    
    return (        
        <div>
            
            Home
        </div>
    )
}

export default Home
