import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../constraints';
import { VictoryBar, VictoryChart, VictoryAxis,  VictoryTheme} from 'victory';
import './Home.css'

function Home() {
    const [dataToGraph, setDataToGraph]=useState(null)

    //READ TRIPS
    useEffect(() => {
        fetch(BASE_URL +`/trips`)
            .then(r=>r.json())
            //.then(setTrips)
            .then(resp =>createData(resp))
    }, []);

    //READ ORDERS

    //DATA FOR VICTORY
    function createData(trips){        
        let dataToGraph=[]
        if(trips){
            trips.map(trip=>{
                let findCompany = dataToGraph.find(element=>element.company_name === trip.transport_company.name)     
                if(findCompany){
                  return findCompany.trips=findCompany.trips+1
                }else{
                   return dataToGraph.push({company_name:trip.transport_company.name, trips:1})
                }        
            })
        }
        setDataToGraph(dataToGraph)        
    }

    function populateTableData(){
        return(dataToGraph.map(data =><tr><td>{data.company_name.substring(2,4)}-{data.company_name}</td><td>{data.trips}</td></tr>))
    }
    
    
    
    return ( 
        <div className="container pt-5">
        {
            dataToGraph&&(
                <div className="row">
                    <div className="col">
                        <div className="graph-container">
                            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                                <VictoryAxis
                                label="Transport Company" style={{axisLabel: { padding: 30 }}} 
                                
                                tickFormat={(x) => x.substring(2,4)}
                                />
                                <VictoryAxis
                                dependentAxis
                                label="Assigned Trips" style={{axisLabel: { padding: 35 }}}                            
                                />
                                <VictoryBar data={dataToGraph} x="company_name" y="trips" />
                            </VictoryChart>  
                        </div>
                    </div>
                    <div className="col">   
                        <table className="">
                            <tr>
                                <th>Company</th>
                                <th>Trips</th>
                            </tr>
                            {dataToGraph&&populateTableData()}            
                        </table>
                    </div>
                </div>
            )
        }    
        


        </div>   
    )
}

export default Home
