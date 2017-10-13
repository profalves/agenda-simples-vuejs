<template>
    Resuorce Content

    <button @click="onButtonClick">get foo.json</button> 
    {{fooMessage}}

</template>
<script>
    export default{
        data () {
            return {
                fooMessage: ''
            }
        },
        methods :{
            onButtonClick() {
                this.$http.get('/foo.json').then(
                (response) => {
                    this.fooMessage = JSON.parse(response.data).msg
                },
                (error) => {
                    console.error(error.statusText)
                })
            }
        }
    }    
</script>