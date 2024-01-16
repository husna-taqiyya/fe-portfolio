<template>
    <h1>Ninja Reaction Timer</h1>
    <button @click="start">play</button>
    <Block />
</template>

<script>
import Block from '../pages/block.vue'
export default {
    name: 'App',
    components: { Block },
    data() {
        return {
            isPlaying: false,
            delay: null
        }
    },
    methods: {
        start() {
            this.delay = 2000 + Math.random() * 5000
            this.isPlaying = true
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #444;
    margin-top: 60px;
}
</style>