<?php
require('../../helpers/report.php');
require('../../models/dashboard/productos.php');
require('../../models/dashboard/tipo_producto.php');


// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Producto por categoría');

// Se instancia el módelo Categorías para obtener los datos.
$tipoproducto = new TipoProductos;
// Se verifica si existen registros (categorías) para mostrar, de lo contrario se imprime un mensaje.
if ($dataTipoProducto = $tipoproducto->readAllTipos()) {
    // Se recorren los registros ($dataCategorias) fila por fila ($rowCategoria).
    foreach ($dataTipoProducto as $rowTipoProducto) {
        // Se establece un color de relleno para mostrar el nombre de la categoría.
        $pdf->SetFillColor(222, 127, 11);
        // Se establece la fuente para el nombre de la categoría.
        $pdf->SetFont('Times', 'B', 12);
        // Se imprime una celda con el nombre de la categoría.
        $pdf->Cell(0, 10, utf8_decode('Tipo producto: '.$rowTipoProducto['tipo_producto']), 1, 1, 'C', 1);
        // Se instancia el módelo Productos para obtener los datos.
        $producto = new Productos;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($producto->setTipoProducto($rowTipoProducto['id_tipo_producto'])) {
            // Se verifica si existen registros (productos) para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->readProductosTipo()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->SetFillColor(227, 194, 30);
                // Se establece la fuente para los encabezados.
                $pdf->SetFont('Times', 'B', 11);
                // Se imprimen las celdas con los encabezados.
                $pdf->Cell(93, 10, utf8_decode('Nombre'), 1, 0, 'C', 1);
                $pdf->Cell(93, 10, utf8_decode('Precio ($)'), 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->SetFont('Times', '', 11);
                // Se recorren los registros ($dataProductos) fila por fila ($rowProducto).
                foreach ($dataProductos as $rowProducto) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->Cell(93, 10, utf8_decode($rowProducto['nombre_producto']), 1, 0);
                    $pdf->Cell(93, 10, utf8_decode($rowProducto['precio_unitario']), 1, 1);
                }
            } else {
                $pdf->Cell(0, 10, utf8_decode('No hay productos de este tipo'), 1, 1);
            }
        } else {
            $pdf->Cell(0, 10, utf8_decode('Ocurrió un error en una categoría'), 1, 1);
        }
    }
} else {
    $pdf->Cell(0, 10, utf8_decode('No hay categorías para mostrar'), 1, 1);
}

// Se envía el documento al navegador y se llama al método Footer()
$pdf->Output();
?>