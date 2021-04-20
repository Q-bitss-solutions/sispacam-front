<template>
<table id="datosBeneficiario" class="tableContenido" width="100%" border="0">
    <div class="col-md-12 mx-auto">
        <div class="row">
            <h3>Datos del Beneficiario</h3>
            <hr class="red">
            <form role="form">
                <h3>Presidente Municipal o representante de la comunidad</h3>
                <div class="form-group row">
                    <h3></h3>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Nombre o nombres</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Primer apellido</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="region">Segundo apellido</label>
                        <input class="form-control" id="region" placeholder="" type="text">
                    </div>

                    <br></br>
                    <br></br>
                    <tr>
                        <div class="col-sm-6">
                            <label class="control-label" for="region">RFC del Beneficiario</label>
                            <input class="form-control" id="region" placeholder="" type="text">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label" for="region">Número de cuenta</label>
                            <input class="form-control" id="region" placeholder="" type="number">
                        </div>
                    </tr>
                    <br>
                    <tr>
                        <div class="col-sm-4">
                            <label class="control-label" for="region">Calle</label>
                            <input class="form-control" id="region" placeholder="" type="text">
                        </div>                        
                        <div class="col-sm-4">
                            <label class="control-label" for="region">Núm. Exterior</label>
                            <input class="form-control" id="region" placeholder="" type="text">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="region">Colonia</label>
                            <input class="form-control" id="region" placeholder="" type="text">
                        </div>
                    </tr>
                    <br></br>
                    <tr>
                        <div class="col-sm-4">
                            <label class="control-label" for="region">Código postal</label>
                            <input class="form-control" id="region" placeholder="" type="text">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="email-01">Tipo de calle</label>
                            <select class="form-control" id="email-01">
                                <option>Calle</option>
                                <option>Boulevard</option>
                                <option>Avenida Principal</option>
                                <option>Privada</option>
                                <option>Ninguno</option>
                            </select>
                        </div>
                    </tr>

                </div>
            </form>
        </div>
    </div>
</table>    
</template>
<script>

export default 
    {
        name:"DatosBeneficiario"
    };
</script>
