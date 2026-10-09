/**
 * ==============================================================================
 * BANCO DE DATOS PEDAGÓGICOS - COMPETENCIAS CIUDADANAS PRIMARIA (COLOMBIA)
 * ==============================================================================
 * Alineado con:
 * 1. Estándares Básicos de Competencias Ciudadanas (Guía N° 6 - MEN Colombia)
 *    - Convivencia y Paz
 *    - Participación y Responsabilidad Democrática
 *    - Pluralidad, Identidad y Valoración de las Diferencias
 * 2. Ley General de Educación (Ley 115 de 1994)
 * 3. Ley de Convivencia Escolar (Ley 1620 de 2013) y Decreto 1965 de 2013
 *    - Ruta de Atención Integral: Promoción, Prevención, Atención y Seguimiento
 *    - Manejo formativo de Situaciones Tipo I (conflictos cotidianos)
 * ==============================================================================
 * NOTA PARA DOCENTES:
 * Puedes modificar, agregar o eliminar preguntas, casos y videos editando este archivo.
 */

const EDU_DATA = {
  // Configuración de Grados Escolares
  grades: {
    exploradores: {
      id: "exploradores",
      label: "Grados 1° a 3° (Exploradores de Paz)",
      range: "1° - 3°",
      ageRange: "6 a 8 años",
      badge: "🌱 Explorador de Paz",
      description: "Aprendo a reconocer mis emociones, escuchar a mis compañeros y compartir en armonía.",
      color: "from-emerald-400 to-teal-500",
      accent: "teal"
    },
    lideres: {
      id: "lideres",
      label: "Grados 4° a 5° (Líderes Democráticos)",
      range: "4° - 5°",
      ageRange: "9 a 11 años",
      badge: "⭐ Líder Democrático",
      description: "Participo en el gobierno escolar, resuelvo dilemas morales y defiendo los derechos humanos.",
      color: "from-indigo-500 to-purple-600",
      accent: "indigo"
    }
  },

  // ==========================================================================
  // 1. MÓDULOS TEMÁTICOS (LOS 3 PILARES DEL MEN)
  // ==========================================================================
  modules: [
    {
      id: "convivencia-paz",
      pillar: "Pilar 1 - MEN",
      title: "Convivencia y Paz",
      subtitle: "Construyo relaciones pacíficas y cuido a los demás",
      icon: "fa-dove",
      gradient: "from-sky-500 to-blue-600",
      bgLight: "bg-sky-50",
      borderColor: "border-sky-200",
      tagColor: "bg-sky-100 text-sky-800",
      normativa: "Estándar MEN: 'Comprendo que todos los niños tenemos derecho a recibir buen trato, cuidado y amor' (Guía 6).",
      leyRef: "Ley 1620 de 2013: Convivencia Escolar y Prevención del Acoso (Bullying)",
      description: "Aprende a identificar tus emociones, expresar lo que sientes sin agredir a los demás y transformar los conflictos cotidianos en oportunidades para crecer juntos.",
      keyConcepts: [
        {
          title: "El Semáforo de las Emociones",
          desc: "Rojo (Para y respira), Amarillo (Piensa alternativas), Verde (Actúa con serenidad y dialoga).",
          icon: "fa-traffic-light"
        },
        {
          title: "La Empatía y el Buen Trato",
          desc: "Ponerse en los zapatos del compañero y entender que las palabras amables sanan y construyen puentes.",
          icon: "fa-heart"
        },
        {
          title: "El Abrazo del Perdón y la Mediación",
          desc: "Reconocer cuando nos equivocamos, pedir disculpas sinceras y reparar el daño causado.",
          icon: "fa-handshake-simple"
        }
      ],
      interactiveTool: {
        type: "semaforo",
        title: "Dinámica Interactiva: El Semáforo Emocional",
        instructions: "Haz clic en cada luz del semáforo para descubrir cómo gestionar momentos de rabia o frustración en el recreo o en clase."
      }
    },
    {
      id: "participacion-democracia",
      pillar: "Pilar 2 - MEN",
      title: "Participación y Democracia",
      subtitle: "Mi voz cuenta en la construcción colectiva",
      icon: "fa-check-to-slot",
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      borderColor: "border-amber-200",
      tagColor: "bg-amber-100 text-amber-800",
      normativa: "Estándar MEN: 'Participo en la construcción de normas para la convivencia en los grupos a los que pertenezco' (Guía 6).",
      leyRef: "Ley 115 de 1994 (Art. 142): Gobierno Escolar (Personero de los Estudiantes y Consejo Estudiantil)",
      description: "Descubre cómo funciona la democracia escolar colombiana, la importancia de elegir a tus representantes y cómo los acuerdos del Manual de Convivencia nos protegen a todos.",
      keyConcepts: [
        {
          title: "El Personerito y el Consejo Estudiantil",
          desc: "Elegir democráticamente a líderes que promueven los derechos y deberes estudiantiles.",
          icon: "fa-id-card-clip"
        },
        {
          title: "Construcción de Acuerdos de Aula",
          desc: "Las normas no son castigos; son pactos colectivos para aprender felices y seguros.",
          icon: "fa-scale-balanced"
        },
        {
          title: "La Voz del Niño y la Votación Consciente",
          desc: "Votar con honestidad pensando en el bienestar común, no por promesas de dulces o favores.",
          icon: "fa-bullhorn"
        }
      ],
      interactiveTool: {
        type: "pacto-aula",
        title: "Buzón de Acuerdos Democráticos",
        instructions: "Construye tu propio compromiso de aula para este año y añádelo al mural de la clase."
      }
    },
    {
      id: "pluralidad-diversidad",
      pillar: "Pilar 3 - MEN",
      title: "Pluralidad, Identidad y Diversidad",
      subtitle: "Colombia: un arcoíris de culturas, saberes y talentos",
      icon: "fa-people-roof",
      gradient: "from-emerald-500 to-green-600",
      bgLight: "bg-emerald-50",
      borderColor: "border-emerald-200",
      tagColor: "bg-emerald-100 text-emerald-800",
      normativa: "Estándar MEN: 'Identifico y respeto las diferencias y semejanzas entre los demás y yo' (Guía 6).",
      leyRef: "Constitución Política de Colombia (Art. 7): Diversidad étnica y cultural de la Nación",
      description: "Celebramos la riqueza de nuestras regiones colombianas: comunidades afrocolombianas, indígenas, campesinas y urbanas. Ningún niño debe ser burlado por su origen, acento o capacidades.",
      keyConcepts: [
        {
          title: "Diversidad Étnica y Cultural Colombiana",
          desc: "Riqueza de nuestras raíces: Pacífico, Caribe, Andina, Orinoquía, Amazonía e Insular.",
          icon: "fa-earth-americas"
        },
        {
          title: "Inclusión y Accesibilidad",
          desc: "Todos aprendemos a ritmos distintos. Apoyar a compañeros con necesidades especiales es solidaridad.",
          icon: "fa-hands-holding-child"
        },
        {
          title: "Cero Apodos, Máximo Respeto",
          desc: "Las burlas por el color de piel, ropa o acento lastiman la dignidad. El respeto nos une.",
          icon: "fa-ban"
        }
      ],
      interactiveTool: {
        type: "arbol-diversidad",
        title: "Mural de la Diversidad y la Inclusión",
        instructions: "Descubre las expresiones culturales de Colombia y cómo enriquecen nuestra convivencia."
      }
    }
  ],

  // ==========================================================================
  // 2. VIDEO-AULA (INTEGRACIÓN PEDAGÓGICA YOUTUBE)
  // ==========================================================================
  // Docente: Puedes agregar nuevos videos colocando el ID de YouTube (lo que va después de watch?v=)
  videos: [
    {
      id: "v1",
      youtubeId: "Wn9q7k7zK-Y", // Video infantil sobre resolución de conflictos
      title: "El Puente: Aprender a cooperar y ceder",
      duration: "3:40 min",
      category: "Convivencia y Paz",
      pillarId: "convivencia-paz",
      gradeRange: "1° a 5°",
      fuente: "Cortometraje Educativo",
      badgeColor: "bg-sky-500",
      preguntaAntes: "¿Qué crees que pasa cuando dos personas muy tercas quieren pasar al mismo tiempo por un camino estrecho?",
      preguntaDespues: "¿Cómo habrían podido solucionar el problema hablando y cooperando en vez de pelear?",
      menCompetencia: "Convivencia y Paz: Comprendo que la colaboración supera a la terquedad y evita daños mutuos."
    },
    {
      id: "v2",
      youtubeId: "vP8-5BHgdVg", // Diversidad y no discriminación (Paka Paka / Unicef)
      title: "El Monstruo de Colores: Reconociendo nuestras emociones",
      duration: "4:15 min",
      category: "Convivencia y Paz",
      pillarId: "convivencia-paz",
      gradeRange: "1° a 3°",
      fuente: "Educación Emocional",
      badgeColor: "bg-teal-500",
      preguntaAntes: "¿Cómo te sientes cuando estás bravo? ¿Y cuando estás alegre?",
      preguntaDespues: "¿Por qué es importante ponerle nombre a lo que sentimos antes de reaccionar?",
      menCompetencia: "Competencias Emocionales: Identifico mis emociones básicas (alegría, tristeza, rabia, temor)."
    },
    {
      id: "v3",
      youtubeId: "Qp0b_YcK1gA", // Gobierno Escolar y Democracia
      title: "¿Qué es la Democracia y cómo la vivimos en el colegio?",
      duration: "4:50 min",
      category: "Participación y Democracia",
      pillarId: "participacion-democracia",
      gradeRange: "4° a 5°",
      fuente: "Guía Ciudadana Infantil",
      badgeColor: "bg-amber-500",
      preguntaAntes: "¿Por qué en el colegio elegimos un personero estudiantil y no lo decide solo el rector?",
      preguntaDespues: "¿Qué cualidades debe tener un buen líder estudiantil según lo visto en el video?",
      menCompetencia: "Participación y Democracia: Conozco las funciones del Personero de los Estudiantes y del Consejo Estudiantil."
    },
    {
      id: "v4",
      youtubeId: "kOD4sO4vY8w", // Colombia Diversa - Diversidad cultural y respeto
      title: "Colombia, un país de muchas culturas",
      duration: "5:10 min",
      category: "Pluralidad y Diversidad",
      pillarId: "pluralidad-diversidad",
      gradeRange: "1° a 5°",
      fuente: "Señal Colombia / MEN",
      badgeColor: "bg-emerald-500",
      preguntaAntes: "¿Cuántas regiones y costumbres distintas conoces de nuestro país Colombia?",
      preguntaDespues: "¿Por qué las diferencias en nuestros acentos, bailes y comidas nos hacen más ricos como nación?",
      menCompetencia: "Pluralidad, Identidad y Valoración: Valoro la diversidad étnica y cultural de las regiones colombianas."
    }
  ],

  // ==========================================================================
  // 3. DESAFÍOS INTERACTIVOS TIPO KAHOOT! (CUESTIONARIOS GAMIFICADOS)
  // ==========================================================================
  // Cada pregunta incluye:
  // - 4 opciones con formas geométricas y colores estilo Kahoot (Rojo ▲, Azul ◆, Amarillo ●, Verde ■)
  // - Temporizador pedagógico (20 segundos)
  // - Explicación formativa basada en la legislación y estándares colombianos
  kahootQuizzes: {
    exploradores: [
      {
        id: "q-exp-1",
        pilar: "Convivencia y Paz",
        situacion: "Durante el recreo, un compañero tropieza contigo sin querer y se te cae la merienda al suelo. Tú sientes mucha rabia.",
        pregunta: "¿Cuál es la mejor acción de un Explorador de Paz?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Empujarlo de vuelta para que él también pierda su merienda." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Respirar profundo, decirle con calma lo que pasó y buscar ayuda con la docente." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Gritarle delante de todos y no volverle a hablar nunca." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Quitarle la merienda a él a la fuerza sin escuchar explicaciones." }
        ],
        correctIndex: 1, // Opción Azul
        explicacion: "¡Excelente decisión! La Ley 1620 y los Estándares MEN nos enseñan que el primer paso ante un conflicto cotidiano es calmarnos (semáforo en rojo), dialogar y buscar mediación docente si es necesario."
      },
      {
        id: "q-exp-2",
        pilar: "Pluralidad y Diversidad",
        situacion: "Llega un nuevo estudiante al salón que viene de la región Pacífica colombiana y habla con un acento diferente al tuyo.",
        pregunta: "¿Cómo demuestras valoración de las diferencias?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Burlarte de cómo habla e inventarle un apodo gracioso." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Decirle a los demás que no jueguen con él porque es raro." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Darle la bienvenida con una sonrisa y pedirle que te enseñe sobre su tierra." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Ignorarlo por completo para no equivocarte." }
        ],
        correctIndex: 2, // Opción Amarilla
        explicacion: "¡Maravilloso! El Artículo 7 de la Constitución y la Guía 6 del MEN destacan que Colombia es pluriétnica y multicultural. Dar la bienvenida y valorar la diversidad enriquece nuestra amistad."
      },
      {
        id: "q-exp-3",
        pilar: "Participación y Democracia",
        situacion: "En el salón van a elegir el juego para el recreo de los viernes. Hay dos opciones y tú querías jugar a las escondidas, pero la mayoría votó por fútbol.",
        pregunta: "¿Qué significa aceptar la decisión democrática?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Enojarte, hacer pataleta y dañar el balón de fútbol." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Respetar la votación de la mayoría y disfrutar jugando juntos con entusiasmo." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Decirle a tu grupito que nadie juegue para sabotear la actividad." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Acusar a la profesora diciendo que hubo trampa sin motivo." }
        ],
        correctIndex: 1, // Opción Azul
        explicacion: "¡Muy bien! En la democracia escolar, cuando se vota limpiamente, aceptamos el resultado de la mayoría con alegría y participamos respetando las reglas acordadas."
      },
      {
        id: "q-exp-4",
        pilar: "Convivencia y Paz",
        situacion: "Ves que una compañera está sentada sola en una banca del patio llorando porque no tiene con quién jugar.",
        pregunta: "¿Qué acción demuestra empatía solidaria?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Acercarte, preguntarle con cariño cómo se siente e invitarla a jugar." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Tomarle una foto y reírte con tus amigos." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Mirar para otro lado porque ese no es problema tuyo." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Decirle que no llore porque se ve fea." }
        ],
        correctIndex: 0, // Opción Roja
        explicacion: "¡Excelente! La empatía es la capacidad de sentir con el corazón del otro. Acompañar a quien se siente solo previene situaciones de aislamiento y fomenta una escuela protectora."
      }
    ],
    lideres: [
      {
        id: "q-lid-1",
        pilar: "Participación y Democracia",
        situacion: "Llegan las elecciones del Personero Estudiantil en el colegio. Un candidato promete regalar pizzas y paseos gratis (que no puede cumplir), mientras otra candidata propone crear buzones de paz y torneos deportivos incluyentes.",
        pregunta: "¿Cómo debe ejercer su voto un Ciudadano Líder responsable?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Votar por la pizza aunque sepa que es una propuesta engañosa." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Analizar las propuestas reales y votar a conciencia por quien defienda los derechos de todos." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "No votar y decir que la política del colegio no sirve para nada." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Votar solo por quien le cae bien a mis amigos más populares." }
        ],
        correctIndex: 1, // Opción Azul
        explicacion: "¡Brillante análisis! Según la Ley 115 (Gobierno Escolar) y el MEN, el personero debe defender los derechos estudiantiles (Manual de Convivencia). El voto consciente se basa en propuestas viables y éticas."
      },
      {
        id: "q-lid-2",
        pilar: "Convivencia y Paz",
        situacion: "En un grupo de WhatsApp del curso, alguien comparte una foto editada de un compañero con orejas de burro para burlarse de él. Varios envían 'jajaja'.",
        pregunta: "Según la Ley 1620 de Convivencia Escolar (Ciberacoso), ¿cuál es la conducta correcta?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Reenviar la foto a otros cursos para que más gente se ría." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Quedarse callado para evitar que después se burlen de ti." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Frenar la burla pidiendo respeto, apoyar al compañero y avisar al director de grupo o comité de convivencia." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Responder con un insulto peor hacia quien mandó la foto." }
        ],
        correctIndex: 2, // Opción Amarilla
        explicacion: "¡Impecable! La Ley 1620 define el ciberacoso como una agresión que daña la dignidad. Ser un testigo activo y solidario rompe la cadena del bullying y activa la Ruta de Atención Integral."
      },
      {
        id: "q-lid-3",
        pilar: "Pluralidad y Diversidad",
        situacion: "Para un proyecto de ciencias sobre el medio ambiente colombiano, la docente pide armar grupos de 4 personas. En tu salón hay un estudiante con discapacidad motora que usa silla de ruedas.",
        pregunta: "¿Cómo aplicas los principios de equidad e inclusión?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Invitarlo a tu equipo, acordar tareas según las habilidades de cada uno y garantizar que el espacio de trabajo sea accesible." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Decirle que trabaje solo porque con él no podrán correr en el patio." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Pedirle a la profe que lo mande a otro curso porque atrasa el grupo." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Hacer todo el trabajo ustedes y solo poner su nombre por lástima." }
        ],
        correctIndex: 0, // Opción Roja
        explicacion: "¡Sensacional! La inclusión no es beneficencia ni lástima; es garantizar que todos participen con dignidad, reconociendo el talento único de cada persona en igualdad de condiciones."
      },
      {
        id: "q-lid-4",
        pilar: "Convivencia y Paz",
        situacion: "Dos compañeros están a punto de irse a los golpes en la cancha por una falta cometida en un partido de microfútbol.",
        pregunta: "Como Mediador Escolar de Paz, ¿qué intervención es más constructiva?",
        tiempo: 20,
        opciones: [
          { shape: "triangle", color: "bg-red-500", icon: "▲", text: "Gritar '¡Pelea, pelea!' y hacer un círculo para ver quién gana." },
          { shape: "diamond", color: "bg-blue-600", icon: "◆", text: "Intervenir con serenidad pidiendo una pausa, recordarles que es solo un juego y buscar al árbitro o docente para dialogar." },
          { shape: "circle", color: "bg-amber-500", icon: "●", text: "Meterte a golpear al que consideres que cometió la falta." },
          { shape: "square", color: "bg-emerald-600", icon: "■", text: "Apostar dinero a quién pega más fuerte." }
        ],
        correctIndex: 1, // Opción Azul
        explicacion: "¡Extraordinario! La mediación escolar transforma los conflictos Tipo I (Ley 1620) en diálogos pedagógicos. Frenar la violencia protege la integridad de la comunidad escolar."
      }
    ]
  },

  // ==========================================================================
  // 4. LABORATORIO DE CASOS Y DILEMAS MORALES ("¿QUÉ HARÍAS TÚ?")
  // ==========================================================================
  // Casos de la vida real en escuelas colombianas con evaluación ética y cívica
  dilemmas: [
    {
      id: "caso-1",
      gradeLevel: "exploradores",
      tag: "Honestidad y Bien Común",
      title: "El billete encontrado en la cafetería escolar",
      icon: "fa-money-bill-wave",
      iconColor: "text-emerald-500",
      contexto: "Es la hora del recreo en el colegio. Mientras hacías la fila para comprar tu refrigerio, ves en el piso un billete de $10.000 pesos doblado. A tu lado ves a una niña de 2° grado que está buscando desesperada en sus bolsillos y empieza a llorar porque no encuentra la plata de su almuerzo.",
      pregunta: "¿Qué harías tú ante este dilema?",
      alternativas: [
        {
          id: "alt-a",
          texto: "Guardarte el billete rápido en tu bolsillo y comprar golosinas para ti y tus amigos.",
          tipo: "incorrecta",
          impacto: "Consecuencia Negativa",
          analisis: "Aunque obtienes un beneficio personal momentáneo, has perjudicado a una compañera que se quedó sin almorzar. La convivencia ciudadana se basa en no construir nuestro bienestar sobre el sufrimiento ajeno."
        },
        {
          id: "alt-b",
          texto: "Acercarte a la niña, preguntarle cuánto dinero se le perdió y entregárselo a la docente de turno para verificar que sea de ella.",
          tipo: "excelente",
          impacto: "Consecuencia Ejemplar (Paz y Justicia)",
          analisis: "¡Excelente decisión ética! Demuestras honestidad, empatía y respeto por las pertenencias de los demás. Ayudaste a una persona vulnerable y generaste confianza en tu comunidad escolar."
        },
        {
          id: "alt-c",
          texto: "Ignorar el billete y dejarlo en el piso para que otra persona lo recoja.",
          tipo: "regular",
          impacto: "Consecuencia Pasiva",
          analisis: "No hiciste daño directo, pero la indiferencia permite que el problema continúe. Un ciudadano activo toma la iniciativa de hacer el bien con valentía."
        }
      ]
    },
    {
      id: "caso-2",
      gradeLevel: "exploradores",
      tag: "Cuidado de lo Público y Medio Ambiente",
      title: "Las plantas del jardín escolar",
      icon: "fa-seedling",
      iconColor: "text-green-500",
      contexto: "El colegio inauguró un jardín hermoso con flores nativas colombianas para que las mariposas y colibríes lleguen. Durante el recreo, unos amigos empiezan a arrancar las flores para jugar a tirarse pétalos y pisotean las ramas recién sembradas.",
      pregunta: "¿Cómo actúas como Guardián del Entorno?",
      alternativas: [
        {
          id: "alt-a",
          texto: "Unirte al juego de arrancar flores porque parece muy divertido.",
          tipo: "incorrecta",
          impacto: "Consecuencia Negativa",
          analisis: "Dañar los bienes comunes y la naturaleza destruye el esfuerzo de toda la comunidad escolar y atenta contra el derecho a un ambiente sano (Art. 79 Constitución)."
        },
        {
          id: "alt-b",
          texto: "Explicarles con amabilidad que el jardín es de todos, recordarles que las plantas tienen vida y proponerles jugar en la cancha.",
          tipo: "excelente",
          impacto: "Consecuencia Ejemplar (Cuidado del Entorno)",
          analisis: "¡Actitud de verdadero líder! Cuidar el medio ambiente escolar y orientar a tus compañeros sin violencia es un estándar básico de competencias ciudadanas."
        },
        {
          id: "alt-c",
          texto: "Salir corriendo a burlarte de cómo destruyen las matas.",
          tipo: "incorrecta",
          impacto: "Consecuencia Negativa",
          analisis: "Fomentar la destrucción de los espacios compartidos deteriora la convivencia y crea un ambiente escolar descuidado."
        }
      ]
    },
    {
      id: "caso-3",
      gradeLevel: "lideres",
      tag: "Ley 1620 / Prevención del Bullying",
      title: "El apodo hiriente en la clase de Educación Física",
      icon: "fa-shield-heart",
      iconColor: "text-sky-500",
      contexto: "En la clase de deportes, a un estudiante nuevo se le dificulta encestar el balón de baloncesto. Un grupo de estudiantes populares le inventa un apodo pesado ('manos de mantequilla') y cada vez que él toma el balón se burlan a carcajadas. El estudiante agacha la cabeza y le dice al profesor que prefiere sentarse porque le duele el estómago.",
      pregunta: "¿Qué postura tomas ante esta situación Tipo I de convivencia?",
      alternativas: [
        {
          id: "alt-a",
          texto: "Reírte bajito con tus amigos para no quedar como el 'aburrido' del salón.",
          tipo: "incorrecta",
          impacto: "Consecuencia Negativa (Cómplice por silencio)",
          analisis: "El acoso escolar crece cuando los testigos se ríen o callan. La Ley 1620 señala que la complicidad pasiva alimenta el dolor y la exclusión de la víctima."
        },
        {
          id: "alt-b",
          texto: "Ponerte del lado del compañero, animarlo a seguir practicando, decirle con respeto al grupo que los apodos no son graciosos y promover el juego cooperativo.",
          tipo: "excelente",
          impacto: "Consecuencia Ejemplar (Defensa de la Dignidad)",
          analisis: "¡Impecable liderazgo pro-social! Proteges el derecho fundamental al buen trato, la dignidad personal y demuestras que el deporte debe unir, no humillar."
        },
        {
          id: "alt-c",
          texto: "Decirle al profesor que sancione y expulse del colegio a todos los compañeros que se rieron.",
          tipo: "regular",
          impacto: "Consecuencia Punitiva sin Mediación",
          analisis: "Es correcto avisar al docente, pero la Ley 1620 prioriza primero la mediación pedagógica y formativa antes de pedir sanciones desproporcionadas."
        }
      ]
    },
    {
      id: "caso-4",
      gradeLevel: "lideres",
      tag: "Democracia y Ética Ciudadana",
      title: "La promesa de campaña del Personerito",
      icon: "fa-landmark",
      iconColor: "text-indigo-500",
      contexto: "En la campaña para personero estudiantil, tu mejor amigo es candidato. En su discurso promete que si votan por él, 'convencerá a los profesores de no hacer tareas los viernes'. Tú sabes que el personero no tiene el poder de cambiar el plan pedagógico del colegio y que es una promesa engañosa solo para ganar votos.",
      pregunta: "¿Cómo ejerces tu responsabilidad cívica y amistad sincera?",
      alternativas: [
        {
          id: "alt-a",
          texto: "Ayudarle a difundir esa mentira por todo el colegio porque es tu mejor amigo y lo que importa es ganar a cualquier costo.",
          tipo: "incorrecta",
          impacto: "Consecuencia Antidemocrática",
          analisis: "Engañar al electorado corrompe la democracia desde la escuela. Los líderes deben actuar con transparencia y apego a la verdad (Ley 115)."
        },
        {
          id: "alt-b",
          texto: "Hablar a solas con tu amigo con honestidad y cariño, explicarle las verdaderas funciones del personero (vigilar los derechos y el manual de convivencia) y ayudarle a construir propuestas realizables y éticas.",
          tipo: "excelente",
          impacto: "Consecuencia Ejemplar (Democracia Ética)",
          analisis: "¡Verdadera amistad y madurez ciudadana! Los verdaderos amigos ayudan a corregir el rumbo con amor y defienden la integridad democrática."
        },
        {
          id: "alt-c",
          texto: "Dejar de hablarle y empezar a criticarlo a sus espaldas con los demás compañeros.",
          tipo: "regular",
          impacto: "Consecuencia Destructiva",
          analisis: "La crítica destructiva y el chisme fracturan los lazos comunitarios. El diálogo pedagógico y sincero siempre es el camino correcto."
        }
      ]
    }
  ],

  // ==========================================================================
  // 5. ZONA DOCENTE Y FAMILIAS: ORIENTACIONES Y NORMATIVA COLOMBIANA
  // ==========================================================================
  orientacionesDocentes: {
    titulo: "Caja de Herramientas Pedagógicas para Docentes y Familias",
    normativaPrincipal: [
      {
        norma: "Estándares Básicos de Competencias Ciudadanas (Guía N° 6 - MEN)",
        descripcion: "Conjunto de conocimientos y habilidades cognitivas, emocionales y comunicativas que hacen posible que el ciudadano actúe de manera constructiva en una sociedad democrática.",
        enlaceOficial: "https://www.mineducacion.gov.co/1621/articles-116042_archivo_pdf.pdf"
      },
      {
        norma: "Ley 1620 de 2013 y Decreto 1965 de 2013 (Convivencia Escolar)",
        descripcion: "Crea el Sistema Nacional de Convivencia Escolar y Formación para el Ejercicio de los Derechos Humanos, Sexuales y Reproductivos y la Prevención y Mitigación de la Violencia Escolar.",
        enlaceOficial: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=52240"
      },
      {
        norma: "Ley 115 de 1994 (Ley General de Educación)",
        descripcion: "Establece los fines de la educación en Colombia, el Gobierno Escolar y la formación integral en valores cívicos, éticos y morales.",
        enlaceOficial: "https://www.mineducacion.gov.co/1621/articles-85906_archivo_pdf.pdf"
      }
    ],
    rutasAtencion: [
      {
        tipo: "Situaciones Tipo I",
        definicion: "Conflictos manejados inadecuadamente y situaciones esporádicas que inciden negativamente en el clima escolar, sin generar daño físico ni psicológico.",
        manejo: "Mediación pedagógica inmediata, diálogo reflexivo, acuerdos de no repetición y reconciliación."
      },
      {
        tipo: "Situaciones Tipo II",
        definicion: "Agresiones escolares reiteradas, acoso escolar (bullying) o ciberacoso que no revisten características de delito pero causan daño a la salud física o emocional.",
        manejo: "Atención inmediata, remisión al Comité de Convivencia Escolar, medidas de protección y plan de intervención con familias."
      },
      {
        tipo: "Situaciones Tipo III",
        definicion: "Hechos que revisten características de presunto delito contra la libertad, integridad y formación personal.",
        manejo: "Atención médica urgente, remisión a ICBF / Policía de Infancia y Adolescencia y Fiscalía General de la Nación."
      }
    ],
    estrategiasAula: [
      {
        titulo: "El Semáforo de la Ira",
        detalle: "Estrategia de regulación emocional: 1. Rojo: Detenerse y respirar. 2. Amarillo: Identificar qué siento y pensar soluciones. 3. Verde: Dialogar con asertividad."
      },
      {
        titulo: "Mesa de Paz y Mediación entre Pares",
        detalle: "Un espacio físico en el aula con cojines donde los estudiantes acuden voluntariamente a resolver sus diferencias mediante turnos de palabra escuchándose sin interrupciones."
      },
      {
        titulo: "El Cuaderno Viajero de la Gratitud",
        detalle: "Actividad comunitaria donde cada fin de semana una familia escribe un mensaje de agradecimiento y respeto hacia otro compañero del aula."
      }
    ]
  },

  // ==========================================================================
  // 6. MEDALLAS Y SISTEMA DE RECOMPENSAS PEDAGÓGICAS
  // ==========================================================================
  badges: [
    {
      id: "b_primer_paso",
      nombre: "Semilla de Paz",
      desc: "Inició su viaje en las competencias ciudadanas",
      icon: "fa-seedling",
      color: "bg-emerald-100 text-emerald-700 border-emerald-300",
      puntosReq: 50
    },
    {
      id: "b_kahoot_master",
      nombre: "Campeón del Diálogo",
      desc: "Completó un desafío interactivo tipo Kahoot!",
      icon: "fa-trophy",
      color: "bg-amber-100 text-amber-700 border-amber-300",
      puntosReq: 150
    },
    {
      id: "b_dilema_resuelto",
      nombre: "Guardián de la Justicia",
      desc: "Tomó decisiones ejemplares en el laboratorio de dilemas",
      icon: "fa-scale-balanced",
      color: "bg-indigo-100 text-indigo-700 border-indigo-300",
      puntosReq: 250
    },
    {
      id: "b_video_reflexion",
      nombre: "Mente Reflexiva",
      desc: "Exploró los recursos audiovisuales del Video-Aula",
      icon: "fa-video",
      color: "bg-sky-100 text-sky-700 border-sky-300",
      puntosReq: 350
    },
    {
      id: "b_ciudadano_ejemplar",
      nombre: "Gran Ciudadano del Futuro",
      desc: "Alcanzó el máximo reconocimiento cívico y ético",
      icon: "fa-medal",
      color: "bg-purple-100 text-purple-700 border-purple-300",
      puntosReq: 500
    }
  ]
};

// Si se utiliza en entornos modulares, exportar objeto
if (typeof module !== "undefined" && module.exports) {
  module.exports = EDU_DATA;
}
