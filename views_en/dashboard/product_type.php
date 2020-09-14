<?php
require_once('../../core/helpers/dashboard_en.php');
Dashboard::headerTemplate('Manage categories');
?>
<div class="padd-15">
    <div class="padd-15">
        <div class="row">
            <!-- Formulario de búsqueda -->
            <form method="post" id="search-form">
                <div class="input-field col s6 m4">
                    <i class="material-icons prefix">search</i>
                    <input id="search" type="text" name="search" />
                    <label for="search">Search</label>
                </div>
                <div class="input-field col s6 m4">
                    <button type="submit" class="btn waves-effect green tooltipped" data-tooltip="Search"><i class="material-icons">check_circle</i></button>
                </div>
            </form>
            <div class="input-field center-align col s12 m4">
                <!-- Enlace para abrir caja de dialogo (modal) al momento de crear un nuevo registro -->
                <a href="#" onclick="openCreateModal()" class="btn waves-effect indigo tooltipped" data-tooltip="Create"><i class="material-icons">add_circle</i></a>
            </div>
        </div>
    </div>

    <!-- Tabla para mostrar los registros existentes -->
    <table class="highlight padd-15 pagination responsive-table">
        <!-- Cabeza de la tabla para mostrar los títulos de las columnas -->
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <!-- Cuerpo de la tabla para mostrar un registro por fila -->
        <tbody id="tbody-rows">
        </tbody>
    </table>

    <div class="col-md-12 center text-center">
        <span class="left" id="total_reg"></span>
        <ul class="pagination pager" id="myPager"></ul>
    </div>
</div>
<!-- Componente Modal para mostrar una caja de dialogo -->
<div id="save-modal" class="modal">
    <div class="modal-content">
        <h4 id="modal-title" class="center-align"></h4>
        <!-- Formulario para crear o actualizar un registro -->
        <form method="post" id="save-form" enctype="multipart/form-data">
            <!-- Campo oculto para asignar el id del registro al momento de modificar -->
            <input class="hide" type="text" id="id_tipo_producto" name="id_tipo_producto" />
            <div class="row">
                <div class="input-field col s12 m12">
                    <i class="material-icons prefix">note_add</i>
                    <input id="nombre_tipo" type="text" name="nombre_tipo" class="validate" required minlength="3" />
                    <label for="nombre_tipo">Name</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancel"><i class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Save"><i class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('product_type.js');
?>