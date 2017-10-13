<template>  
    <button v-on:click.stop="chamarPai">Chamar papai</button>
</template>  
<script type="text/babel">  
    // ...
    data() {
        frase: '',
    },
    methods: {
        chamarPai() {
            this.$emit('chamou');
        },
    },
    // ...
</script>  