import Head from 'next/head';
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from 'axios';
import Giocatore from '../components/Giocatore';
import Header from '../components/Header';

export default function Home() {
  const [convocazioni, setConvocazioni] = useState([]);

  useEffect(() => {
    // Effettua una richiesta API per ottenere le convocazioni
    const fetchConvocazioni = async () => {
      const response = await fetch("/api/convocazioni");
      if (response.ok) {
        const data = await response.json();
        setConvocazioni(data);
      }
    };

    fetchConvocazioni();
  }, []);

  const handleConvocazioneChange = (numero, newConvocato) => {
    // Aggiorna lo stato locale delle convocazioni
    setConvocazioni((prevConvocazioni) =>
      prevConvocazioni.map((giocatore) =>
        giocatore.numero === numero
          ? { ...giocatore, convocato: newConvocato === "true" }
          : giocatore
      )
    );
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Convocazioni della squadra di calcio
          </h1>
          {convocazioni.map((giocatore) => (
            <Giocatore
              key={giocatore.numero}
              numero={giocatore.numero}
              nome={giocatore.nome}
              convocato={giocatore.convocato}
              onConvocazioneChange={handleConvocazioneChange}
            />
          ))}
        </div>
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}
