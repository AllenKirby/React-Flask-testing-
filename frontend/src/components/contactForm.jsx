import { useState } from "react"
import PropTypes from 'prop-types';

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) =>{
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if(response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        }
        else{
            updateCallback()
        }
    }

  return (
    <form onSubmit={onSubmit}>
        <div className="py-2">
            <label className="mr-2 text-2xl text-cyan-900" htmlFor="firstName">First Name:</label>
            <input className="ml-2 text-2xl text-cyan-900 px-1 py-2 outline-none border-b-2 border-cyan-900" type="text" id="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
        </div>
        <div>
            <label className="mr-2 text-2xl text-cyan-900" htmlFor="lastName">Last Name:</label>
            <input className="ml-2 text-2xl text-cyan-900 px-1 py-2 outline-none border-b-2 border-cyan-900" type="text" id="lastName" required value={lastName} onChange={e => setLastName(e.target.value)}/>
        </div>
        <div>
            <label className="mr-2 text-2xl text-cyan-900" htmlFor="email">Email:</label>
            <input className="ml-2 text-2xl text-cyan-900 px-1 py-2 outline-none border-b-2 border-cyan-900" type="text" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="w-full flex items-center justify-center pt-4">
            <button className="text-xl text-cyan-900 font-bold border-2 border-cyan-900 py-2 px-4 rounded-xl hover:text-white hover:bg-cyan-900 hover:scale-110 transition-all duration-200" type="submit">{updating ? "Update" : "Create Contact"}</button>
        </div>

    </form>
  )
}

ContactForm.propTypes = {
    existingContact: PropTypes.object,
    updateCallback: PropTypes.func.isRequired
};

export default ContactForm