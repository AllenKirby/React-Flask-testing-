import PropTypes from 'prop-types';

const ContactList = ({ contacts, updateContact, updateCallback  }) => {
    const onDelete =  async (id) =>{
        try{
            const options = {
                method: "DELETE"
            }
            const response = await fetch (`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if(response.status === 200){
                updateCallback()
            }
            else{
                console.log("Failed to delete")
            }
        }
        catch(error){
            alert(error)
        }
        
    }
    
    return (
        <div className='text-center w-auto h-auto'>
            <h2 className='text-3xl text-cyan-900 font-bold'>Contacts</h2>
            <table className='border-collapse border-2 border-cyan-900'>
                <thead>
                    <tr>
                        <th className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>First Name</th>
                        <th className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>Last Name</th>
                        <th className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>Email</th>
                        <th className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>{contact.firstName}</td>
                            <td className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>{contact.lastName}</td>
                            <td className='border border-slate-300 px-4 py-2 text-cyan-900 text-xl'>{contact.email}</td>
                            <td className='border border-slate-300 px-4 py-2'>
                                <button className="text-lg text-cyan-900 font-bold border-2 border-cyan-900 mx-2 py-1 px-4 rounded-xl hover:text-white hover:bg-cyan-900 hover:scale-110 transition-all duration-200" onClick={()=> updateContact(contact)}>Update</button>
                                <button className="text-lg text-cyan-900 font-bold border-2 border-cyan-900 mx-2 py-1 px-4 rounded-xl hover:text-white hover:bg-cyan-900 hover:scale-110 transition-all duration-200" onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
    updateContact: PropTypes.func.isRequired,
    updateCallback: PropTypes.func.isRequired
};

export default ContactList;
