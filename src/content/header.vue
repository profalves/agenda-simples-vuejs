<template>
    <div id="app">
        <div class="topo">
            
            <a @click="agenda" class="button is-dark">
                <span class="icon">
                <i class="fa fa-user"></i>
                </span>
                <span>Agenda</span>
            </a>
            <a @click="logout" class="button is-primary">
                <span class="icon">
                <i class="fa fa-home"></i>
                </span>
                <span>Logout</span>
            </a>
            <a @click="alterarSenha" class="button">
                <span class="icon">
                <i class="fa fa-key"></i>
                </span>
                <span>Alterar Senha</span>
            </a>
            
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        message:'Header'
      }
    },
    methods: {
        agenda() {
         var app = this;
         localStorage.setItem('status', 'EM ANDAMENTO');
         app.$router.go({ name: 'compromissos'});
        },
        logout() {
         var app = this;
         localStorage.clear();
         app.$router.go({ name: 'login'});
        },
        alterarSenha() {
         var app = this;
         app.$router.go({ name: 'altPass'});
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
</style>