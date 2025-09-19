import readline from "readline";
import { rl } from "./menu.js";
import { parseFecha } from "./menu.js";
import { mostrarListado } from "./mostrarListado.js";
export function menuDetallesTarea(tarea, filtro, orden) {
  console.log(`
¿Qué deseas hacer con la tarea "${tarea.titulo}"?

[1] Cambiar Estado
[2] Editar Fecha de Vencimiento
[3] Editar Descripción
[4] Editar Dificultad
[0] Volver
`);
  rl.question("> ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("Nuevo estado ([P]endiente, [E]n curso, [T]erminada, [C]ancelada): ", (est) => {
          tarea.setEstado(est);
          console.log("✅ Estado actualizado.\n");
          mostrarListado(filtro, orden);
        });
        break;

      case "2":
        rl.question("Nueva fecha de vencimiento (D-M-YYYY o 0 para eliminar): ", (nuevaFecha) => {
          if (nuevaFecha === "0") {
            tarea.setVencimiento(null);
            console.log("✅ Fecha de vencimiento eliminada.\n");
          } else {
            const fechaParsed = parseFecha(nuevaFecha);
            if (!fechaParsed) {
              console.log("❌ Fecha inválida. No se actualizó.\n");
            } else {
              tarea.setVencimiento(fechaParsed);
              console.log("✅ Fecha actualizada.\n");
            }
          }
          mostrarListado(filtro, orden);
        });
        break;

      case "3":
        rl.question("Nueva descripción: ", (nuevaDesc) => {
          tarea.descripcion = nuevaDesc.substring(0, 500);
          tarea.ultimaEdicion = new Date();
          console.log("✅ Descripción actualizada.\n");
          mostrarListado(filtro, orden);
        });
        break;

      case "4":
        console.log(`
Selecciona la nueva dificultad:
[1] Fácil
[2] Medio
[3] Difícil
`);
        rl.question("> ", (dif) => {
          const nuevaDificultad = tarea.parsearDificultad(parseInt(dif));
          tarea.dificultad = nuevaDificultad;
          tarea.ultimaEdicion = new Date();
          console.log("✅ Dificultad actualizada.\n");
          mostrarListado(filtro, orden);
        });
        break;

      case "0":
        mostrarListado(filtro, orden);
        break;

      default:
        console.log("❌ Opción inválida.\n");
        menuDetallesTarea(tarea, filtro, orden);
    }
  });
}