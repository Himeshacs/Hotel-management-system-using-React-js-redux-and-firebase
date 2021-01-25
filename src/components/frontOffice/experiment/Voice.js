import { Button } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new speechRecognition();

mic.contiguous = true;
mic.interimResults = true
mic.lang = "en-US"

function Voice(){

     const [isListening, setIsLisening] = useState(false)
     
     const [note, setIsNote] = useState(null)
     const [savedNotes, setSavedNotes] = useState([])
     useEffect(() => {
        handleListen()
     }, [isListening])

     const handleSaveNote = () => {
         console.log("save")
     }
     const handleListen = () => {
         if(isListening){
             mic.start()
             mic.onend = () =>{
                 console.log("continue")
                 mic.start()
             }
         }
         else{
             mic.stop()
             mic.onend = () => {
                 console.log("Mic stopped")
             }
         }
         mic.onstart = () => {
             console.log("mic is on")
         } 
         mic.onresult = event => {
            const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')
                    console.log(transcript)
                    setSavedNotes( transcript)
            mic.onerror = error => {
                console.log(error.error)
            }
         }
     }


          
    return(
        <div>
            <h1>voice</h1>
            {isListening ? "listening" : "Not Listening"}
            <Button onClick={handleSaveNote} disabled={!note}>Save</Button>
            <Button onClick={() => setIsLisening(prevState => !prevState)}>start</Button>
            <h1>{savedNotes}</h1>
        </div>
    )
}

export default Voice