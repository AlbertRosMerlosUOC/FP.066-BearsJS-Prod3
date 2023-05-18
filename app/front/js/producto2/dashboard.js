// Seleccionar el formulario y los contenedores de la tarjetas
const form = document.querySelector("#myForm");
const modal = document.querySelector("#formTask");
const dropUnassigned = document.getElementById("unassignedTasks");
const dropDay1 = document.getElementById("day1");
const dropDay2 = document.getElementById("day2");
const dropDay3 = document.getElementById("day3");
const dropDay4 = document.getElementById("day4");
const dropDay5 = document.getElementById("day5");
const dropDay6 = document.getElementById("day6");
const dropDay7 = document.getElementById("day7");
const targetCard = document.getElementById("target-card");

// Agregar controladores de eventos para eventos de arrastrar y soltar
dropUnassigned.addEventListener("dragover", dragOver);
dropUnassigned.addEventListener("drop", drop);
dropDay1.addEventListener("dragover", dragOver);
dropDay1.addEventListener("drop", drop);
dropDay2.addEventListener("dragover", dragOver);
dropDay2.addEventListener("drop", drop);
dropDay3.addEventListener("dragover", dragOver);
dropDay3.addEventListener("drop", drop);
dropDay4.addEventListener("dragover", dragOver);
dropDay4.addEventListener("drop", drop);
dropDay5.addEventListener("dragover", dragOver);
dropDay5.addEventListener("drop", drop);
dropDay6.addEventListener("dragover", dragOver);
dropDay6.addEventListener("drop", drop);
dropDay7.addEventListener("dragover", dragOver);
dropDay7.addEventListener("drop", drop);

// Agregar un escuchador de evento "SUBMIT" para el formulario
form.addEventListener("submit", (event) => {
  // Prevenir que el formulario se envíe
  event.preventDefault();

  // Capturar los valores de los campos de entrada
  const name = document.querySelector("#nameInput").value;
  const desc = document.querySelector("#descInput").value;
  const hIni = document.querySelector("#iniInput").value;
  const hEnd = document.querySelector("#endInput").value;
  const tTyp = document.querySelector('input[name="taskType"]:checked').value;
  const user = document.querySelector("#userInput").value;
  const inDay = document.querySelector("#inDay").value;
  const fini = document.querySelector("#finishedInput").checked ? "1" : "0";

  // Crear un nuevo elemento HTML para la tarjeta
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("cardTask");
  card.innerHTML = `
    <p class="fName"><b>${name}</b></p>
    <p class="fDesc">${desc}</p>
    <input type="hidden" class="fHIni" value="${hIni}"/>
    <input type="hidden" class="fHEnd" value="${hEnd}"/>
    <input type="hidden" class="fTTyp" value="${tTyp}"/>
    <input type="hidden" class="fUser" value="${user}"/>
    <input type="hidden" class="fDays" value="${inDay}"/>
    <input type="hidden" class="fFini" value="${fini}"/>
    <div class="buttonsDiv">
      <button type="button" class="btn btn-success xx-small button-editTask" data-bs-toggle="modal" data-bs-target="#formTask"><i class="fa fa-edit fa-lg"></i></button>
      <button type="button" class="btn btn-danger xx-small button-deleteTask" data-bs-toggle="modal" data-bs-target="#myModalDelete"><i class="fa fa-trash-o fa-lg"></i></button>
    </div>
  `;

  // Obtener el primer botón dentro del elemento "card"
  const editTask = card.querySelector(".button-editTask");

  // Agregar un controlador de eventos "click" al segundo botón
  editTask.addEventListener("click", () => {
    // Reiniciamos el formulario
    form.reset();
    // Añadimos la información de la tarea al formulario
    const editCard = editTask.parentElement.parentElement;
    document.querySelector("#nameInput").value =
      editCard.querySelector(".fName").textContent;
    document.querySelector("#descInput").value =
      editCard.querySelector(".fDesc").textContent;
    document.querySelector("#iniInput").value =
      editCard.querySelector(".fHIni").value;
    document.querySelector("#endInput").value =
      editCard.querySelector(".fHEnd").value;
    document.querySelector(
      'input[name="taskType"][value="' +
        editCard.querySelector(".fTTyp").value +
        '"]'
    ).checked = "true";
    document.querySelector("#userInput").value =
      editCard.querySelector(".fUser").value;
    document.querySelector("#inDay").value =
      editCard.querySelector(".fDays").value;
    document.querySelector("#finishedInput").checked =
      editCard.querySelector(".fFini").value == "1" ? "checked" : "";
    // Añadimos una clase a la tarjeta que estamos editando para poder actualizarla después
    editCard.classList.add("editing");
    // Ocultamos el botón de crear tarea
    document.getElementById("modal-add-create").style.display = "none";
    // Mostramos el botón de guardar cambios (para editar la tarea)
    document.getElementById("modal-add-save").style.display = "block";
    // Ocultamos el campo de añadir al día en la edición de la tarjeta
    document.querySelector(".div-add-into").style.display = "none";
  });

  // Obtener el segundo botón dentro del elemento "card"
  const deleteTask = card.querySelector(".button-deleteTask");

  // Agregar un controlador de eventos "click" al segundo botón
  deleteTask.addEventListener("click", () => {
    // Obtener el elemento "div" que contiene el botón y eliminarlo
    const dropUnassigned = deleteTask.parentElement.parentElement;

    const modalDelete = document.querySelector("#myModalDelete");
    const modalInstance = bootstrap.Modal.getInstance(modalDelete);
    modalInstance.show();

    // Funcionalidad de quitar tarjeta (elimina tarjeta)
    const deleteCard = document.querySelector("#deleteCard");
    deleteCard.addEventListener("click", () => {
      modalInstance.hide();
      if (card.parentNode) {
        dropUnassigned.remove();
      }
    });
  });

  // Agregar atributo "draggable" al elemento "card"
  card.setAttribute("draggable", true);

  // Agregar controladores de eventos para eventos de arrastrar y soltar
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  function dragStart() {
    // Establecer el efecto de arrastrar
    this.classList.add("dragging");
  }

  function dragEnd() {
    // Restablecer el efecto de arrastrar
    this.classList.remove("dragging");
  }

  // Agregar la tarjeta al contenedor que toque según el día clickado
  var tC = document.getElementById("target-card").value;

  if (tC == "1" || inDay == "L") {
    dropDay1.appendChild(card);
  } else if (tC == "2" || inDay == "M") {
    dropDay2.appendChild(card);
  } else if (tC == "3" || inDay == "X") {
    dropDay3.appendChild(card);
  } else if (tC == "4" || inDay == "J") {
    dropDay4.appendChild(card);
  } else if (tC == "5" || inDay == "V") {
    dropDay5.appendChild(card);
  } else if (tC == "6" || inDay == "S") {
    dropDay6.appendChild(card);
  } else if (tC == "7" || inDay == "D") {
    dropDay7.appendChild(card);
  } else {
    dropUnassigned.appendChild(card);
  }

  // Limpiar los valores del formulario
  form.reset();

  // Cerrar el modal después de agregar la tarjeta
  const modal = document.querySelector("#formTask");
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
});

function dragOver(event) {
  // Prevenir el comportamiento predeterminado
  event.preventDefault();
}

function drop(event) {
  // Prevenir el comportamiento predeterminado
  event.preventDefault();

  // Obtener el elemento arrastrado
  const draggedElement = document.querySelector(".dragging");

  // Verificar en qué div se soltó el elemento y moverlo al div correspondiente
  if (event.target.id === "day1") {
    dropDay1.appendChild(draggedElement);
  } else if (event.target.id === "day2") {
    dropDay2.appendChild(draggedElement);
  } else if (event.target.id === "day3") {
    dropDay3.appendChild(draggedElement);
  } else if (event.target.id === "day4") {
    dropDay4.appendChild(draggedElement);
  } else if (event.target.id === "day5") {
    dropDay5.appendChild(draggedElement);
  } else if (event.target.id === "day6") {
    dropDay6.appendChild(draggedElement);
  } else if (event.target.id === "day7") {
    dropDay7.appendChild(draggedElement);
  } else {
    dropUnassigned.appendChild(draggedElement);
  }
}

// Seleccionamos todos los elementos con la clase "button-add"
const btnAdd = document.querySelectorAll(".button-add");

// Agregamos un evento de click a cada uno de ellos
btnAdd.forEach((btn) => {
  btn.addEventListener("click", () => {
    const idDay = btn.getAttribute("target-day");
    assignTarget(idDay);
    // Ocultamos el campo de añadir al día si se ha clickado en un botón de un día en concreto
    if (idDay != "0") {
      document.querySelector(".div-add-into").style.display = "none";
    }
    // Reiniciamos el formulario
    form.reset();
    // Mostramos el botón de crear tarea
    document.getElementById("modal-add-create").style.display = "block";
    // Ocultamos el botón de guardar cambios (para editar la tarea)
    document.getElementById("modal-add-save").style.display = "none";
  });
});

// Definir la función que se llamará al hacer clic en los botones para añadir tareas
function assignTarget(id) {
  targetCard.value = id;
}

// Funcionalidad de editar tarjeta (editar tarea)
const saveTask = document.querySelector("#modal-add-save");
saveTask.addEventListener("click", () => {
  // Prevenimos que el botón haga un "submit" al ser clicado
  event.preventDefault();
  // Recuperamos la tarjeta de la tarea que estamos editando mediante la clase "editing"
  const editingTask = document.querySelector(".editing");
  // Modificamos el contenido de la tarjeta con los nuevos valores del formulario
  const name = document.querySelector("#nameInput").value;
  const desc = document.querySelector("#descInput").value;
  const hIni = document.querySelector("#iniInput").value;
  const hEnd = document.querySelector("#endInput").value;
  const tTyp = document.querySelector('input[name="taskType"]:checked').value;
  const user = document.querySelector("#userInput").value;
  const days = document.querySelector("#inDay").value;
  const fini = document.querySelector("#finishedInput").checked ? "1" : "0";
  editingTask.innerHTML = `
    <p class="fName"><b>${name}</b></p>
    <p class="fDesc">${desc}</p>
    <input type="hidden" class="fHIni" value="${hIni}"/>
    <input type="hidden" class="fHEnd" value="${hEnd}"/>
    <input type="hidden" class="fTTyp" value="${tTyp}"/>
    <input type="hidden" class="fUser" value="${user}"/>
    <input type="hidden" class="fDays" value="${days}"/>
    <input type="hidden" class="fFini" value="${fini}"/>
    <div class="buttonsDiv">
      <button type="button" class="btn btn-success xx-small button-editTask" data-bs-toggle="modal" data-bs-target="#formTask"><i class="fa fa-edit fa-lg"></i></button>
      <button type="button" class="btn btn-danger xx-small button-deleteTask" data-bs-toggle="modal" data-bs-target="#myModalDelete"><i class="fa fa-trash-o fa-lg"></i></button>
    </div>
  `;

  // Obtener el primer botón dentro del elemento "card"
  const editTask = editingTask.querySelector(".button-editTask");
  // Agregar un controlador de eventos "click" al segundo botón
  editTask.addEventListener("click", () => {
    // Reiniciamos el formulario
    form.reset();
    // Añadimos la información de la tarea al formulario
    const editCard = editTask.parentElement.parentElement;
    document.querySelector("#nameInput").value =
      editCard.querySelector(".fName").textContent;
    document.querySelector("#descInput").value =
      editCard.querySelector(".fDesc").textContent;
    document.querySelector("#iniInput").value =
      editCard.querySelector(".fHIni").value;
    document.querySelector("#endInput").value =
      editCard.querySelector(".fHEnd").value;
    document.querySelector(
      'input[name="taskType"][value="' +
        editCard.querySelector(".fTTyp").value +
        '"]'
    ).checked = "true";
    document.querySelector("#userInput").value =
      editCard.querySelector(".fUser").value;
    document.querySelector("#inDay").value =
      editCard.querySelector(".fDays").value;
    document.querySelector("#finishedInput").checked =
      editCard.querySelector(".fFini").value == "1" ? "checked" : "";
    // Añadimos una clase a la tarjeta que estamos editando para poder actualizarla después
    editCard.classList.add("editing");
    // Ocultamos el botón de crear tarea
    document.getElementById("modal-add-create").style.display = "none";
    // Mostramos el botón de guardar cambios (para editar la tarea)
    document.getElementById("modal-add-save").style.display = "block";
    // Ocultamos el campo de añadir al día en la edición de la tarjeta
    document.querySelector(".div-add-into").style.display = "none";
  });

  // Obtener el segundo botón dentro del elemento "card"
  const deleteTask = editingTask.querySelector(".button-deleteTask");

  // Agregar un controlador de eventos "click" al segundo botón
  deleteTask.addEventListener("click", () => {
    // Obtener el elemento "div" que contiene el botón y eliminarlo
    const dropUnassigned = deleteTask.parentElement.parentElement;

    const modalDelete = document.querySelector("#myModalDelete");
    const modalInstance = bootstrap.Modal.getInstance(modalDelete);
    modalInstance.show();

    // Funcionalidad de quitar tarjeta (elimina tarjeta)
    const deleteCard = document.querySelector("#deleteCard");
    deleteCard.addEventListener("click", () => {
      modalInstance.hide();
      if (editingTask.parentNode) {
        dropUnassigned.remove();
      }
    });
  });

  // Limpiar los valores del formulario
  form.reset();

  // Cerrar el modal después de agregar la tarjeta
  const modal = document.querySelector("#formTask");
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
});

modal.addEventListener("hidden.bs.modal", function (event) {
  // Eliminamos la clase "editing" de cualquier tarea que se haya editado
  const editingTask = document.querySelectorAll(".editing");
  for (let i = 0; i < editingTask.length; i++) {
    editingTask[i].classList.remove("editing");
  }
  // Mostramos el campo de añadir al día
  document.querySelector(".div-add-into").style.display = "block";
});

// Recuperación del parámetro "_id" (identificador de semana) pasado por URL
const idWeek = new URLSearchParams(window.location.search).get("_id");

function writeCard(item) {
  // Crear un nuevo elemento HTML para la tarjeta
  const card = document.createElement("div");
  var finished = item.finished ? "1" : "0";
  card.classList.add("card");
  card.classList.add("cardTask");
  card.innerHTML = `
    <p class="fName"><b>${item.name}</b></p>
    <p class="fDesc">${item.description}</p>
    <input type="hidden" class="fHIni" value="${item.hour_ini}"/>
    <input type="hidden" class="fHEnd" value="${item.hour_end}"/>
    <input type="hidden" class="fTTyp" value="${item.type}"/>
    <input type="hidden" class="fUser" value="${item.user}"/>
    <input type="hidden" class="fDays" value="${item.in_day}"/>
    <input type="hidden" class="fFini" value="${finished}"/>
    <div class="buttonsDiv">
      <button type="button" class="btn btn-success xx-small button-editTask" data-bs-toggle="modal" data-bs-target="#formTask"><i class="fa fa-edit fa-lg"></i></button>
      <button type="button" class="btn btn-danger xx-small button-deleteTask" data-bs-toggle="modal" data-bs-target="#myModalDelete"><i class="fa fa-trash-o fa-lg"></i></button>
    </div>
  `;

  // Obtener el primer botón dentro del elemento "card"
  const editTask = card.querySelector(".button-editTask");

  // Agregar un controlador de eventos "click" al segundo botón
  editTask.addEventListener("click", () => {
    // Reiniciamos el formulario
    form.reset();
    // Añadimos la información de la tarea al formulario
    const editCard = editTask.parentElement.parentElement;
    document.querySelector("#nameInput").value =
      editCard.querySelector(".fName").textContent;
    document.querySelector("#descInput").value =
      editCard.querySelector(".fDesc").textContent;
    document.querySelector("#iniInput").value =
      editCard.querySelector(".fHIni").value;
    document.querySelector("#endInput").value =
      editCard.querySelector(".fHEnd").value;
    document.querySelector(
      'input[name="taskType"][value="' +
        editCard.querySelector(".fTTyp").value +
        '"]'
    ).checked = "true";
    document.querySelector("#userInput").value =
      editCard.querySelector(".fUser").value;
    document.querySelector("#inDay").value =
      editCard.querySelector(".fDays").value;
    document.querySelector("#finishedInput").checked =
      editCard.querySelector(".fFini").value == "1" ? "checked" : "";
    // Añadimos una clase a la tarjeta que estamos editando para poder actualizarla después
    editCard.classList.add("editing");
    // Ocultamos el botón de crear tarea
    document.getElementById("modal-add-create").style.display = "none";
    // Mostramos el botón de guardar cambios (para editar la tarea)
    document.getElementById("modal-add-save").style.display = "block";
    // Ocultamos el campo de añadir al día en la edición de la tarjeta
    document.querySelector(".div-add-into").style.display = "none";
  });

  // Obtener el segundo botón dentro del elemento "card"
  const deleteTask = card.querySelector(".button-deleteTask");

  // Agregar un controlador de eventos "click" al segundo botón
  deleteTask.addEventListener("click", () => {
    // Obtener el elemento "div" que contiene el botón y eliminarlo
    const dropUnassigned = deleteTask.parentElement.parentElement;

    const modalDelete = document.querySelector("#myModalDelete");
    const modalInstance = bootstrap.Modal.getInstance(modalDelete);
    modalInstance.show();

    // Funcionalidad de quitar tarjeta (elimina tarjeta)
    const deleteCard = document.querySelector("#deleteCard");
    deleteCard.addEventListener("click", () => {
      modalInstance.hide();
      if (card.parentNode) {
        dropUnassigned.remove();
      }
    });
  });

  // Agregar atributo "draggable" al elemento "card"
  card.setAttribute("draggable", true);

  // Agregar controladores de eventos para eventos de arrastrar y soltar
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  function dragStart() {
    // Establecer el efecto de arrastrar
    this.classList.add("dragging");
  }

  function dragEnd() {
    // Restablecer el efecto de arrastrar
    this.classList.remove("dragging");
  }

  // Agregar la tarjeta al contenedor que toque según el día clickado
  var tC = item.in_day;

  if (tC == "1" || inDay == "L") {
    dropDay1.appendChild(card);
  } else if (tC == "2" || inDay == "M") {
    dropDay2.appendChild(card);
  } else if (tC == "3" || inDay == "X") {
    dropDay3.appendChild(card);
  } else if (tC == "4" || inDay == "J") {
    dropDay4.appendChild(card);
  } else if (tC == "5" || inDay == "V") {
    dropDay5.appendChild(card);
  } else if (tC == "6" || inDay == "S") {
    dropDay6.appendChild(card);
  } else if (tC == "7" || inDay == "D") {
    dropDay7.appendChild(card);
  } else {
    dropUnassigned.appendChild(card);
  }
};

// Carga de datos inicial con conexión a MongoDB. 
// Conexion al servidor GraphQl para la llamada getTasksByWeek(idWeek)
// Se ejecutará siempre y cuando la semana no provenga del mockup (es decir, cuando venga de base de datos)
if (!idWeek.includes("mockup-")) {
  fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        getTasksByWeek(_id_week: "${idWeek}") {
          _id
          name
          description
          hour_ini
          hour_end
          type
          user
          in_day
          finished
        }
      }`,
    }),
  }).then((res) => res.json())
    .then((res) => {
      res.data.getTasksByWeek.map((item) => writeCard(item));
    });
  
  fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        getWeekById(_id: "${idWeek}") {
          _id
          week
          year
        }
      }`,
    }),
  }).then((res) => res.json())
    .then((res) => {
      document.querySelector("#breadcrumb-current").innerHTML = "Semana " + res.data.getWeekById.week + " del año " + res.data.getWeekById.year;
    });
} else {
  var text = idWeek.replace("mockup-", "").replace("-", " del año ");
  document.querySelector("#breadcrumb-current").innerHTML = "Semana " + text;
}
