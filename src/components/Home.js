import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../constraints';
import { VictoryBar, VictoryChart, VictoryAxis,  VictoryTheme, VictoryLabel } from 'victory';

function Home() {
    //const [trips, setTrips]=useState(null)
    const [dataToGraph, setDataToGraph]=useState(null)

    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            //.then(setTrips)
            .then(resp =>createData(resp))
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

        console.log(dataToGraph)
    }

    
    
    
    return (     
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis
            label="Transport Company" style={{axisLabel: { padding: 30 }}} 
            />
            <VictoryAxis
            dependentAxis
            label="Trips" style={{axisLabel: { padding: 30 }}}
            // tickFormat specifies how ticks should be displayed
            //tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar data={dataToGraph} x="company_name" y="trips" />
        </VictoryChart>           
    )
}

export default Home
