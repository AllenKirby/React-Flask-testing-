import { useEffect, useState } from "react"
import ContactList from "./components/contactList"
import ContactForm from "./components/contactForm"

function App() {
  const [contact, setContact] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(()=>{
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const reponse = await fetch("http://127.0.0.1:5000/contacts");
    const data = await reponse.json();

    setContact(data.contacts)
    console.log(data.contacts)
  }

  const closeModal = () =>{
    setIsModalOpen(false);
    setCurrentContact({})
  }

  const openCreateModal = () =>{
    if(!isModalOpen) setIsModalOpen(true);
  }

  const openEditModal = (contact)=>{
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () =>{
    closeModal()
    fetchContacts()
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <section className="w-auto h-auto">
        <ContactList contacts={contact} updateContact={openEditModal} updateCallback={onUpdate}/>
        <div className="w-full px-5 py-2 flex items-center justify-center">
          <button className="text-xl text-cyan-900 font-bold border-2 border-cyan-900 py-2 px-4 rounded-xl hover:text-white hover:bg-cyan-900 hover:scale-110 transition-all duration-200" onClick={openCreateModal}>Create New Contact</button>
        </div>
        { isModalOpen && <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="w-auto h-auto p-7 rounded-2xl bg-white shadow-black shadow-xl border-2 border-cyan-900">
            <button className="w-full px-5 py-2 text-cyan-900 text-3xl font-bold" onClick={closeModal}>x</button>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
        }
      </section>
    </main>
  )
}

export default App
