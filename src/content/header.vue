<template>
    <div id="app">
        <div class="topo">
            
            <a v-link="{ path: '/ccompromissos' }" class="button is-dark">
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
        logout() {
         var app = this;
         localStorage.clear();
         app.$router.go({ name: 'login'});
         
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