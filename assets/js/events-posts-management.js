// * Elementos del DOM

// Pagina actual
const $pageType = document.querySelector('body');

// Botones de accion
const $addButton = document.querySelector('#add');
const $editButton = document.querySelector('#edit');
const $deleteButton = document.querySelector('#delete');

// Formulario
const $formTitle = document.querySelector('.form__title')
const $selectWrapper = document.querySelector('.select-wrapper');
const $title = document.querySelector('#title');
const $nonWorkingDay = document.querySelector('#non-working-day');      // de events-management
const $importantDay = document.querySelector('#important-day');         // de events-management
const $description = document.querySelector('#description');
const $images = document.querySelector('#images');                      // de posts-management
const $documents = document.querySelector('#documents');                // de posts-management

// Botones de estado
const $save = document.querySelector("#save")
const $cancel = document.querySelector("#cancel");



// * Verifica la página actual
const seccion = $pageType.dataset.pageType == "event-management" ? "evento" : "publicación";



function addSeccion() {
    // Cambia el titulo del formulario
    $formTitle.textContent = "Crear " + seccion;

    // Marca la seccion actual
    $addButton.classList.add('user-selection');
    $editButton.classList.remove('user-selection');
    $deleteButton.classList.remove('user-selection');

    if (seccion == "evento") {
        // Cambia el <select> a un <input> 
        let html = `
            <label for="date">Fecha</label>
            <input id="date" class="input__field" type="date" required>
        `;
        $selectWrapper.innerHTML = html;
        
        // Resetea la informacion del evento seleccionado
        $title.value = "";
        $importantDay.checked = false;
        $nonWorkingDay.checked = false;
        $description.value = "";

        // Hace que el usuario pueda modificar la informacion
        $title.disabled= false;
        $importantDay.disabled = false;
        $nonWorkingDay.disabled = false;
        $description.disabled = false;
    } else {
        // Cambia el <select> a un <input> 
        let html = `
            <label for="title">Título</label>
            <input id="title" class="input__field" type="text" required>
        `;
        $selectWrapper.innerHTML = html;
        
        // Resetea la informacion del evento seleccionado
        $title.value = "";
        $description.value = "";
        $images.value = "";
        $documents.value = "";

        // Hace que el usuario pueda modificar la informacion
        $title.disabled= false;
        $description.disabled = false;
        $images.disabled = false;
        $documents.disabled = false;
    }

    // Cambia el primer boton de estado
    $save.textContent = "Crear";
    $save.id = "save"
}




function editSeccion() {
    // Cambia el titulo del formulario
    $formTitle.textContent = "Editar " + seccion;

    // Marca la seccion actual
    $editButton.classList.add('user-selection');
    $addButton.classList.remove('user-selection');
    $deleteButton.classList.remove('user-selection');

    if (seccion == "evento") {
        // Cambia el <input> de fecha a un <select>
        let html = `
            <label for="date">Selecciona el evento</label>
            <select id="date" class="input__field">
                <option value="">fecha</option>
                <option value="12-02-2025">12/03/2025</option>
                <option value="25-05-2025">25/05/2025</option>
                <option value="09-06-2025">09/06/2025</option>
            </select>
        `;
        // TODO: la cantidad de <option> y sus value depependen de los que hayan en la BBDD
        $selectWrapper.innerHTML = html;
        
        // Añade la informacion del evento seleccionado
        const $date = document.querySelector('#date');
        $date.addEventListener('change', ()=>{
            $title.value = "Entrega de notas de 3er año";                                       // TODO: Recibe la informacion de la BBDD
            $importantDay.checked = true;                                                       // TODO: Recibe la informacion de la BBDD
            $description.value = "El 25 de mayo se entregarán las notas a los estudiantes";     // TODO: Recibe la informacion de la BBDD
        })

        // Hace que el usuario pueda modificar la informacion
        $title.disabled= false;
        $importantDay.disabled = false;
        $nonWorkingDay.disabled = false;
        $description.disabled = false;
    } else {
        // Cambia el <input> de title a un <select>
        let html = `
            <label for="title">Selecciona la publicación</label>
            <select id="title" class="input__field">
                <option value="">título</option>
                <option value="1">Entrega de notas</option>
                <option value="2">Reunión de padres y representantes</option>
                <option value="3">Inscripciones nuevo ingreso</option>
            </select>
        `;
        // TODO: la cantidad de <option> y sus value depependen de los que hayan en la BBDD
        $selectWrapper.innerHTML = html;
        
        // Añade la informacion de la publicación seleccionada
        const $title = document.querySelector('#title');
        $title.addEventListener('change', ()=>{
            $description.value = "Entrega de notas de todos los estudiantes a las 3:00pm en Dep. Evaluación";     // TODO: Recibe la informacion de la BBDD
            // TODO: Las imágenes de la publicación que se reciben de la BBDD
            // TODO: Los documentos de la publicación que se reciben de la BBDD
        })

        // Hace que el usuario pueda modificar la informacion
        $title.disabled= false;
        $description.disabled = false;
        $images.disabled = false;
        $documents.disabled = false;
    }

    // Cambia el primer boton de estado
    $save.textContent = "Guardar";
    $save.id = "save"
}




function deleteSeccion() {
    // Cambia el titulo del formulario
    $formTitle.textContent = "Eliminar " + seccion;

    // Marca la seccion actual
    $deleteButton.classList.add('user-selection');
    $addButton.classList.remove('user-selection');
    $editButton.classList.remove('user-selection');

    if (seccion == "evento") {
        // Cambia el <input> de fecha a un <select>
        let html = `
            <label for="date">Selecciona el evento</label>
            <select id="date" class="input__field">
                <option value="">fecha</option>
                <option value="12-02-2025">12/03/2025</option>
                <option value="25-05-2025">25/05/2025</option>
                <option value="09-06-2025">09/06/2025</option>
            </select>
        `;
        // TODO: la cantidad de <option> y sus value depependen de los que hayan en la BBDD
        $selectWrapper.innerHTML = html;
        
        // Añade la informacion del evento seleccionado
        const $date = document.querySelector('#date');
        $date.addEventListener('change', ()=>{
            $title.value = "Entrega de notas de 3er año";                                       // TODO: Recibe la informacion de la BBDD
            $importantDay.checked = true;                                                       // TODO: Recibe la informacion de la BBDD
            $description.value = "El 25 de mayo se entregarán las notas a los estudiantes";     // TODO: Recibe la informacion de la BBDD
        })

        // Evita que el usuario pueda modificar la informacion
        $title.disabled= true;
        $importantDay.disabled = true;
        $nonWorkingDay.disabled = true;
        $description.disabled = true;
    } else {
        // Cambia el <input> de fecha a un <select>
        let html = `
            <label for="title">Selecciona la publicación</label>
            <select id="title" class="input__field">
                <option value="">título</option>
                <option value="1">Entrega de notas</option>
                <option value="2">Reunión de padres y representantes</option>
                <option value="3">Inscripciones nuevo ingreso</option>
            </select>
        `;
        // TODO: la cantidad de <option> y sus value depependen de los que hayan en la BBDD
        $selectWrapper.innerHTML = html;
        
        // Añade la informacion de la publicación seleccionada
        const $title = document.querySelector('#title');
        $title.addEventListener('change', ()=>{
            $description.value = "Entrega de notas de todos los estudiantes a las 3:00pm en Dep. Evaluación";     // TODO: Recibe la informacion de la BBDD
            // TODO: Las imágenes de la publicación que se reciben de la BBDD
            // TODO: Los documentos de la publicación que se reciben de la BBDD
        })

        // Evita que el usuario pueda modificar la informacion
        $description.disabled = true;
        $images.disabled = true;
        $documents.disabled = true;
    }
    
    // Cambia el primer boton de estado
    $save.textContent = "Eliminar";
    $save.id = "erase"
}



// * Funciones únicas para post-management
// Evita subir archivos no válidos en el campo de imágenes
function verificarImagenes () {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const files = Array.from(this.files);

    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
        alert('Solo se permiten archivos de imagen. Se han detectado archivos no válidos.');
        this.value = ''; // Limpia el input
    }
}


// Evita subir archivos no válidos en el campo de documentos
function verificarDocumentos () {
    const file = this.files[0];
    const forbiddenTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file && forbiddenTypes.includes(file.type)) {
        alert('Solo se permiten archivos de documento. Se han detectado archivos no válidos.');
        this.value = ''; // Limpia el input
    }
}


// Campos únicos de posts-management
if (seccion == "publicación") {
    $images.addEventListener('change', verificarImagenes);
    $documents.addEventListener('change', verificarDocumentos);
}


// Botones de acción
$addButton.addEventListener('click', addSeccion);
$editButton.addEventListener('click', editSeccion);
$deleteButton.addEventListener('click', deleteSeccion);