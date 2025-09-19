class Tarea {
  constructor(titulo, descripcion = "", vencimiento = null, dificultad = 1) {
    if (!titulo || titulo.length > 100) {
      throw new Error("El título es obligatorio y debe tener hasta 100 caracteres.");
    }

    this.titulo = titulo;
    this.descripcion = descripcion.substring(0, 500);
    this.estado = "Pendiente";
    this.creacion = new Date();
    this.ultimaEdicion = new Date();
    this.vencimiento = vencimiento ? vencimiento : null;
    this.dificultad = this.parsearDificultad(dificultad);
  }

  parsearDificultad(valor) {
    const mapa = { 1: "Fácil", 2: "Medio", 3: "Difícil" };
    if (typeof valor === "number") return mapa[valor] || "Fácil";
    if (typeof valor === "string") {
      const v = valor.toLowerCase();
      if (["fácil", "facil", "f"].includes(v)) return "Fácil";
      if (["medio", "m"].includes(v)) return "Medio";
      if (["difícil", "dificil", "d"].includes(v)) return "Difícil";
    }
    return "Fácil";
  }

  setEstado(nuevo) {
    const estados = {
      P: "Pendiente",
      E: "En Curso",
      T: "Terminada",
      C: "Cancelada",
    };
    if (estados[nuevo.toUpperCase()]) {
      this.estado = estados[nuevo.toUpperCase()];
      this.ultimaEdicion = new Date();
    }
  }

  setVencimiento(nuevaFecha) {
    this.vencimiento = nuevaFecha;
    this.ultimaEdicion = new Date();
  }

  mostrarDetalle() {
    const dificultadEmoji = {
      "Fácil": "⭐",
      "Medio": "⭐⭐",
      "Difícil": "⭐⭐⭐",
    };
    return `
📌 ${this.titulo}
📝 ${this.descripcion || "(Sin descripción)"}
📅 Creación: ${this.creacion.toLocaleString()}
⏳ Vencimiento: ${this.vencimiento ? this.vencimiento.toLocaleDateString() : "No definido"}
🔖 Estado: ${this.estado}
💪 Dificultad: ${this.dificultad} ${dificultadEmoji[this.dificultad]}
✏️ Última edición: ${this.ultimaEdicion.toLocaleString()}
    `;
  }
}
export default Tarea;  
