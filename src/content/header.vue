<template>
    <div id="app">
        <div class="topo">
            
            <a v-link="{ path: '/ccompromissos' }" class="button is-dark">
                <span class="icon">
                <i class="fa fa-user"></i>
                </span>
                <span>Agenda</span>
            </a>
            <a v-link="{ path: '/' }" class="button is-primary">
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
        logout:function() {
           var app = this;
         localStorage.removeItem("lbUser");
         app.$router.push({ name: 'login'});
         app.$store.state.isLoggedIn = false;
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