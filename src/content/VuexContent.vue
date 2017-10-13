<template>
    Vuex Content
    <button @click="trySetUser">Vuex doAction</button>
    {{user | json }}    
</template>
<script>
    export default{
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
        methods: {
            trySetUser(){
                  let user = {
                    user: {
                        username: 'New username',
                        email: 'email@email.com'
                    }
                  }
                  this.setUser(user);
            }
        }
    }    
</script>