<template>

<div class="box" id="login">
    <center><h1>7Virtual</h1></center>
    
    <label class="label">Usuário</label>
    <input class="input" type="text"> 
    
    <br><br>
    <label class="label">Senha</label>
    <input class="input" type="password"><br><br>
    
    <center>
        <button class="button is-primary" v-link="{ path: '/ccompromissos' }">Login</button>
    </center>
    
    
</div>

</template>

<script></script>

<style scoped>
    #login{
        position: fixed;
        left:50%;
        top:35%;
        margin-left:-115px;
        margin-top:-30px;
           
    }
    button {
        width: 100;
    }

</style>