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
    <div className="mb-4 p-4 border rounded-md shadow-md">
      <p className="text-xl font-bold mb-2">Giocatore #{numero}</p>
      <p className="mb-2">Nome: {nome}</p>

      {isEditing ? (
        <div>
          <label className="block mb-1">Convocato:</label>
          <select
            className="border rounded-md p-2"
            value={newConvocato}
            onChange={(e) => setNewConvocato(e.target.value)}
          >
            <option value="true">Sì</option>
            <option value="false">No</option>
          </select>
          <button className="btn" onClick={handleSaveClick}>
            Salva
          </button>
          <button className="btn ml-2" onClick={handleCancelClick}>
            Annulla
          </button>
        </div>
      ) : (
        <div>
          <p>Convocato: {convocato ? "Sì" : "No"}</p>
          <button className="btn mt-2" onClick={handleEditClick}>
            Modifica
          </button>
        </div>
      )}
    </div>
  );
};

export default Giocatore;
