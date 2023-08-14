import { useState, useEffect } from "react";
import "./App.css";

const matriz: number[][] = [
  [2, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 0, 1],
  [3, 0, 0, 1],
];

export const LaberintoApp = () => {
  const [laberinto, setLaberinto] = useState({
    fila: 0,
    columna: 0,
  });

  const longitudFilas = matriz.length;
  const logitudColumnas = matriz[0].length;

  useEffect(() => {
    const flechas = (event: KeyboardEvent) => {
      let nuevaFila = laberinto.fila;
      let nuevaColumna = laberinto.columna;

      switch (event.key) {
        case "ArrowUp":
          nuevaFila = Math.max(0, laberinto.fila - 1);
          console.log("arriba");
          break;
        case "ArrowDown":
          console.log("abajo");
          nuevaFila = Math.min(longitudFilas - 1, laberinto.fila + 1);
          break;
        case "ArrowLeft":
          nuevaColumna = Math.max(0, laberinto.columna - 1);
          console.log("izquierda");
          break;
        case "ArrowRight":
          nuevaColumna = Math.min(logitudColumnas - 1, laberinto.columna + 1);
          console.log("derecha");
          break;
        default:
          return;
      }

      if (matriz[nuevaFila][nuevaColumna] !== 1) {
        setLaberinto({ fila: nuevaFila, columna: nuevaColumna });
      }
    };

    window.addEventListener("keydown", flechas);

    return () => {
      window.removeEventListener("keydown", flechas);
    };
  }, [laberinto, logitudColumnas, longitudFilas]);

  return (
    <div className="App">
      <div className="laberinto">
        {matriz.map((fila, filaIndice) => (
          <div key={filaIndice} className="laberinto-fila">
            {fila.map((celda, columnaIndice) => (
              <div
                key={columnaIndice}
                className={`celda ${celda === 1 ? "pared" : ""} ${
                  laberinto.fila === filaIndice &&
                  laberinto.columna === columnaIndice
                    ? "jugador"
                    : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
