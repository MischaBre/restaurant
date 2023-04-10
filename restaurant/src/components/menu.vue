<template>
    <div class="menubar">
        Malina ist süs!
    </div>
</template>

<script>
    export default {
        name: 'menubar',
        data() {
            return {
            };
        },

    }
</script>

<style scoped>
    .menubar {
        min-height: 100;
        min-width: 300;

        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;

        margin: 1rem;
        padding: 1rem;
        border-radius: 1rem;

        background-color: whitesmoke;
    }
</style>