import React, {useEffect, useState} from 'react'
import { BASE_URL } from "../constraints/index"
import TransportCompany from './TransportCompany';

function TransportCompanyContainer() {
    const [companies, setCompanies]=useState(null)
    const [toggle, setToggle]=useState(false)    
    const [newItem, setNewItem]=useState({name:""})
    
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


    //CREATE A NEW COMPANY
    function handleSubmit(e){
        e.preventDefault()        
        
        fetch(BASE_URL +`/transport_companies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
            .then(r=>r.json())
            .then(resp=>setCompanies([...companies,resp]))
                
        setToggle(!toggle)
        setNewItem({name:""})
    } 

    //UPDATE COMPANY
    function onEdit(updatedItem){
        
        fetch(BASE_URL + `/transport_companies/${updatedItem.id}`, {
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
        
        fetch(BASE_URL + `/transport_companies/${deletedCompany.id}`, {
            method: "DELETE",
        })
        
        let updatedCompany = companies.filter(company=>company.id !== deletedCompany.id)
        setCompanies(updatedCompany)
    }


    //POPULATE COMPANIES
    function populateCompanies(){        
        return (companies.map(company =><tr><TransportCompany key={company.id} company={company} onDelete={onDelete} onEdit={onEdit}/></tr>))
    }

    return (
        <div className="pt-5">
            <button onClick={()=>setToggle(!toggle)} className="btn btn-outline-dark">New Company</button>
            {
                toggle&&(
                    <form onSubmit={handleSubmit}>
                        Company Name:
                        <input type="text" name="name" value={newItem.name} onChange={handleInputChange}/>                        
                        <button type="submit">
                            Create New Company
                        </button> 
                    </form>
                )
            }
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Company ID</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Vehicles</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {companies&&populateCompanies()}
                </tbody>
                
            </table>
        </div>
    )
}

export default TransportCompanyContainer
