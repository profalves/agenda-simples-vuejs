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
    vuex: {  
        getters: {
            user: store => store.user
        },
        actions: {
            setUser ({dispatch}, obj) {
            dispatch('SET_USER', obj)
            }
        }
    },
    data () {
      return {
        usuario: '',
        senha: '',
        users: [],
        message: '',
        
      }
    },
    methods: {
      Login() {
          var tempo = new Date();
          this.$http.get(ENDPOINT + '/api/usuario/obterUsuario?user=' + this.usuario + '&pass=' + this.senha).then(
             response=>{
                this.users = response.json()
                localStorage.setItem('userId',this.users.idUsuario)
                localStorage.setItem('name',this.users.nome)
                tempo.setTime(tempo.getTime())
                localStorage.setItem('incioSessao', tempo.toUTCString())
                tempo.setTime(tempo.getTime() + 87600000)
                localStorage.setItem('fimSessao', tempo.toUTCString())
                this.$router.go({ name: 'compromissos'/*, 
                    query: {
                        id: this.users.idUsuario
                    }*/
                })
                
                
             },
             error=>{
               e = error.json()
               this.message = e.split(':').pop()
             }
          )
          this.criaCookie()
          
      },
      criaCookie() {
         var expira = new Date();
         expira.setTime(expira.getTime() + 87600000); //expira dentro de 24h
         document.cookie = 'usuario=' + this.usuario+ ';expires=' + expira.toUTCString();
      },
      limparSessao(){
        var user = localStorage.getItem('userId')
        if(user!==null){
            localStorage.clear();
        }
         
      }
      
    },
    created(){
        let t = this
        t.limparSessao()
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