<template>
    <h2>Alterar Senha</h2>
    <form @submit.prevent="alterarSenha()">
        <label class="label">Senha Antiga</label>
        <input class="input" type="password" name="old" v-model="old"> 

        <label class="label">Senha Nova</label>
        <input class="input" type="password" name="new" v-model="new"><br><br>

        
        <button v-if="isLoading" class="button is-primary is-loading">Loading</button>
        <button class="button is-primary" @click="alterarSenha()" v-else>Alterar Senha</button>
        <button class="button" v-link="{ path: '/ccompromissos' }">Cancelar</button>
        
    </form>
    <br>
    <div class="alerta">{{error}}</div> 
</template>  
<script>
export default {
    name: 'alterarSenha',
    data() {
      return {
        isLoading: false,
        old:'',
        new:'',
        user: localStorage.getItem('userId'),
        error: '',
      }
    },
    methods: {
      alterarSenha(){
        this.isLoading = true
        this.$http.get('http://191.252.64.6/helpdesk/api/usuario/alterarSenha?idUser=' + this.user + '&oldPass=' + this.old + '&newPass=' + this.new)
            .then((response) => {
                this.isLoading = false
                console.log(response.body)
                this.$router.go({ name: 'compromissos'})
            })
            .catch((error) => {
                this.isLoading = false
                let e = error.body
                this.error = e.split(':').pop().split('"').shift()
            })
            .finally(function(){
                this.isLoading = false
            })
      }, 
    },

}
</script>  
<style scoped>
    h2 {
        font-size: 30px;
        margin-bottom: 20px
    }
    input {
        width: 500px
    }
    .alerta {
        color: orangered
    }
</style>