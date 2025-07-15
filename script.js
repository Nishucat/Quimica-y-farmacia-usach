
const malla = {
  1: [
    { id: 'mate1', nombre: 'Matemática I' },
    { id: 'quimica1', nombre: 'Química General I' },
    { id: 'bioCel', nombre: 'Biología Celular' },
    { id: 'introFarm', nombre: 'Introducción a la Farmacia' }
  ],
  2: [
    { id: 'mate2', nombre: 'Matemática II', req: ['mate1'] },
    { id: 'quimica2', nombre: 'Química General II', req: ['quimica1'] },
    { id: 'fisica', nombre: 'Física General', req: ['mate1'] },
    { id: 'anatomia', nombre: 'Anatomía' },
    { id: 'comunicacion', nombre: 'Comunicación Oral y Escrita' }
  ],
  
  3: [
    {"id": "orga1", "nombre": "Química Orgánica I", "req": ["quimica2"]},
    {"id": "micro1", "nombre": "Microbiología General"},
    {"id": "fisicoq1", "nombre": "Fisicoquímica I", "req": ["fisica", "mate2"]},
    {"id": "histologia", "nombre": "Histología"}
  ],
  4: [
    {"id": "orga2", "nombre": "Química Orgánica II", "req": ["orga1"]},
    {"id": "micro2", "nombre": "Microbiología Aplicada", "req": ["micro1"]},
    {"id": "fisicoq2", "nombre": "Fisicoquímica II", "req": ["fisicoq1"]},
    {"id": "bioquimica", "nombre": "Bioquímica"}
  ],
  5: [
    {"id": "analitica1", "nombre": "Química Analítica I", "req": ["quimica2"]},
    {"id": "farmacognosia", "nombre": "Farmacognosia", "req": ["orga2"]},
    {"id": "biofarmacia", "nombre": "Biofarmacia", "req": ["bioquimica"]}
  ],
  6: [
    {"id": "analitica2", "nombre": "Química Analítica II", "req": ["analitica1"]},
    {"id": "farmacologia1", "nombre": "Farmacología I", "req": ["bioquimica"]},
    {"id": "tecnologia1", "nombre": "Tecnología Farmacéutica I", "req": ["biofarmacia"]}
  ],
  7: [
    {"id": "farmacologia2", "nombre": "Farmacología II", "req": ["farmacologia1"]},
    {"id": "tecnologia2", "nombre": "Tecnología Farmacéutica II", "req": ["tecnologia1"]},
    {"id": "legislacion", "nombre": "Legislación Farmacéutica"}
  ],
  8: [
    {"id": "toxicol", "nombre": "Toxicología", "req": ["farmacologia2"]},
    {"id": "controlcalidad", "nombre": "Control de Calidad", "req": ["analitica2"]},
    {"id": "gestion", "nombre": "Gestión Farmacéutica"}
  ],
  9: [
    {"id": "practica1", "nombre": "Práctica Profesional I", "req": ["tecnologia2", "farmacologia2"]},
    {"id": "seminario", "nombre": "Seminario de Tesis", "req": ["gestion"]}
  ],
  10: [
    {"id": "practica2", "nombre": "Práctica Profesional II", "req": ["practica1"]},
    {"id": "tesis", "nombre": "Trabajo de Tesis", "req": ["seminario"]}
  ],
// Agregar semestres 3 al 10 aquí luego
};

function crearMalla() {
  const contenedor = document.getElementById("contenedor-malla");
  for (let semestre in malla) {
    const div = document.createElement("div");
    div.className = "semestre bloqueado";
    div.id = "semestre" + semestre;
    const h2 = document.createElement("h2");
    h2.textContent = "Semestre " + semestre;
    div.appendChild(h2);

    malla[semestre].forEach(ramo => {
      const ramoDiv = document.createElement("div");
      ramoDiv.className = "ramo bloqueado";
      ramoDiv.id = ramo.id;
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.disabled = true;
      checkbox.onchange = () => marcar(checkbox, ramo);
      label.appendChild(checkbox);
      label.append(" " + ramo.nombre);
      ramoDiv.appendChild(label);
      div.appendChild(ramoDiv);
    });

    contenedor.appendChild(div);
  }

  desbloquearSemestre(1); // activar el primero
}

function desbloquearSemestre(n) {
  const s = document.getElementById("semestre" + n);
  if (!s) return;
  s.classList.remove("bloqueado");
  const ramos = s.querySelectorAll(".ramo");
  ramos.forEach(r => {
    r.classList.remove("bloqueado");
    r.classList.add("desbloqueado");
    r.querySelector("input").disabled = false;
  });
}

function marcar(checkbox, ramo) {
  const div = document.getElementById(ramo.id);
  if (checkbox.checked) {
    div.classList.remove("desbloqueado");
    div.classList.add("completado");
    verificarDesbloqueos();
  } else {
    div.classList.remove("completado");
    div.classList.add("desbloqueado");
    checkbox.checked = false;
    verificarDesbloqueos();
  }
}

function verificarDesbloqueos() {
  for (let semestre in malla) {
    for (let ramo of malla[semestre]) {
      if (ramo.req) {
        const puede = ramo.req.every(rid => {
          const input = document.querySelector(`#${rid} input`);
          return input && input.checked;
        });
        const div = document.getElementById(ramo.id);
        const input = div.querySelector("input");
        if (puede) {
          div.classList.remove("bloqueado");
          div.classList.add("desbloqueado");
          input.disabled = false;
        } else {
          if (!input.checked) {
            div.classList.add("bloqueado");
            div.classList.remove("desbloqueado");
            input.disabled = true;
          }
        }
      }
    }
  }

  // desbloquea el siguiente semestre si al menos 1 ramo está desbloqueado
  for (let i = 2; i <= 10; i++) {
    const anterior = document.getElementById("semestre" + (i - 1));
    const algunoCompletado = anterior?.querySelectorAll(".ramo input:checked").length > 0;
    if (algunoCompletado) desbloquearSemestre(i);
  }
}

window.onload = crearMalla;
