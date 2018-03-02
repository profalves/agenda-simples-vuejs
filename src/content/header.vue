<template>
    <div id="app">
        
        <div class="topo">
            <span style="font-size:30px;
                         cursor:pointer;
                         text-align:left" 
                  @click="openNav()">&#9776;
            </span>    
        </div>
        
        <div class="tile">HelpDesk 7Virtual</div>
        
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
          <a @click="agenda"><i class="fa fa-user linkIcon"></i>Agenda</a>
          <a @click="alterarSenha"><i class="fa fa-key linkIcon"></i>Alterar Senha</a>
          <a @click="logout"><i class="fa fa-sign-out linkIcon"></i>Sair</a>
        </div>
        
        
    </div>
</template>

<script>
  export default {
    data() {
      return {
        message:'Header',
      }
    },
    methods: {
      agenda() {
       var app = this;
       //localStorage.setItem('status', 'EM ANDAMENTO');
       app.$router.go({ name: 'compromissos'});
      },
      logout() {
       var app = this;
       localStorage.setItem('conectado', false);
       app.$router.go({ name: 'login'});
       localStorage.setItem('tipo', '')
       localStorage.setItem('priori', '')
       localStorage.setItem('projeto', '')
       localStorage.setItem('plataforma', '')
      },
      alterarSenha() {
       var app = this;
       app.$router.go({ name: 'altPass'});
      },
      openNav() {
       document.getElementById("mySidenav").style.width = "250px";
      },
      closeNav() {
       document.getElementById("mySidenav").style.width = "0";
      }
    },
    computed: {
      checkLogin() {
        return this.$store.state.isLoggedIn;
      }
    }
  }

</script>

<style>
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    text-align: left;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 150px;
    }
    
    .sidenav .version {
        margin: 20px 30px;
    }
    
    @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
    }
    
    .linkIcon{
        margin:7px 10px 0 0;
    }
    
    
</style>