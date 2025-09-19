import { menuVerMisTareas } from "./menuVerMisTareas.js";
import { menuPrincipal, lista } from "./menu.js";
import { rl } from "./menu.js";
import { menuDetallesTarea } from "./menuDetallesTareas.js";

export function mostrarListado(filtro, orden) {
  let tareas = lista.listarTareas(filtro);

  if (tareas.length === 0) {
    console.log("⚠️ No hay tareas en esta categoría.\n");
    return menuVerMisTareas();
  }

  switch (orden) {
    case "1": tareas.sort((a, b) => a.titulo.localeCompare(b.titulo)); break;
    case "2": tareas.sort((a, b) => (!a.vencimiento ? 1 : !b.vencimiento ? -1 : a.vencimiento - b.vencimiento)); break;
    case "3": tareas.sort((a, b) => a.creacion - b.creacion); break;
  }

  console.log(`Estas son tus tareas (${filtro}):`);
  tareas.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));

  console.log(`
¿Deseas ver los detalles de alguna?
Introduce el número para verla o 0 para volver.
`);
  rl.question("> ", (opcion) => {
    const num = parseInt(opcion);
    if (num === 0) return menuVerMisTareas();
    if (num > 0 && num <= tareas.length) {
      console.log(tareas[num - 1].mostrarDetalle());
      menuDetallesTarea(tareas[num - 1], filtro, orden);
    } else {
      console.log("❌ Opción inválida.\n");
      mostrarListado(filtro, orden);
    }
  });
}
