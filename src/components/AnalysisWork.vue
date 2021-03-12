<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Análisis de Obra</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Municipio</label>
                        <select class="form-control" id="municipio">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="Obra">Obra</label>
                        <select class="form-control" id="Obra">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                </div>
                <h4>2020</h4>
                <hr class="red">
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Monto</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="Obra">Meta</label>
                        <select class="form-control" id="Obra">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Ancho</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Del KM</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Al KM</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Número de empleos</label>
                        <input class="form-control" id="region" placeholder="$" type="number">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Fecha inicio</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Fecha Fin</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                </div>
                <hr class="red">
                <h4>Conceptos</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Handle</th>
                            <th>Handle</th>
                            <th>Cant. Total</th>
                            <th>P. Unitario</th>
                            <th>Importe Total</th>
                            <th>Importe Total</th>
                            <th>Ponderados</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-default pull-right vertical-buffer" data-toggle="modal"
                            data-target="#addConcept">
                        Agregar Concepto
                    </button>
                </div>
                <h4>Conceptos Extraordinarios</h4>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Handle</th>
                            <th>Handle</th>
                            <th>Cant. Total</th>
                            <th>P. Unitario</th>
                            <th>Importe Total</th>
                            <th>Importe Total</th>
                            <th>Ponderados</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@fat</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        <tr>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>@twitter</td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                            <td><input type="text"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="row vertical-buffer">
                    <button type="button" class="btn btn-default pull-right" data-toggle="modal"
                            data-target="#error">
                        Agregar Concepto
                    </button>
                    <button type="button" class="btn btn-danger pull-right">Cancelar</button>
                </div>
            </form>
        </div>

        <!--        Modal-->
        <div class="modal fade" id="addConcept" tabindex="-1" role="dialog" aria-labelledby="addConcept"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Ejemplo de ventana modal</h4>
                    </div>
                    <div class="modal-body">
                        <p>Ejemplo de texto interno.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--        Modal End-->

        <!--        Modal Error-->
        <div class="modal fade" id="error" tabindex="-1" role="dialog" aria-labelledby="error"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Alerta</h4>
                    </div>
                    <div class="modal-body">
                        <p>Las cantidades no coinciden.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary">Guardar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!--        Modal End-->
    </div>
</template>

<script>
    export default {
        name: "AnalysisWork"
    }
</script>

<style scoped>

</style>