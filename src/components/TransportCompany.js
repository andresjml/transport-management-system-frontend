import React, {useState} from 'react'

function TransportCompany({company, onDelete, onEdit}) {
    const [toggle, setToggle]=useState(false)
    const [updatedItem, setUpdatedItem]=useState({...company})

    //HANDLE INPUT CHANGE
   function handleInputChange(event) {
        setUpdatedItem({
            ...updatedItem, 
            [event.target.name]:event.target.value
        })  
    }

    //HANDLE SUBMIT
    function handleSubmit(e){
        e.preventDefault()
        onEdit(updatedItem);
        setToggle(!toggle)
    }



    return (
        <>
            {company&&(
                <li>
                <br/>
                Company Name:{company.name}|Vehicles: {company.vehicles.length > 0?company.vehicles.length:"None"}
                <br/>
                <button onClick={()=>setToggle(!toggle)}>Update Company</button>        
                <button onClick={()=>onDelete(company)}>Delete</button>
                </li>
            )}
            {
                toggle&&(
                    <form onSubmit={handleSubmit}>
                        <label >First name:</label>
                        <input type="text" name="name" value={updatedItem.name} onChange={handleInputChange}/>             
                        <button type="submit">
                            Modify Company
                        </button> 
                    </form>
                )
            }
            
        </>
    )
}

export default TransportCompany
