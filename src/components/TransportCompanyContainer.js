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
        return (companies.map(company => <TransportCompany key={company.id} company={company} onDelete={onDelete} onEdit={onEdit}/>))
    }

    //UPDATE COMPANY
    function onEdit(updatedItem){
        
        fetch(BASE_URL + `transport_companies/${updatedItem.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          })

          const updatedCompanies = companies.map((c) => {
            if (c.id === updatedItem.id) return updatedItem;
            return c;
          });
          setCompanies(updatedCompanies);
    }

    //DELETE COMPANY
    function onDelete(deletedCompany){
        
        fetch(BASE_URL + `transport_companies/${deletedCompany.id}`, {
            method: "DELETE",
        })
        
        let updatedCompany = companies.filter(company=>company.id !== deletedCompany.id)
        setCompanies(updatedCompany)
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
