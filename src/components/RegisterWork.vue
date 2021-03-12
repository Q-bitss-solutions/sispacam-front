<template>
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Registro de Obra</h3>
            <hr class="red">
            <form role="form">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="email-01">Estado</label>
                        <select class="form-control" id="email-01">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
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
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Número del INEGI</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Región</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Comunidad Indígena</label>
                        <div class="radio form-control">
                            <label>
                                <input type="radio" name="radio-01" value="opcion-01" checked="checked"> Sí
                            </label>
                            <label>
                                <input type="radio" name="radio-01" value="opcion-02" checked="checked"> No
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Grado de marginación</label>
                        <select class="form-control" id="municipio">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Cantidad de beneficiados por municipio</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Presidente Municipal</label>
                        <input class="form-control" id="region" placeholder="Nombre completo" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">RFC Presidente Municipal</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Número de cuenta</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Número de convenio</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Monto de convenio</label>
                        <input class="form-control" id="region" placeholder="$" type="text">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Meta en KM</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="file-01">Archivo de convenio:</label>
                        <input id="file-01" type="file">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Tipo de camino</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="municipio">Ancho</label>
                        <select class="form-control" id="municipio">
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                            <option>xxxxxxxxx</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Longitud total</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Longitud a pavimentar</label>
                        <input class="form-control" id="region" placeholder="" type="number">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Características</label>
                        <textarea class="form-control" rows="4"></textarea>
                    </div>
                    <div class="col-sm-6">
                        <label class="control-label" for="region">Localidades</label>
                        <textarea class="form-control" rows="4"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label" for="region">Beneficiarios</label>
                    <textarea class="form-control" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label class="control-label" for="n-localities">Numero de localidades</label>
                    <input class="form-control" id="n-localities" placeholder="" v-model="rows" type="number" min="1">
                </div>
                <div v-if="rows > 0" class="form-inline" role="form">
                    <div class="row">
                        <label class="control-label col-md-6" for="region">Localidad</label>
                        <label class="control-label col-md-6" for="region">Población beneficiada</label>
                    </div>
                    <div v-for="i in parseInt(rows)" :key="i">
                        <div class="form-group col-md-6">
                            <input class="form-control" id="Localidad" placeholder="Localidad" type="text">
                        </div>
                        <div class="form-group col-md-6">
                            <input class="form-control" id="Poblacion" placeholder="Poblacion" type="text">
                        </div>
                    </div>
                </div>
                <div v-if="rows > 0" class="form-group">
                    <div class="form-group col-md-6">
                    </div>
                    <div class="form-group col-md-6">
                        <label class="control-label" for="region">Total Población beneficiada</label>
                        <input class="form-control" id="Poblacion" placeholder="Poblacion" type="text"
                               disabled="disabled">
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary pull-right" type="submit">Enviar</button>
                </div>

            </form>
        </div>
    </div>


</template>

<script>
    export default {
        name: "RegisterWork",
        data() {
            return {
                rows: 0,
            }
        },
        methods: {
            getStates() {
                // 192.168.10.103:8000
            }
        }
    }
</script>
