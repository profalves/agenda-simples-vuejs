<template>
<div class="conteudo" id="principal">
    <div class="box" id="login">
        <!--<center><img src="../../dist/img/logo2.png" /></center>-->
        <center><img src="logo2.png" /></center>
        <br><br>
        <form @submit.prevent="Login()">
            <label class="label">Usuário</label>
            <input class="input" type="text" name="usuario" v-model="usuario" id="user"> 

            <label class="label">Senha</label>
            <input class="input" type="password" name="senha" v-model="senha" id="senha"><br><br>
            
            <label class="checkbox" id="conectado">
              <input type="checkbox" v-model="manter">
              Mantenha-me conectado
            </label>
            
            <center>
                <button v-if="isLoading" class="button is-primary is-loading">Loading</button>
                <button class="button is-primary" @click="Login()" @keyup.enter="Login" v-else>Login</button>
            </center>
        </form>
    </div>
    
    <center>
        {{message}}
    </center>
</div>


</template>

<script>
//WS:
//const ENDPOINT = 'http://localhost/helpdesk/'
//dev
//const ENDPOINT = 'http://192.168.0.200/helpdesk/'
//produção
const ENDPOINT = 'http://191.252.64.6/helpdesk/'
//debug:
//const ENDPOINT = 'http://192.168.0.115:32688/'

export default {
    name: 'login',
    data () {
      return {
        usuario: '',
        senha: '',
        users: [],
        message: '',
        isLoading: false,
        manter: false
        
      }
    },
    methods: {
      Login() {
          this.isLoading = true;
          var tempo = new Date();
          this.$http.get(ENDPOINT + 'api/usuario/obterUsuario?user=' + this.usuario + '&pass=' + this.senha).then(
             response=>{
                console.log(response)
                this.users = response.json()
                localStorage.setItem('userId',this.users.idUsuario)
                localStorage.setItem('name',this.users.nome)
                tempo.setTime(tempo.getTime())
                localStorage.setItem('incioSessao', tempo.toString())
                tempo.setTime(tempo.getTime() + 172800000)
                localStorage.setItem('fimSessao', tempo.toString())
                if(this.manter==true){
                    localStorage.setItem('token', this.senha)    
                    localStorage.setItem('conectado', this.manter)    
                }
                this.$router.go({ name: 'compromissos'/*, 
                    query: {
                        id: this.users.idUsuario
                    }*/
                })
                
                
             },
             error=>{
               this.isLoading = false
               e = error.json()
               this.message = e.split(':').pop()
               
             }
          )
          .catch(e=>{
            console.log(e)
          })
          
          this.criaCookie()
          
      },
      criaCookie() {
         var expira = new Date();
         expira.setTime(expira.getTime() + 172800000); //expira dentro de 48h
         document.cookie = 'usuario=' + this.usuario+ ';expires=' + expira.toUTCString();
      },
      limparSessao(){
        var user = localStorage.getItem('userId')
        if(user!==null){
            localStorage.removeItem('userId');
        }
         
      },
      manterConectado(){
        var user = localStorage.getItem('userId')
        if(user!==null){
            var c = localStorage.getItem('conectado')
            if(c == 'true'){
                this.usuario = localStorage.getItem('name')
                this.senha = localStorage.getItem('token')
                this.Login()
            }
        }
      }
      
    },
    created(){
        let t = this
        //t.limparSessao()
        t.manterConectado()
    }
    
}

</script>

<style scoped>
    
    @media (min-width: 300px) {
      #login {
            margin-top: -15%;
        }
    }
    @media (min-width: 400px) {
      #login {
            margin: 10% 10%;
        }
    }
    @media (min-width: 700px) {
      #login {
            margin: 5% 25%;
        }
    }
    @media (min-width: 1380px ) {
      #login {
            width: 500px;
            position: absolute;
            top: 30%;
            left: 35%;
            margin-top: -130px;
            margin-left: -35px;
        }
    }
    button{
        width: 100px;
    }
    
    #user{
        margin-bottom: 20px;
    }

    #conectado{
        margin-bottom: 40px;
    }

</style>