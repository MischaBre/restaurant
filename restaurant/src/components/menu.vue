<template>
    <div class="menubar bg-dark text-white">
        <h2>Lieblingsrestaurants</h2>
        <b-nav pills align="right">
            <b-nav-item v-for="item of menuitems" :key="item.name" :active="activeitem == item.name" @click="navClick(item.name)">
                <b-icon :icon="item.icon"></b-icon>
            </b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'menubar',
        data() {
            return {};
        },
        computed: {
            ...mapGetters({
                menuitems: 'navigation/menuitems',
                activeitem: 'navigation/activeitem',
            })
        },
        methods: {
            navClick: function (payload) {
                this.$store.commit('navigation/activeitem', payload);
            }
        },

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