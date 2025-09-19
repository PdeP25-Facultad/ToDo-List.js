import { mostrarListado } from "./mostrarListado.js";
import { menuPrincipal } from "./menu.js";
import readline from "readline";
import { rl } from "./menu.js";

export function menuVerMisTareas() {
  console.log(`
¿Qué tareas deseas ver?

[1] Todas
[2] Pendientes
[3] En curso
[4] Terminadas
[5] Canceladas
[0] Volver
`);
  rl.question("> ", (opcion) => {
    let filtro = null;
    switch (opcion) {
      case "1": filtro = "Todas"; break;
      case "2": filtro = "Pendiente"; break;
      case "3": filtro = "En Curso"; break;
      case "4": filtro = "Terminada"; break;
      case "5": filtro = "Cancelada"; break;
      case "0": return menuPrincipal();
      default: console.log("❌ Opción inválida.\n"); return menuVerMisTareas();
    }

    rl.question(`
¿Deseas ordenar las tareas?
[1] Alfabético (A-Z)
[2] Fecha de vencimiento ascendente
[3] Fecha de creación ascendente
[0] No ordenar
> `, (orden) => {
      mostrarListado(filtro, orden);
    });
  });
}

