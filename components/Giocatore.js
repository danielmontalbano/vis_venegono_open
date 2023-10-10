import {FC} from "react"
import { useState } from "react";

const Giocatore = ({ numero, nome, convocato, onConvocazioneChange }) => {
   const [isEditing, setIsEditing] = useState(false);
   const [newConvocato, setNewConvocato] = useState(convocato);

   const handleEditClick = () => {
     setIsEditing(true);
   };

   const handleSaveClick = async () => {
     // Esegui una richiesta API per aggiornare la convocazione del giocatore
     const response = await fetch("/api/updateConvocazioni", {
       method: "POST",
       body: JSON.stringify({ numero, convocato: newConvocato }),
       headers: {
         "Content-Type": "application/json",
       },
     });

     if (response.status === 200) {
       onConvocazioneChange(numero, newConvocato);
       setIsEditing(false);
     }
   };

   const handleCancelClick = () => {
     setIsEditing(false);
     setNewConvocato(convocato);
   };
  return (
    <div className="p-4 border rounded-md shadow-md bg-blue-500 text-white">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          #{numero} {nome}
        </p>
        {convocato === "true" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-check-circle-fill text-green-500"
            viewBox="0 0 16 16"
          >
            <path d="M5.293 10.293a1 1 0 0 1-1.497-1.32l.083-.094 3-3a1 1 0 0 1 1.32-.083l.094.083 5 5a1 1 0 1 1-1.414 1.414l-4.293-4.293-2.293 2.293a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094 3-3z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x-circle-fill text-red-500"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a7 7 0 0 0 0 14A7 7 0 0 0 8 1zM7 4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0V4zm0 6a1 1 0 0 1 1-1 1 1 0 0 1-1 1z" />
          </svg>
        )}
      </div>

      {isEditing ? (
        <div>
          <label className="block mb-1">Convocato:</label>
          <select
            className="border rounded-md p-2"
            value={newConvocato}
            onChange={(e) => setNewConvocato(e.target.value)}
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
          <button
            className="btn bg-orange-500 text-white"
            onClick={handleSaveClick}
          >
            Salva
          </button>
          <button className="btn ml-2" onClick={handleCancelClick}>
            Annulla
          </button>
        </div>
      ) : (
        <div>
          <p>Convocato: {convocato === "true" ? "Sì" : "No"}</p>
          <button
            className="btn bg-orange-500 text-white mt-2"
            onClick={handleEditClick}
          >
            Modifica
          </button>
        </div>
      )}
    </div>
  );
};

export default Giocatore;
