import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const NotePage = () => {

    const {noteId} = useParams()
    const navigate = useNavigate()
    let [note, setNote] = useState(null)

    useEffect(() => {
        if(noteId){getNote()}
    }, [noteId])

    let getNote = async ()=> {
        if (noteId === 'new') return
        let response = await fetch(`/api/note/${noteId}/`)
        let data = await response.json()
        console.log("DATA:", data)
        setNote(data)
    }

    let updateNote = async () => {
      fetch(`/api/note/${noteId}/update/`,{
        method: "PUT",
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify(note)
      })
    }

    let createNote = async () => {
      fetch(`/api/note/create/`,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body:JSON.stringify(note)
      })
    }

    let deleteNote = async () => {
      fetch(`/api/note/${noteId}/delete/`,{
        method: "DELETE",
        headers:{
          'Content-type': 'application/json'
        }
      })
      navigate('/')
    }

    let handleSubmit = ()=>
    {
      if(noteId !== 'new' && note.body === ''){
        deleteNote()
      }else if(noteId !== 'new'){
        updateNote() 
      }else if(noteId === 'new' && note.body !== null){
        createNote()
      }
      navigate('/')
    }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit}/>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ): (
          <button onClick={handleSubmit}>Done</button>
        )}
              
      </div>
       <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage