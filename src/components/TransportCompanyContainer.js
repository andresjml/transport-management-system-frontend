import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../constraints/index"
import TransportCompany from './TransportCompany';

function TransportCompanyContainer() {
    const [companies, setCompanies]=useState(null)
    
    //READ COMPANIES
    useEffect(() => {
        fetch(BASE_URL +`/transport_companies`)
            .then(r=>r.json())
            .then(setCompanies)
    }, []);

    //POPULATE COMPANIES
    function populateCompanies(){        
        return (companies.map(company => <TransportCompany key={company.id} company={company}/>))
    }


    return (
        <>
        <ul>
            {companies&&populateCompanies()}
        </ul>
        </>
    )
}

export default TransportCompanyContainer
