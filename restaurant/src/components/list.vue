<template>
    <div>
        <li v-for="restaurant of restaurants">{{ restaurant.name }}</li>
    </div>
</template>

<script>
    export default {
        name: 'restList',
        data() {
            return {
                restaurants: [
                    { name: 'this' },
                    { name: 'is' },
                    { name: 'mock' },
                    { name: 'data' },
                ]
            };
        },
        computed: {},
        methods: {}

    }
</script>

<style scoped>

</style>