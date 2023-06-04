<template>
    <div id="map" class="mapContainer"></div>
</template>

<script>
    import mapboxgl from 'mapbox-gl';

    export default {
        name: 'restMap',
        data() {
            return {
                accessToken: 'pk.eyJ1IjoiZ2Vtc2FtaWNoYWVsIiwiYSI6ImNsZ2I5ZGhqNzA0eDkzZHFtMjQ4a3JubHoifQ.Ef2vzTjzU_inthBvY-NfYA'
            };
        },
        mounted() {
            mapboxgl.accessToken = this.accessToken;

            const restMap = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [-74.5, 40], // starting position [lng, lat]
                zoom: 9, // starting zoom
            });
        }
    }
</script>

<style scoped>
    .mapContainer {
        width: 100%;
        height: 70vh;
    }
</style>