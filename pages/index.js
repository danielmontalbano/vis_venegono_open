import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from 'axios';
import Giocatore from '../components/Giocatore';

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
