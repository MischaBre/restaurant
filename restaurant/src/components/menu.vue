<template>
    <div class="menubar bg-dark text-white">
        <h1>Lieblingsrestaurants</h1>
        <b-nav pills align="right">
            <b-nav-item v-for="item of menuitems" :key="item.name" :active="activeitem == item.name" @click="navClick(item.name)">
                <b-icon :icon="item.icon"></b-icon>
            </b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: 'menubar',
        data() {
            return {};
        },
        computed: {
            menuitems() {
                return this.$store.getters.menuitems;
            },
            activeitem() {
                return this.$store.getters.activeitem;
            }
        },
        methods: {
            navClick: function (payload) {
                this.$store.commit('activeitem', payload);
            }
        }

    }
</script>

<style scoped>
    .menubar {
        display: flex;
        flex-direction: column;
        align-items: end;

        padding: 1rem;
    }
</style>