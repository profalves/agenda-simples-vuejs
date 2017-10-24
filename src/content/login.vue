<template>
<div class="conteudo" id="principal">
    <div class="box" id="login">
        <center><h1>7Virtual</h1></center>

        <label class="label">Usuário</label>
        <input class="input" type="text" name="usuario"> 

        <br><br>
        <label class="label">Senha</label>
        <input class="input" type="password" name="senha"><br><br>

        <center>
            <button class="button is-primary" @click="Login()">Login</button>
        </center>
    
    
    </div>
    

</div>


</template>

<script>

export default {
    name: 'login',
    
    methods: {
      Login() {
          var done=0;
          var usuario = document.getElementsByName('usuario')[0].value;
          usuario=usuario.toLowerCase();
          var senha= document.getElementsByName('senha')[0].value;
          senha=senha.toLowerCase();
          if (usuario=="admin" && senha=="admin") {
            window.location="/#!/ccompromissos";
            done=1;
          }
          if (done==0) { 
              swal(
                  'Não autenticado!',
                  'Usuário ou senha incorreto!',
                  'error'
              );
          }
        }
    }
}

</script>

<style scoped>
    .conteudo#principal{
        
    }
    #login{
        width: 50%;
        position: fixed;
           
    }
    button{
        width: 100px;
    }

</style>