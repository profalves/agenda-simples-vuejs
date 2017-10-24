<template>
<div class="conteudo" id="principal">
    <div class="box" id="login">
        <center><h1>7Virtual</h1></center>

        <label class="label">Usuário</label>
        <input class="input" type="text" name="usuario" v-model="usuario"> 

        <br><br>
        <label class="label">Senha</label>
        <input class="input" type="password" name="senha" v-model="senha"><br><br>

        <center>
            <button class="button is-primary" @click="Login()" @keyup.enter="Login()">Login</button>
        </center>
    </div>
    
    <center>
        {{message}}
    </center>
</div>


</template>

<script>
    
const ENDPOINT = 'http://192.168.0.200/helpdesk/'

export default {
    name: 'login',
    data () {
      return {
        usuario: 'kel',
        senha: 1,
        users: [],
        message: ''
      }
    },
    methods: {
      Login() {
          var acesso=0;
          
          if (this.usuario=="admin" && this.senha=="admin") {
            window.location="/#!/ccompromissos";
            acesso=1;
          }
          if (acesso==0) { 
              swal(
                  'Não autenticado!',
                  'Usuário ou senha incorreto!',
                  'error'
              );
          }
      },
      listarUsers(){
        
        
        this.$http.get(ENDPOINT + '/api/usuario/obterUsuario?user=' + this.usuario + '&pass=' + this.senha).then(
         response=>{
           this.users = response.json()
         },
         error=>{
           e = error.json()
           this.message = e.split(':').pop()
         })
      },
      
    },
    created (){
        this.listarUsers()
    }
    
}

</script>

<style scoped>
    
    @media (min-width: 300px) {
      #login {
            margin-top: 15%;
        }
    }
    @media (min-width: 500px) {
      #login {
            margin: 15% 10%;
        }
    }
    @media (min-width: 700px) {
      #login {
            margin: 10% 25%;
        }
    }
    @media (min-width: 1380px ) {
      #login {
            width: 500px;
            position: absolute;
            top: 30%;
            left: 35%;
            margin-top: -30px;
            margin-left: -35px;
        }
    }
    button{
        width: 100px;
    }

</style>