import Tarea from "./tarea.js";

class ToDoList {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(titulo, descripcion = "", vencimiento = null, dificultad = 1) {
    const tarea = new Tarea(titulo, descripcion, vencimiento, dificultad);
    this.tareas.push(tarea);
    console.log(`✅ Tarea "${titulo}" creada con éxito.\n`);
  }

  listarTareas(filtro = "Todas") {
    switch (filtro) {
      case "Pendiente": return this.tareas.filter((t) => t.estado === "Pendiente");
      case "En Curso": return this.tareas.filter((t) => t.estado === "En Curso");
      case "Terminada": return this.tareas.filter((t) => t.estado === "Terminada");
      case "Cancelada": return this.tareas.filter((t) => t.estado === "Cancelada");
      default: return this.tareas;
    }
  }
}
export default ToDoList;  