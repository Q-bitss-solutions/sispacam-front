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
                        <label class="control-label" for="nombre">Nombre o nombres</label>
                        <input class="form-control" id="nombre" placeholder="" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="papellido">Primer apellido</label>
                        <input class="form-control" id="papellido" placeholder="" type="text">
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="sapellido">Segundo apellido</label>
                        <input class="form-control" id="sapellido" placeholder="" type="text">
                    </div>

                    <br></br>
                    <br></br>
                    <tr>
                        <div class="col-sm-6">
                            <label class="control-label" for="rfc">RFC del Beneficiario</label>
                            <input class="form-control" id="rfc" placeholder="" type="text">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label" for="cuenta">Número de cuenta</label>
                            <input class="form-control" id="cuenta" placeholder="" type="number">
                        </div>
                    </tr>
                    <br>
                    <tr>
                        <div class="col-sm-4">
                             <label class="control-label" for="numexterior">Núm. Exterior</label>
                             <input class="form-control" id="numexterior" placeholder="" type="number">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="calle">Calle</label>
                            <input class="form-control" id="calle" placeholder="" type="text">
                        </div>                        
                        <div class="col-sm-4">
                            <label class="control-label" for="colonia">Colonia</label>
                            <input class="form-control" id="colonia" placeholder="" type="text">
                        </div>
                    </tr>
                    <br></br>
                    <tr>
                        <div class="col-sm-4">
                            <label class="control-label" for="codpostal">Código postal</label>
                            <input class="form-control" id="codpostal" placeholder="" type="number">
                        </div>
                        <div class="col-sm-4">
                            <label class="control-label" for="tipocalle">Tipo de calle</label>
                            <select class="form-control" id="tipocalle">
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
