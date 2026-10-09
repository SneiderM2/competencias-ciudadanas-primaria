# 🕊️ Ciudadanos del Futuro: Competencias Ciudadanas en Primaria (Colombia)

> **Plataforma educativa web interactiva, gamificada y 100% estática para la enseñanza de las Competencias Ciudadanas en Educación Primaria (Grados 1° a 5°).**  
> Diseñada para despliegue inmediato y gratuito en **GitHub Pages**.

---

## 🏛️ Marco Normativo y Pedagógico Colombiano

Esta plataforma fue desarrollada bajo los lineamientos oficiales del sistema educativo colombiano:

1. **Estándares Básicos de Competencias Ciudadanas (Guía N° 6 - Ministerio de Educación Nacional de Colombia):**
   - **Convivencia y Paz:** Manejo de emociones, autorregulación, empatía, rechazo a la violencia y el perdón.
   - **Participación y Responsabilidad Democrática:** Gobierno Escolar (Personero de los Estudiantes y Consejo Estudiantil según Ley 115 de 1994), votación consciente y acuerdos colectivos de aula.
   - **Pluralidad, Identidad y Valoración de las Diferencias:** Reconocimiento de la diversidad étnica y cultural de Colombia (Art. 7 de la Constitución Política), inclusión y prevención de la discriminación.

2. **Ley de Convivencia Escolar (Ley 1620 de 2013) y Decreto 1965 de 2013:**
   - Enfoque en la **Ruta de Atención Integral** (Promoción, Prevención, Atención y Seguimiento).
   - Abordaje formativo y mediado de **Situaciones Tipo I** (conflictos cotidianos del recreo y aula).
   - Prevención activa del acoso escolar (*bullying*) y del ciberacoso.

3. **Enfoque Pedagógico Infantil (6 a 11 años):**
   - Aprendizaje activo, ludificación (*gamificación*), pedagogía del afecto, estudio de casos de la cotidianidad escolar colombiana y dilemas morales acordes a la etapa evolutiva.

---

## 🚀 Despliegue en GitHub Pages (Paso a Paso)

La plataforma es **100% estática** (no requiere Node.js, compilación ni bases de datos en servidor):

1. Sube los archivos del proyecto a un repositorio de GitHub (público o privado):
   - `index.html`
   - `styles.css`
   - `data.js`
   - `audio.js`
   - `app.js`
   - `README.md`
2. En GitHub, ve a **Settings** (Configuración) de tu repositorio.
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En **Build and deployment > Source**, selecciona `Deploy from a branch`.
5. En **Branch**, selecciona la rama principal `main` (o `master`) y la carpeta `/ (root)`.
6. Haz clic en **Save** (Guardar).
7. ¡Listo! En 1 a 2 minutos, GitHub te entregará la URL pública:  
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`

---

## 📂 Estructura del Proyecto

```text
├── index.html     # Estructura semántica, accesible y responsiva (Tailwind CSS CDN + FontAwesome)
├── styles.css     # Estilos de diseño infantil, efectos 3D, botones Kahoot y reglas para impresión de diplomas
├── data.js        # Banco de datos pedagógico (Estándares MEN, preguntas Kahoot, casos y videos)
├── audio.js       # Motor de sonido sintetizado Web Audio API (100% autónomo, sin MP3 externos)
├── app.js         # Lógica interactiva, control de estado (localStorage), Kahoot y generador de diplomas
└── README.md      # Documentación pedagógica y técnica
```

---

## 🛠️ Guía para Docentes: ¿Cómo Personalizar el Contenido?

Todo el contenido pedagógico está centralizado en el archivo `data.js` con comentarios en español.

### 1. Agregar o modificar preguntas del Desafío Kahoot!
Abre `data.js` y busca la sección `kahootQuizzes`. Puedes agregar preguntas en `exploradores` (1°-3°) o `lideres` (4°-5°):

```javascript
{
  id: "mi-nueva-pregunta",
  pilar: "Convivencia y Paz",
  situacion: "Un compañero rompe tu lápiz favorito por accidente.",
  pregunta: "¿Qué acción promueve la paz?",
  tiempo: 20, // Segundos para responder
  opciones: [
    { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Gritarle y quitarle su cartuchera." },
    { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Expresar tu molestia con calma y pedirle que te ayude a repararlo." },
    { shape: "circle", color: "bg-amber-500", icon: "●", text: "Llorar en silencio sin decirle a nadie." },
    { shape: "square", color: "bg-emerald-600", icon: "■", text: "Pagarle con la misma moneda." }
  ],
  correctIndex: 1, // Índice de la opción correcta (0 a 3)
  explicacion: "El diálogo asertivo y la reparación de daños fortalecen la confianza y evitan la violencia."
}
```

### 2. Agregar videos educativos de YouTube
En `data.js`, en la sección `videos`, agrega un nuevo objeto con el identificador del video de YouTube:

```javascript
{
  id: "v5",
  youtubeId: "TU_ID_DE_YOUTUBE", // Ejemplo: si la URL es watch?v=ABC123XYZ, el ID es ABC123XYZ
  title: "Título de la clase en video",
  duration: "4:00 min",
  category: "Convivencia y Paz",
  pillarId: "convivencia-paz",
  fuente: "Entidad Educativa",
  badgeColor: "bg-sky-500",
  preguntaAntes: "¿Qué crees que sucederá?",
  preguntaDespues: "¿Qué aprendizaje nos deja para el aula?"
}
```

### 3. Generar e Imprimir Diplomas de Honor
En la **Zona para Docentes**, se encuentra el generador interactivo de **Diploma de Ciudadano Ejemplar del Futuro**:
- Permite escribir el nombre del estudiante, institución educativa, grado, fecha y nombre del docente.
- La vista previa se actualiza en tiempo real.
- Al pulsar **Imprimir o Guardar en PDF**, se activa automáticamente el formato de página horizontal (*Letter landscape*) limpio de menús y optimizado para la entrega a los niños.

---

## 🎨 Características Técnicas y Accesibilidad
- **Sin dependencias pesadas:** Carga ultra-rápida en cualquier conexión escolar.
- **Audio Sintetizado con Web Audio API:** No depende de audios externos que puedan fallar o ser bloqueados por filtros escolares. Incluye botón para silenciar o activar.
- **Persistencia en LocalStorage:** Guarda los puntos, retos diarios cumplidos, videos vistos y medallas conseguidas por el estudiante en su dispositivo.
- **Totalmente Responsivo:** Diseñado para computadores de sala de informática, tabletas de programas gubernamentales (ej. Computadores para Educar) y teléfonos móviles de las familias.

---

*Desarrollado con amor pedagógico para la niñez y la comunidad educativa de Colombia.* 🇨🇴🕊️
