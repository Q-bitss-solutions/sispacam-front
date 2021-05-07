<template>
<div class="row"> 
<div class="col-md-8 bottom-buffer">
<form @submit.prevent="submit" class="form-horizontal" role="form">
  <div class="form-group">
    <label class="col-md-4 control-label no-margin" >Usuario:
      <span v-if="$v.form.username.$error" class="form-text form-text-error">*</span>
    </label>   
    <div class="col-md-6">
      <input  class="form-control" :class="{'form-control-error': $v.form.username.$error}" 
              id="user" placeholder="Ingresa usuario" type="text"
              v-model.trim="$v.form.username.$model" />
      <span v-if="$v.form.username.$error" id="error_user" class="form-text form-text-error">
        Este campo es obligatorio
      </span> 
    </div>
  </div>
  <div class="form-group">
    <label class="col-md-4 control-label no-margin" for="password">Contraseña:
      <span v-if="$v.form.password.$error"  class="form-text form-text-error">*</span>
    </label>
    <div class="col-md-6">
      <input  class="form-control" :class="{ 'form-control-error': $v.form.password.$error}" 
              placeholder="Contraseña" type="password" maxlength="16" v-model.trim="$v.form.password.$model">
      <small v-if="$v.form.password.$error" id="error_password" class="form-text form-text-error">
        Este campo es obligatorio
      </small>              
    </div>
  </div>
<div class="col-md-10">
  <div class="pull-right">
    <button class="btn btn-primary" type="submit">Acceder</button>
  </div>
</div>
</form>
</div>
</div>
</template>

<script>
import { mapActions } from "vuex";
import { required } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex'

export default {
 name: "Login",
  data() {
    return {
      breadcrumb: ['Inicio de sesión'],
      form: {
        username: "",
        password: ""
      },
      showError: false
    }
  },
validations: {
  form:{
    username: {
        required
    },
    password: {
        required
    }
  }
},
  methods: {    
    ...mapActions('user', ["login"]),
    submit() { 
      this.$v.$touch()
      console.log('submit...')
      if (this.$v.$invalid) return
      try {
        this.login(JSON.parse(JSON.stringify(this.form)))
      }catch (e){
        
      }
    },
    ...mapMutations(['setBreadcrumb'])
  },
  beforeMount: function () {    
    this.setBreadcrumb(this.breadcrumb)

  },
  mounted: function () {
    console.log('montado')
    console.log(this.$store.state.breadcrumb)
  }
}
</script>

<style scoped>

</style>