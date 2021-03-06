// Constantes para establecer las rutas y parámetros de comunicación con la API.
const API_CLIENTES = '../../core/api_en/dashboard/clients.php?action=';

// Método que se ejecuta cuando el documento está listo.
$(document).ready(function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_CLIENTES);

    // Se declara e inicializa un objeto para obtener la fecha y hora actual.
    let today = new Date();
    // Se declara e inicializa una variable para guardar el día en formato de 2 dígitos.
    let day = ( '0' + today.getDate() ).slice( -2 );
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    var month = ( '0' + ( today.getMonth() + 1 ) ).slice( -2 );
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = today.getFullYear() - 18;
    // Se declara e inicializa una variable para establecer el formato de la fecha.
    let date = (`${year}-${month}-${day}`);
    // Se asigna la fecha como valor máximo en el campo del formulario.
    $( '#fecha' ).prop( 'max', date );
});

// Función para llenar la tabla con los datos enviados por readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.forEach(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
                <td>${row.id_cliente}</td>
                <td>${row.nombre}</td>
                <td>${row.apellido}</td>
                <td>${row.correo}</td>
                <td>
                    <a href="#" onclick="openUpdateModal(${row.id_cliente})" class="blue-text tooltipped" data-tooltip="Update"><i class="material-icons">mode_edit</i></a>
                    <a href="#" onclick="openDeleteDialog(${row.id_cliente})" class="red-text tooltipped" data-tooltip="Delete"><i class="material-icons">delete</i></a>
                </td>
            </tr>
        `;
    });

    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    $('#tbody-rows').html(content);
    pagination();
    // Se inicializa el componente Material Box asignado a las imagenes para que funcione el efecto Lightbox.
    $('.materialboxed').materialbox();
    // Se inicializa el componente Tooltip asignado a los enlaces para que funcionen las sugerencias textuales.
    $('.tooltipped').tooltip();
}

// Evento para mostrar los resultados de una búsqueda.
$('#search-form').submit(function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_CLIENTES, this);
});

// Función que prepara formulario para insertar un registro.
function openCreateModal() {
    // Se limpian los campos del formulario.
    $('#save-form')[0].reset();
    // Se abre la caja de dialogo (modal) que contiene el formulario.
    $('#save-modal').modal('open');
    // Se asigna el título para la caja de dialogo (modal).
    $('#modal-title').text('Create customer');
    // Se establece el campo de tipo archivo como obligatorio.
    //$( '#archivo_cliente' ).prop( 'required', true );
}

// Función que prepara formulario para modificar un registro.
function openUpdateModal(id) {
    // Se limpian los campos del formulario.
    $('#save-form')[0].reset();
    // Se abre la caja de dialogo (modal) que contiene el formulario.
    $('#save-modal').modal('open');
    // Se asigna el título para la caja de dialogo (modal).
    $('#modal-title').text('Modify client');
    // Se establece el campo de tipo archivo como opcional.
    // $( '#archivo_cliente' ).prop( 'required', false );

    $.ajax({
            dataType: 'json',
            url: API_CLIENTES + 'readOne',
            data: {
                id_cliente: id
            },
            type: 'post'
        })
        .done(function (response) {
            // Se comprueba si la API ha retornado una respuesta satisfactoria, de lo contrario se muestra un mensaje de error.
            if (response.status) {
                // Se inicializan los campos del formulario con los datos del registro seleccionado previamente.
                $('#id_cliente').val(response.dataset.id_cliente);
                $('#nombre').val(response.dataset.nombre);
                $('#apellido').val(response.dataset.apellido);
                $('#correo').val(response.dataset.correo);
                $('#fecha').val(response.dataset.fecha_nacimiento);

                // Se actualizan los campos para que las etiquetas (labels) no queden sobre los datos.
                M.updateTextFields();
            } else {
                sweetAlert(2, result.exception, null);
            }
        })
        .fail(function (jqXHR) {
            // Se verifica si la API ha respondido para mostrar la respuesta, de lo contrario se presenta el estado de la petición.
            if (jqXHR.status == 200) {
                console.log(jqXHR.responseText);
            } else {
                console.log(jqXHR.status + ' ' + jqXHR.statusText);
            }
        });
}

// Evento para crear o modificar un registro.
$('#save-form').submit(function (event) {
    event.preventDefault();
    // Se llama a la función que crea o actualiza un registro. Se encuentra en el archivo components.js
    // Se comprueba si el id del registro esta asignado en el formulario para actualizar, de lo contrario se crea un registro.
    if ($('#id_cliente').val()) {
        saveRow(API_CLIENTES, 'update', this, 'save-modal');
    } else {
        saveRow(API_CLIENTES, 'create', this, 'save-modal');
    }
});

// Función para establecer el registro a eliminar mediante el id recibido.
function openDeleteDialog(id) {
    // Se declara e inicializa un objeto con el id del registro que será borrado.
    let identifier = {
        id_cliente: id
    };
    confirmDelete(API_CLIENTES, identifier);
}

function openViewDetails(id) {
    // Se abre la caja de dialogo (modal) que contiene el formulario.
    $('#detalle-modal').modal('open');
    $('#modal-title-2').text('Purchase detail');
    // Se establece el campo de tipo archivo como obligatorio.
    let identifier = {
        id_cliente: id
    };
    readRowsModified(API_CLIENTES + 'readCompras', identifier);
}

function fillTableModified(dataset) {
    let content = '';

    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.

    // Se establece un icono para el estado del producto.
    dataset.forEach(function (row) {
        $('#modal-title-2').text('Purchases of ' + row.nombre + ' ' + row.apellido);
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
                <td>${row.id_factura}</td>
                <td>${row.fecha_registro}</td>
                <td>${row.precio_total}</td>
                <td>${row.estado_factura}</td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    $('#tbody-details').html(content);
    // Se inicializa el componente Tooltip asignado a los enlaces para que funcionen las sugerencias textuales.
    $('.tooltipped').tooltip();
}