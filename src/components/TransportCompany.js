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
                <>
                    <td>
                        {company.id}
                    </td>
                    <td>
                        {company.name}
                    </td>
                    <td>
                        {company.vehicles.length > 0?company.vehicles.length:"None"}
                    </td>  


                    <td>
                        <button onClick={()=>setToggle(!toggle)} class="btn btn-outline-dark">Update Company</button>
                    </td>
                    {toggle&&(<td>
                                <form onSubmit={handleSubmit}>
                                    <label >Company Name:</label>
                                    <input type="text" name="name" value={updatedItem.name} onChange={handleInputChange}/>             
                                    <button type="submit" class="btn btn-outline-dark">
                                        Modify Company
                                    </button> 
                                </form>
                            </td>
                        )}
                    <td>
                        <button onClick={()=>onDelete(company)} class="btn btn-outline-dark">Delete</button>
                    </td>

                </>
            )}
        </>
    )
}

export default TransportCompany
