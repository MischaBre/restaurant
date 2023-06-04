<template>
	<div class="d-flex flex-column">
		<menubar></menubar>
		<div class="content">
			<component :is="activeitem"></component>
		</div>	
	</div>
</template>

<script>
	import restMap from './components/mainMap.vue';
	import restList from './components/list.vue';
	import restAdd from './components/add.vue';
	import menubar from './components/menu.vue';

	import { mapGetters } from 'vuex';
	
	export default {
		name: 'App',
		components: {
			'menubar': menubar,
			'restList': restList,
			'restAdd': restAdd,
        	'restMap': restMap,
     	},
		computed: {
			...mapGetters({
				activeitem: 'navigation/activeitem'
			})
		}
	}
</script>

<style scoped>
.content {
	margin: 2rem;
	
	
}
	@media (min-width: 1024px) {
		/*non mobile design */
	}
</style>
