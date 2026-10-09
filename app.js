/**
 * ==============================================================================
 * APLICACIÓN PRINCIPAL: CIUDADANOS DEL FUTURO (COLOMBIA)
 * ==============================================================================
 * Desarrollada en JavaScript Puro (ES6+) para ejecución 100% estática en navegador.
 * Compatible con GitHub Pages y navegadores móviles/escritorio.
 * ==============================================================================
 */

// Estado global de la aplicación
const AppState = {
  grade: "exploradores", // 'exploradores' (1°-3°) | 'lideres' (4°-5°)
  points: 0,
  unlockedBadges: [],
  completedVideos: [],
  completedDilemmas: {},
  dailyTaskClaimed: false,
  agreements: [],
  kahoot: {
    active: false,
    questions: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    timer: 20,
    intervalId: null
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initHeaderAndNav();
  initGradeSelector();
  renderModules();
  initTrafficLight();
  initClassroomAgreements();
  renderVideos();
  initVideoModal();
  initKahootEngine();
  renderDilemmas();
  initDiplomaGenerator();
  initBadgesModal();
  updateUIStats();
});

// ==============================================================================
// 1. GESTIÓN DE PERSISTENCIA (LOCALSTORAGE)
// ==============================================================================
function initStorage() {
  try {
    const savedGrade = localStorage.getItem("cc_selected_grade");
    if (savedGrade && EDU_DATA.grades[savedGrade]) {
      AppState.grade = savedGrade;
    }

    const savedPoints = localStorage.getItem("cc_student_points");
    if (savedPoints) {
      AppState.points = parseInt(savedPoints, 10) || 0;
    }

    const savedBadges = localStorage.getItem("cc_badges");
    if (savedBadges) {
      AppState.unlockedBadges = JSON.parse(savedBadges) || [];
    }

    const savedVideos = localStorage.getItem("cc_videos_done");
    if (savedVideos) {
      AppState.completedVideos = JSON.parse(savedVideos) || [];
    }

    const savedDilemmas = localStorage.getItem("cc_dilemmas_done");
    if (savedDilemmas) {
      AppState.completedDilemmas = JSON.parse(savedDilemmas) || {};
    }

    const savedAgreements = localStorage.getItem("cc_agreements");
    if (savedAgreements) {
      AppState.agreements = JSON.parse(savedAgreements) || [];
    } else {
      // Acuerdos de ejemplo iniciales inspirados en el aula colombiana
      AppState.agreements = [
        { autor: "Profe Camila", texto: "Escuchar atentamente sin interrumpir cuando alguien tiene la palabra." },
        { autor: "Mateo (3°B)", texto: "Prestar los colores y cuidar los libros de la biblioteca del salón." },
        { autor: "Salomé (5°A)", texto: "Invitar a jugar al compañero que esté solo en el recreo." }
      ];
      localStorage.setItem("cc_agreements", JSON.stringify(AppState.agreements));
    }

    const savedDaily = localStorage.getItem("cc_daily_task_claimed");
    if (savedDaily === "true") {
      AppState.dailyTaskClaimed = true;
    }
  } catch (err) {
    console.warn("Error leyendo localStorage:", err);
  }
}

function saveState() {
  try {
    localStorage.setItem("cc_selected_grade", AppState.grade);
    localStorage.setItem("cc_student_points", AppState.points.toString());
    localStorage.setItem("cc_badges", JSON.stringify(AppState.unlockedBadges));
    localStorage.setItem("cc_videos_done", JSON.stringify(AppState.completedVideos));
    localStorage.setItem("cc_dilemmas_done", JSON.stringify(AppState.completedDilemmas));
    localStorage.setItem("cc_agreements", JSON.stringify(AppState.agreements));
    localStorage.setItem("cc_daily_task_claimed", AppState.dailyTaskClaimed.toString());
  } catch (err) {
    console.warn("Error guardando en localStorage:", err);
  }
}

function addPoints(pts, reason = "") {
  AppState.points += pts;
  saveState();
  updateUIStats();
  checkBadges();
}

function updateUIStats() {
  const pointsEl = document.getElementById("header-points-count");
  if (pointsEl) pointsEl.textContent = AppState.points;

  const badgesEl = document.getElementById("header-badge-count");
  if (badgesEl) badgesEl.textContent = AppState.unlockedBadges.length;

  // Actualizar botón de reto diario si ya fue reclamado
  const dailyBtn = document.getElementById("btn-claim-daily-task");
  if (dailyBtn && AppState.dailyTaskClaimed) {
    dailyBtn.disabled = true;
    dailyBtn.textContent = "¡Reto Cumplido! 🎉";
    dailyBtn.className = "text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg cursor-default border border-emerald-300";
  }
}

// ==============================================================================
// 2. ENCABEZADO, NAVEGACIÓN Y SONIDO
// ==============================================================================
function initHeaderAndNav() {
  // Toggle Menú Móvil
  const btnMobile = document.getElementById("btn-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  if (btnMobile && mobileMenu) {
    btnMobile.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Cerrar al hacer clic en un enlace móvil
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Toggle de Sonido Sintetizado
  const soundBtn = document.getElementById("btn-toggle-sound");
  const soundIcon = document.getElementById("sound-icon");
  if (soundBtn && soundIcon) {
    // Estado inicial
    if (!window.soundFx.isEnabled()) {
      soundIcon.className = "fa-solid fa-volume-xmark text-slate-400";
    }

    soundBtn.addEventListener("click", () => {
      const isNowOn = window.soundFx.toggle();
      if (isNowOn) {
        soundIcon.className = "fa-solid fa-volume-high text-blue-600";
      } else {
        soundIcon.className = "fa-solid fa-volume-xmark text-slate-400";
      }
    });
  }

  // Reto Diario Cívico
  const dailyBtn = document.getElementById("btn-claim-daily-task");
  if (dailyBtn) {
    dailyBtn.addEventListener("click", () => {
      if (AppState.dailyTaskClaimed) return;
      window.soundFx.playCorrect();
      triggerConfetti();
      AppState.dailyTaskClaimed = true;
      addPoints(25, "Reto cívico diario");
    });
  }

  // Reiniciar Progreso
  const resetBtn = document.getElementById("btn-reset-progress-mobile");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas reiniciar todos los puntos y medallas?")) {
        localStorage.clear();
        location.reload();
      }
    });
  }
}

// ==============================================================================
// 3. SELECTOR DE GRADOS (1°-3° Exploradores vs 4°-5° Líderes)
// ==============================================================================
function initGradeSelector() {
  const container = document.getElementById("grade-selector-container");
  if (!container) return;

  const buttons = container.querySelectorAll(".grade-toggle-btn");
  buttons.forEach(btn => {
    const grade = btn.getAttribute("data-grade");
    if (grade === AppState.grade) {
      setActiveGradeButton(btn, grade);
    }

    btn.addEventListener("click", () => {
      window.soundFx.playClick();
      AppState.grade = grade;
      saveState();

      buttons.forEach(b => {
        const bGrade = b.getAttribute("data-grade");
        b.className = "grade-toggle-btn flex flex-col items-center sm:items-start p-3.5 rounded-2xl border-2 transition-all text-left bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
      });

      setActiveGradeButton(btn, grade);
      updateGradeDependentUI();
    });
  });

  updateGradeDependentUI();
}

function setActiveGradeButton(btn, grade) {
  if (grade === "exploradores") {
    btn.className = "grade-toggle-btn active flex flex-col items-center sm:items-start p-3.5 rounded-2xl border-2 transition-all text-left bg-teal-50 border-teal-500 text-teal-900 shadow-md";
  } else {
    btn.className = "grade-toggle-btn active flex flex-col items-center sm:items-start p-3.5 rounded-2xl border-2 transition-all text-left bg-indigo-50 border-indigo-500 text-indigo-900 shadow-md";
  }
}

function updateGradeDependentUI() {
  const gradeInfo = EDU_DATA.grades[AppState.grade];
  if (!gradeInfo) return;

  // Actualizar resumen en el hero
  const summaryText = document.getElementById("grade-summary-text");
  if (summaryText) {
    summaryText.innerHTML = `Nivel activo: <strong>${gradeInfo.label}</strong> (${gradeInfo.ageRange})`;
  }

  // Actualizar badge en Kahoot Lobby
  const kahootGradeBadge = document.getElementById("kahoot-current-grade-badge");
  if (kahootGradeBadge) {
    kahootGradeBadge.textContent = gradeInfo.label;
  }

  // Sincronizar select de diploma
  const diplomaGradeSelect = document.getElementById("diploma-input-grade");
  if (diplomaGradeSelect) {
    diplomaGradeSelect.value = AppState.grade === "exploradores" ? "Grado 3° Primaria" : "Grado 5° Primaria";
    updateDiplomaPreview();
  }

  // Re-renderizar dilemas y reiniciar kahoot si no está activo
  renderDilemmas();
  if (!AppState.kahoot.active) {
    resetKahootToLobby();
  }
}

// ==============================================================================
// 4. RENDERIZADO DE MÓDULOS TEMÁTICOS (LOS 3 PILARES DEL MEN)
// ==============================================================================
function renderModules() {
  const container = document.getElementById("modules-cards-container");
  if (!container) return;

  container.innerHTML = EDU_DATA.modules.map(mod => `
    <article class="card-glow bg-white rounded-3xl p-6 sm:p-7 border ${mod.borderColor} shadow-lg shadow-slate-100 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold px-3 py-1 rounded-full ${mod.tagColor}">
            ${mod.pillar}
          </span>
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${mod.gradient} text-white flex items-center justify-center text-xl shadow-md">
            <i class="fa-solid ${mod.icon}"></i>
          </div>
        </div>

        <h3 class="text-xl sm:text-2xl font-bold font-heading text-slate-900 mb-1">
          ${mod.title}
        </h3>
        <p class="text-xs font-semibold text-slate-500 mb-3">
          ${mod.subtitle}
        </p>

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
          ${mod.description}
        </p>

        <!-- Conceptos Clave -->
        <div class="space-y-2.5 mb-6">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-400 block">Ejes Fundamentales:</span>
          ${mod.keyConcepts.map(c => `
            <div class="p-2.5 rounded-xl ${mod.bgLight} border border-slate-100 flex items-start gap-2.5">
              <i class="fa-solid ${c.icon} text-slate-700 mt-0.5 text-xs"></i>
              <div>
                <strong class="block text-xs font-bold text-slate-800">${c.title}</strong>
                <span class="block text-[11px] text-slate-600 leading-tight">${c.desc}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Cita del Estándar MEN y Ley Colombiana -->
      <div class="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
        <p class="italic text-slate-600">"${mod.normativa}"</p>
        <span class="block font-bold text-slate-700 text-[10px]"><i class="fa-solid fa-scale-balanced mr-1"></i> ${mod.leyRef}</span>
      </div>
    </article>
  `).join("");
}

// ==============================================================================
// 5. HERRAMIENTAS LÚDICAS: SEMÁFORO EMOCIONAL & BUZÓN DE ACUERDOS
// ==============================================================================
function initTrafficLight() {
  const lightData = {
    rojo: {
      badge: "PASO 1: ROJO",
      badgeClass: "bg-red-500/20 text-red-300 border-red-500/30",
      title: "¡Detente y Respira!",
      desc: "Cuando la ira llega, nuestro cuerpo se tensa. Cierra los ojos, cuenta hasta 10 e inhala profundo como si olieras una flor, luego exhala como apagando una vela. ¡No reacciones con golpes ni gritos!"
    },
    amarillo: {
      badge: "PASO 2: AMARILLO",
      badgeClass: "bg-amber-400/20 text-amber-300 border-amber-400/30",
      title: "¡Piensa Alternativas!",
      desc: "¿Qué pasó realmente? ¿Qué siente la otra persona? Piensa en 2 formas pacíficas de solucionar el problema sin insultar ni lastimar. Recuerda: enojarse es natural, pero agredir es una elección que podemos evitar."
    },
    verde: {
      badge: "PASO 3: VERDE",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      title: "¡Actúa con Serenidad!",
      desc: "Habla con voz tranquila: 'Me sentí triste o incómodo cuando hiciste eso, por favor no lo repitas'. Si el conflicto no se resuelve entre ustedes, pidan la ayuda mediadora de un docente o personero."
    }
  };

  const bulbs = document.querySelectorAll(".traffic-light-bulb");
  const badgeEl = document.getElementById("traffic-light-color-badge");
  const titleEl = document.getElementById("traffic-light-title");
  const descEl = document.getElementById("traffic-light-desc");

  bulbs.forEach(bulb => {
    bulb.addEventListener("click", () => {
      window.soundFx.playClick();
      const color = bulb.getAttribute("data-light");

      bulbs.forEach(b => b.classList.remove("active"));
      bulb.classList.add("active");

      const info = lightData[color];
      if (info && badgeEl && titleEl && descEl) {
        badgeEl.textContent = info.badge;
        badgeEl.className = `px-2.5 py-0.5 rounded-full text-xs font-bold border ${info.badgeClass}`;
        titleEl.textContent = info.title;
        descEl.textContent = info.desc;
      }
    });
  });
}

function initClassroomAgreements() {
  const form = document.getElementById("form-pacto-aula");
  const inputAutor = document.getElementById("input-pacto-estudiante");
  const inputTexto = document.getElementById("input-pacto-texto");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const autor = inputAutor.value.trim();
      const texto = inputTexto.value.trim();

      if (!autor || !texto) return;

      window.soundFx.playCorrect();
      triggerConfetti();

      // Agregar al inicio del arreglo
      AppState.agreements.unshift({ autor, texto });
      if (AppState.agreements.length > 8) {
        AppState.agreements.pop();
      }
      saveState();

      inputTexto.value = "";
      renderClassroomAgreements();
      addPoints(30, "Compromiso de aula fijado");
    });
  }

  renderClassroomAgreements();
}

function renderClassroomAgreements() {
  const listEl = document.getElementById("mural-pactos-list");
  if (!listEl) return;

  if (AppState.agreements.length === 0) {
    listEl.innerHTML = `<p class="text-xs text-slate-500 italic">Aún no hay compromisos fijados. ¡Sé el primero en firmar!</p>`;
    return;
  }

  listEl.innerHTML = AppState.agreements.map((p, idx) => `
    <div class="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-sm flex items-start gap-2 text-xs">
      <span class="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center shrink-0 text-[10px]">
        ${idx + 1}
      </span>
      <div>
        <strong class="text-slate-900">${escapeHtml(p.autor)}:</strong>
        <span class="text-slate-700">"${escapeHtml(p.texto)}"</span>
      </div>
    </div>
  `).join("");
}

// ==============================================================================
// 6. VIDEO-AULA (INTEGRACIÓN CON YOUTUBE Y FICHA PEDAGÓGICA)
// ==============================================================================
function renderVideos(filter = "todos") {
  const container = document.getElementById("videos-grid-container");
  if (!container) return;

  const filteredVideos = EDU_DATA.videos.filter(v => {
    if (filter === "todos") return true;
    return v.pillarId === filter;
  });

  if (filteredVideos.length === 0) {
    container.innerHTML = `<p class="col-span-2 text-center text-sm text-slate-500 py-8">No se encontraron videos para esta categoría.</p>`;
    return;
  }

  container.innerHTML = filteredVideos.map(video => {
    const isCompleted = AppState.completedVideos.includes(video.id);
    return `
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md flex flex-col justify-between card-glow">
        <div>
          <!-- Thumbnail simulado con botón de Play -->
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 mb-4 group cursor-pointer video-card-play" data-videoid="${video.id}">
            <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100">
            <div class="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/20 transition-all">
              <div class="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-xl shadow-xl group-hover:scale-110 transition-transform">
                <i class="fa-solid fa-play ml-0.5"></i>
              </div>
            </div>
            <span class="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              ${video.duration}
            </span>
          </div>

          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${video.badgeColor} text-white">
              ${video.category}
            </span>
            <span class="text-xs font-semibold text-slate-500">${video.fuente}</span>
          </div>

          <h3 class="text-lg font-bold font-heading text-slate-900 mb-2">
            ${video.title}
          </h3>

          <!-- Pregunta reflexiva previa -->
          <div class="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs mb-3">
            <strong class="text-amber-900 block mb-0.5">🤔 Para pensar antes de ver:</strong>
            <p class="text-slate-700 italic">"${video.preguntaAntes}"</p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button type="button" class="video-card-play text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5" data-videoid="${video.id}">
            <i class="fa-solid fa-circle-play"></i>
            <span>Ver con Ficha Pedagógica</span>
          </button>

          ${isCompleted ? `
            <span class="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold">
              <i class="fa-solid fa-circle-check"></i> Reflexionado
            </span>
          ` : `
            <span class="text-[11px] text-slate-400 font-medium">+40 pts</span>
          `}
        </div>
      </div>
    `;
  }).join("");

  // Agregar escuchador a las tarjetas para abrir modal
  document.querySelectorAll(".video-card-play").forEach(el => {
    el.addEventListener("click", () => {
      const vidId = el.getAttribute("data-videoid");
      openVideoModal(vidId);
    });
  });

  // Filtros de video
  const filterButtons = document.querySelectorAll(".video-filter-btn");
  filterButtons.forEach(btn => {
    btn.onclick = () => {
      window.soundFx.playClick();
      filterButtons.forEach(b => {
        b.className = "video-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all";
      });
      btn.className = "video-filter-btn active px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-sm transition-all";
      const f = btn.getAttribute("data-filter");
      renderVideos(f);
    };
  });
}

function initVideoModal() {
  const modal = document.getElementById("modal-video-player");
  const closeBtn = document.getElementById("btn-close-video");
  const iframe = document.getElementById("video-modal-iframe");
  const claimBtn = document.getElementById("btn-video-modal-claim");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    if (iframe) iframe.src = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      if (iframe) iframe.src = "";
    }
  });

  if (claimBtn) {
    claimBtn.addEventListener("click", () => {
      const vidId = claimBtn.getAttribute("data-active-videoid");
      if (!vidId) return;

      if (!AppState.completedVideos.includes(vidId)) {
        AppState.completedVideos.push(vidId);
        window.soundFx.playCorrect();
        triggerConfetti();
        addPoints(40, "Reflexión de video completada");
        renderVideos();
      }

      modal.classList.add("hidden");
      modal.classList.remove("flex");
      if (iframe) iframe.src = "";
    });
  }
}

function openVideoModal(videoId) {
  window.soundFx.playClick();
  const video = EDU_DATA.videos.find(v => v.id === videoId);
  if (!video) return;

  const modal = document.getElementById("modal-video-player");
  const iframe = document.getElementById("video-modal-iframe");
  const catEl = document.getElementById("video-modal-category");
  const durEl = document.getElementById("video-modal-duration");
  const titleEl = document.getElementById("video-modal-title");
  const pregAntes = document.getElementById("video-modal-pregunta-antes");
  const pregDesp = document.getElementById("video-modal-pregunta-despues");
  const claimBtn = document.getElementById("btn-video-modal-claim");

  if (iframe) iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`;
  if (catEl) catEl.textContent = video.category;
  if (durEl) durEl.textContent = `⏱️ ${video.duration} • ${video.fuente}`;
  if (titleEl) titleEl.textContent = video.title;
  if (pregAntes) pregAntes.textContent = video.preguntaAntes;
  if (pregDesp) pregDesp.textContent = video.preguntaDespues;

  if (claimBtn) {
    claimBtn.setAttribute("data-active-videoid", video.id);
    if (AppState.completedVideos.includes(video.id)) {
      claimBtn.disabled = true;
      claimBtn.textContent = "¡Ya ganaste puntos con este video! ✨";
      claimBtn.className = "text-xs bg-slate-200 text-slate-600 font-bold px-4 py-2 rounded-xl cursor-default";
    } else {
      claimBtn.disabled = false;
      claimBtn.textContent = "¡Completar y Ganar 40 pts!";
      claimBtn.className = "btn-pressable text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-sm";
    }
  }

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

// ==============================================================================
// 7. MOTOR DE CUESTIONARIOS GAMIFICADOS EN VIVO (ESTILO KAHOOT!)
// ==============================================================================
function initKahootEngine() {
  const startBtn = document.getElementById("btn-start-kahoot");
  const nextBtn = document.getElementById("btn-next-kahoot");
  const replayBtn = document.getElementById("btn-replay-kahoot");
  const answersGrid = document.getElementById("kahoot-answers-grid");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startKahootGame();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      window.soundFx.playClick();
      AppState.kahoot.currentIndex++;
      if (AppState.kahoot.currentIndex < AppState.kahoot.questions.length) {
        showKahootQuestion(AppState.kahoot.currentIndex);
      } else {
        showKahootFinish();
      }
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      resetKahootToLobby();
    });
  }

  if (answersGrid) {
    const buttons = answersGrid.querySelectorAll(".kahoot-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedIndex = parseInt(btn.getAttribute("data-index"), 10);
        handleKahootAnswer(selectedIndex);
      });
    });
  }
}

function resetKahootToLobby() {
  if (AppState.kahoot.intervalId) {
    clearInterval(AppState.kahoot.intervalId);
    AppState.kahoot.intervalId = null;
  }
  AppState.kahoot.active = false;

  const startScreen = document.getElementById("kahoot-screen-start");
  const qScreen = document.getElementById("kahoot-screen-question");
  const fbScreen = document.getElementById("kahoot-screen-feedback");
  const finScreen = document.getElementById("kahoot-screen-finish");

  if (startScreen) startScreen.classList.remove("hidden");
  if (qScreen) qScreen.classList.add("hidden");
  if (fbScreen) fbScreen.classList.add("hidden");
  if (finScreen) finScreen.classList.add("hidden");
}

function startKahootGame() {
  window.soundFx.playClick();
  AppState.kahoot.active = true;
  AppState.kahoot.questions = EDU_DATA.kahootQuizzes[AppState.grade] || EDU_DATA.kahootQuizzes.exploradores;
  AppState.kahoot.currentIndex = 0;
  AppState.kahoot.score = 0;
  AppState.kahoot.correctCount = 0;

  document.getElementById("kahoot-screen-start").classList.add("hidden");
  document.getElementById("kahoot-screen-feedback").classList.add("hidden");
  document.getElementById("kahoot-screen-finish").classList.add("hidden");

  showKahootQuestion(0);
}

function showKahootQuestion(index) {
  const q = AppState.kahoot.questions[index];
  if (!q) return;

  const qScreen = document.getElementById("kahoot-screen-question");
  const fbScreen = document.getElementById("kahoot-screen-feedback");
  qScreen.classList.remove("hidden");
  fbScreen.classList.add("hidden");

  // Rellenar información
  document.getElementById("kahoot-q-tracker").textContent = `Pregunta ${index + 1} de ${AppState.kahoot.questions.length}`;
  document.getElementById("kahoot-pilar-tag").textContent = `Pilar MEN: ${q.pilar}`;
  document.getElementById("kahoot-scenario-text").textContent = `Situación: "${q.situacion}"`;
  document.getElementById("kahoot-question-text").textContent = q.pregunta;

  // Botones de respuesta
  const buttons = document.querySelectorAll("#kahoot-answers-grid .kahoot-btn");
  buttons.forEach((btn, i) => {
    btn.disabled = false;
    const opt = q.opciones[i];
    if (opt) {
      btn.querySelector(".option-text").textContent = opt.text;
    }
  });

  // Temporizador de 20 segundos
  startKahootTimer(q.tiempo || 20);
}

function startKahootTimer(seconds) {
  if (AppState.kahoot.intervalId) {
    clearInterval(AppState.kahoot.intervalId);
  }

  AppState.kahoot.timer = seconds;
  const circleEl = document.getElementById("kahoot-timer-circle");
  const barEl = document.getElementById("kahoot-timer-progress-bar");

  if (circleEl) circleEl.textContent = seconds;
  if (barEl) {
    barEl.style.width = "100%";
    barEl.className = "bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500 h-full w-full transition-all duration-1000 ease-linear";
  }

  AppState.kahoot.intervalId = setInterval(() => {
    AppState.kahoot.timer--;
    if (circleEl) circleEl.textContent = AppState.kahoot.timer;

    if (barEl) {
      const pct = (AppState.kahoot.timer / seconds) * 100;
      barEl.style.width = `${pct}%`;
    }

    // Tic-Tac sintetizado
    if (AppState.kahoot.timer <= 5 && AppState.kahoot.timer > 0) {
      window.soundFx.playTick(true);
    } else if (AppState.kahoot.timer > 5) {
      window.soundFx.playTick(false);
    }

    if (AppState.kahoot.timer <= 0) {
      clearInterval(AppState.kahoot.intervalId);
      AppState.kahoot.intervalId = null;
      handleKahootAnswer(-1); // Tiempo agotado
    }
  }, 1000);
}

function handleKahootAnswer(selectedIndex) {
  if (AppState.kahoot.intervalId) {
    clearInterval(AppState.kahoot.intervalId);
    AppState.kahoot.intervalId = null;
  }

  // Deshabilitar botones para evitar dobles clics
  document.querySelectorAll("#kahoot-answers-grid .kahoot-btn").forEach(b => b.disabled = true);

  const currentQ = AppState.kahoot.questions[AppState.kahoot.currentIndex];
  const isCorrect = selectedIndex === currentQ.correctIndex;

  const qScreen = document.getElementById("kahoot-screen-question");
  const fbScreen = document.getElementById("kahoot-screen-feedback");
  const iconBox = document.getElementById("feedback-icon-container");
  const headline = document.getElementById("feedback-headline");
  const ptsAwarded = document.getElementById("feedback-points-awarded");
  const explanation = document.getElementById("feedback-explanation-text");

  qScreen.classList.add("hidden");
  fbScreen.classList.remove("hidden");

  explanation.textContent = currentQ.explicacion;

  if (isCorrect) {
    window.soundFx.playCorrect();
    triggerConfetti();
    const timeBonus = Math.max(0, AppState.kahoot.timer * 5);
    const earned = 100 + timeBonus;

    AppState.kahoot.score += earned;
    AppState.kahoot.correctCount++;
    addPoints(earned, "Pregunta Kahoot acertada");

    iconBox.className = "w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-xl bg-emerald-500 text-white animate-bounce";
    iconBox.textContent = "🎉";
    headline.textContent = "¡Respuesta Correcta!";
    headline.className = "text-2xl sm:text-3xl font-extrabold font-heading text-emerald-400";
    ptsAwarded.textContent = `+${earned} Puntos Ganados (${100} base + ${timeBonus} por velocidad)`;
  } else {
    window.soundFx.playIncorrect();
    const correctOption = currentQ.opciones[currentQ.correctIndex];
    iconBox.className = "w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl shadow-xl bg-amber-500 text-slate-950";
    iconBox.textContent = "💡";
    headline.textContent = selectedIndex === -1 ? "¡Tiempo Agotado!" : "¡Oportunidad de Aprender!";
    headline.className = "text-2xl sm:text-3xl font-extrabold font-heading text-amber-400";
    ptsAwarded.textContent = `La respuesta recomendada era: ${correctOption.icon} "${correctOption.text}"`;
  }
}

function showKahootFinish() {
  window.soundFx.playBadge();
  triggerConfetti();

  document.getElementById("kahoot-screen-question").classList.add("hidden");
  document.getElementById("kahoot-screen-feedback").classList.add("hidden");
  const finishScreen = document.getElementById("kahoot-screen-finish");
  finishScreen.classList.remove("hidden");

  document.getElementById("kahoot-final-score").textContent = `${AppState.kahoot.score} pts`;
  document.getElementById("kahoot-final-accuracy").textContent = `${AppState.kahoot.correctCount} / ${AppState.kahoot.questions.length}`;

  let rank = "Explorador Cívico";
  if (AppState.kahoot.correctCount === AppState.kahoot.questions.length) {
    rank = "🌟 Ciudadano Ejemplar";
  } else if (AppState.kahoot.correctCount >= 2) {
    rank = "🌱 Constructor de Paz";
  }
  document.getElementById("kahoot-final-rank").textContent = rank;
}

// ==============================================================================
// 8. LABORATORIO DE CASOS Y DILEMAS MORALES ("¿QUÉ HARÍAS TÚ?")
// ==============================================================================
function renderDilemmas() {
  const container = document.getElementById("dilemmas-cards-container");
  if (!container) return;

  const relevantDilemmas = EDU_DATA.dilemmas.filter(d => d.gradeLevel === AppState.grade);

  container.innerHTML = relevantDilemmas.map((dilema, idx) => {
    const answeredAltId = AppState.completedDilemmas[dilema.id];

    return `
      <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-lg flex flex-col justify-between card-glow">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Caso #${idx + 1} • ${dilema.tag}
            </span>
            <div class="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-lg ${dilema.iconColor}">
              <i class="fa-solid ${dilema.icon}"></i>
            </div>
          </div>

          <h3 class="text-xl font-bold font-heading text-slate-900 mb-2">
            ${dilema.title}
          </h3>

          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5">
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "${dilema.contexto}"
            </p>
          </div>

          <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            ${dilema.pregunta}
          </p>

          <!-- 3 Alternativas -->
          <div class="space-y-2.5">
            ${dilema.alternativas.map((alt, aIdx) => `
              <button type="button" class="dilemma-choice-btn w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs sm:text-sm flex items-start gap-3 ${answeredAltId === alt.id ? 'border-blue-600 bg-blue-50 font-bold' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}" data-dilemma-id="${dilema.id}" data-alt-id="${alt.id}">
                <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  ${String.fromCharCode(65 + aIdx)}
                </span>
                <span class="text-slate-800 leading-snug">${alt.texto}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Panel de Consecuencia / Evaluación Pedagógica -->
        <div id="dilemma-feedback-${dilema.id}" class="mt-5 pt-4 border-t border-slate-100 ${answeredAltId ? '' : 'hidden'}">
          ${renderDilemmaFeedbackContent(dilema, answeredAltId)}
        </div>
      </div>
    `;
  }).join("");

  // Agregar escuchadores a las alternativas
  document.querySelectorAll(".dilemma-choice-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const dilemmaId = btn.getAttribute("data-dilemma-id");
      const altId = btn.getAttribute("data-alt-id");
      handleDilemmaChoice(dilemmaId, altId);
    });
  });
}

function handleDilemmaChoice(dilemmaId, altId) {
  const dilema = EDU_DATA.dilemmas.find(d => d.id === dilemmaId);
  if (!dilema) return;

  const alt = dilema.alternativas.find(a => a.id === altId);
  if (!alt) return;

  const alreadyAnswered = AppState.completedDilemmas[dilemmaId];
  AppState.completedDilemmas[dilemmaId] = altId;
  saveState();

  if (alt.tipo === "excelente") {
    window.soundFx.playCorrect();
    triggerConfetti();
    if (!alreadyAnswered) {
      addPoints(50, "Decisión ejemplar en dilema moral");
    }
  } else {
    window.soundFx.playClick();
  }

  // Actualizar UI
  const feedbackContainer = document.getElementById(`dilemma-feedback-${dilemmaId}`);
  if (feedbackContainer) {
    feedbackContainer.innerHTML = renderDilemmaFeedbackContent(dilema, altId);
    feedbackContainer.classList.remove("hidden");
  }

  // Refrescar estilos activos de los botones del dilema
  const parentCard = feedbackContainer.closest(".card-glow");
  if (parentCard) {
    parentCard.querySelectorAll(".dilemma-choice-btn").forEach(b => {
      const bAltId = b.getAttribute("data-alt-id");
      if (bAltId === altId) {
        b.className = "dilemma-choice-btn w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs sm:text-sm flex items-start gap-3 border-blue-600 bg-blue-50 font-bold";
      } else {
        b.className = "dilemma-choice-btn w-full text-left p-3.5 rounded-2xl border-2 transition-all text-xs sm:text-sm flex items-start gap-3 border-slate-200 hover:border-blue-300 hover:bg-slate-50";
      }
    });
  }
}

function renderDilemmaFeedbackContent(dilema, altId) {
  if (!altId) return "";
  const alt = dilema.alternativas.find(a => a.id === altId);
  if (!alt) return "";

  let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
  let icon = "fa-circle-check text-emerald-600";
  if (alt.tipo === "regular") {
    badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
    icon = "fa-circle-exclamation text-amber-600";
  } else if (alt.tipo === "incorrecta") {
    badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
    icon = "fa-circle-xmark text-rose-600";
  }

  return `
    <div class="p-3.5 rounded-2xl border ${badgeColor}">
      <div class="flex items-center gap-2 mb-1.5 font-bold text-xs">
        <i class="fa-solid ${icon}"></i>
        <span>${alt.impacto}</span>
      </div>
      <p class="text-xs leading-relaxed text-slate-700">
        ${alt.analisis}
      </p>
    </div>
  `;
}

// ==============================================================================
// 9. GENERADOR DE DIPLOMA DE "CIUDADANO EJEMPLAR" IMPRIMIBLE
// ==============================================================================
function initDiplomaGenerator() {
  const nameInput = document.getElementById("diploma-input-name");
  const schoolInput = document.getElementById("diploma-input-school");
  const gradeInput = document.getElementById("diploma-input-grade");
  const dateInput = document.getElementById("diploma-input-date");
  const teacherInput = document.getElementById("diploma-input-teacher");
  const printBtn = document.getElementById("btn-print-diploma");

  const inputs = [nameInput, schoolInput, gradeInput, dateInput, teacherInput];
  inputs.forEach(inp => {
    if (inp) {
      inp.addEventListener("input", updateDiplomaPreview);
    }
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.soundFx.playClick();
      window.print();
    });
  }

  updateDiplomaPreview();
}

function updateDiplomaPreview() {
  const nameVal = document.getElementById("diploma-input-name")?.value.trim() || "Estudiante de Colombia";
  const schoolVal = document.getElementById("diploma-input-school")?.value.trim() || "Institución Educativa";
  const gradeVal = document.getElementById("diploma-input-grade")?.value || "Primaria";
  const dateVal = document.getElementById("diploma-input-date")?.value.trim() || "2026";
  const teacherVal = document.getElementById("diploma-input-teacher")?.value.trim() || "Docente Orientador";

  const prevName = document.getElementById("diploma-preview-name");
  const prevSchool = document.getElementById("diploma-preview-school");
  const prevGradeDate = document.getElementById("diploma-preview-grade-date");
  const prevTeacher = document.getElementById("diploma-preview-teacher");

  if (prevName) prevName.textContent = nameVal;
  if (prevSchool) prevSchool.textContent = schoolVal;
  if (prevGradeDate) prevGradeDate.textContent = `${gradeVal} • ${dateVal}`;
  if (prevTeacher) prevTeacher.textContent = teacherVal;
}

// ==============================================================================
// 10. SISTEMA DE MEDALLAS Y RECONOCIMIENTOS
// ==============================================================================
function initBadgesModal() {
  const openBtn = document.getElementById("btn-open-badges");
  const closeBtn = document.getElementById("btn-close-badges");
  const modal = document.getElementById("modal-badges");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      window.soundFx.playClick();
      renderBadgesList();
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
    });
  }
}

function checkBadges() {
  let newlyUnlocked = false;

  EDU_DATA.badges.forEach(b => {
    if (!AppState.unlockedBadges.includes(b.id) && AppState.points >= b.puntosReq) {
      AppState.unlockedBadges.push(b.id);
      newlyUnlocked = true;
    }
  });

  if (newlyUnlocked) {
    saveState();
    updateUIStats();
    window.soundFx.playBadge();
    triggerConfetti();
  }
}

function renderBadgesList() {
  const listEl = document.getElementById("badges-list-modal");
  if (!listEl) return;

  listEl.innerHTML = EDU_DATA.badges.map(b => {
    const isUnlocked = AppState.unlockedBadges.includes(b.id);
    return `
      <div class="p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${isUnlocked ? b.color : 'bg-slate-50 border-slate-200 opacity-60'}">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${isUnlocked ? 'bg-white shadow' : 'bg-slate-200 text-slate-400'}">
            <i class="fa-solid ${b.icon}"></i>
          </div>
          <div>
            <h4 class="font-bold text-sm text-slate-900">${b.nombre}</h4>
            <p class="text-xs text-slate-600">${b.desc}</p>
          </div>
        </div>
        <div>
          ${isUnlocked ? `
            <span class="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full shadow-sm">
              <i class="fa-solid fa-check"></i> Desbloqueada
            </span>
          ` : `
            <span class="text-[11px] text-slate-500 font-bold">
              ${b.puntosReq} pts
            </span>
          `}
        </div>
      </div>
    `;
  }).join("");
}

// ==============================================================================
// 11. UTILIDADES (CONFETTI, ESCAPE HTML)
// ==============================================================================
function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function escapeHtml(string) {
  const entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return String(string).replace(/[&<>"']/g, s => entityMap[s]);
}
