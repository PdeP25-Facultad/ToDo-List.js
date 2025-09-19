import { menuPrincipal, lista } from "./menu.js";
import Tarea from "./tarea.js";
// DEMO inicial: sin fechas de vencimiento
lista.agregarTarea("Aprender HTML", "Primer paso en desarrollo web", null, 2);
lista.agregarTarea("Aprender CSS", "Para estilos y diseño", null, 1);
lista.agregarTarea("Aprender JavaScript", "Para lógica y dinámicas", null, 3);
lista.agregarTarea("Aprender React", "Para construir interfaces interactivas con componentes", null, 3);
lista.agregarTarea("Revisar roadmap.sh", "Revisar el roadmap de desarrollo actualizado", null, 2);



// ===============================
// Iniciar app
// ===============================
menuPrincipal();  

