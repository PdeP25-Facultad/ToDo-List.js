import readline from "readline";
import ToDoList from "./todoList.js";
import Tarea from "./tarea.js";
import { menuVerMisTareas } from "./menuVerMisTareas.js";
import { mostrarListado} from "./mostrarListado.js";
import { menuDetallesTarea } from "./menuDetallesTareas.js";
 
// ===============================
// Función para parsear y validar fecha
// ===============================
export function parseFecha(fecha) {

  if (!fecha) return null;
  const partes = fecha.split(/[-/]/);
  if (partes.length !== 3) return null;
  let [dia, mes, anio] = partes.map((p) => parseInt(p));
  if (isNaN(dia) || isNaN(mes) || isNaN(anio)) return null;

  const date = new Date(anio, mes - 1, dia);
  if (date.getFullYear() !== anio || date.getMonth() !== mes - 1 || date.getDate() !== dia) {
    return null;
  }

  return date;
}

// ===============================
// Menú interactivo
// ===============================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export { rl };
export const lista = new ToDoList();
export function menuPrincipal() {

  console.log(`
=== GESTOR DE TAREAS ===

[1] Ver Mis Tareas
[2] Buscar una Tarea
[3] Agregar una Tarea
[0] Salir
`);
  rl.question("> ", (opcion) => {
    switch (opcion) {
      case "1": menuVerMisTareas(); break;
      case "2": buscarTarea(); break;
      case "3": agregarTarea(); break;
      case "0": console.log("👋 Hasta luego!"); rl.close(); break;
      default: console.log("❌ Opción inválida.\n"); menuPrincipal();
    }
  });
}

menuVerMisTareas();

mostrarListado();

function buscarTarea() {
  rl.question("🔍 Ingresa el título a buscar: ", (texto) => {
    const resultados = lista.tareas.filter((t) =>
      t.titulo.toLowerCase().includes(texto.toLowerCase())
    );
    if (resultados.length === 0) {
      console.log("⚠️ No se encontraron tareas.\n");
    } else {
      console.log("Resultados:");
      resultados.forEach((t, i) => console.log(`[${i + 1}] ${t.titulo}`));
    }
    menuPrincipal();
  });
}

function agregarTarea() {
  console.log("\n=== AGREGAR NUEVA TAREA ===\n");

  rl.question("📌 Título: ", (titulo) => {
    if (!titulo) {
      console.log("❌ El título es obligatorio.");
      return agregarTarea();
    }

    rl.question("📝 Descripción (opcional): ", (descripcion) => {
      rl.question("⏳ Vencimiento (D-MM-YYYY o D/MM/YYYY, opcional): ", (fecha) => {
        const fechaValida = parseFecha(fecha);
        if (fecha && !fechaValida) {
          console.log("❌ Fecha ingresada inválida. Se guardará como No definido.");
        }

        console.log(`
💪 Dificultad:
[1] Fácil
[2] Medio
[3] Difícil
[0] Volver al Menú Principal
        `);
        rl.question("> ", (dif) => {
          if (dif === "0") return menuPrincipal();
          const dificultad = parseInt(dif) || 1;

          console.log(`
🔖 Estado:
[P] Pendiente
[E] En Curso
[T] Terminada
[C] Cancelada
[0] Volver al Menú Principal
          `);
          rl.question("> ", (est) => {
            if (est === "0") return menuPrincipal();

            const tarea = new Tarea(
              titulo,
              descripcion || "",
              fechaValida,
              dificultad
            );
            tarea.setEstado(est);
            lista.tareas.push(tarea);

            console.log(`\n✅ Tarea "${titulo}" guardada correctamente.\n`);
            rl.question("Presiona Enter para volver al Menú Principal...", () => {
              menuPrincipal();
            });
          });
        });
      });
    });
  });
}