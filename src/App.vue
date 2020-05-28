<template>
	<div id="app">
		<v-header ref="header" v-if="isRouterAlive"></v-header>
		<router-view v-if="isRouterAlive"></router-view>
		<v-footer></v-footer>
	</div>
</template>
<script>
export default {
	provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
		return {
			reload: this.reload,
			headerStyle:this.headerStyle,
			headerIsShow:this.headerIsShow
		}
	},
	data () {
		return {
			isRouterAlive: true
		}
	},
	methods: {
		reload () {
			this.isRouterAlive = false;            //先关闭，
			this.$nextTick(function () {
				this.isRouterAlive = true;         //再打开
			}) 
		},
		headerIsShow(){
			this.$refs.header.isHome=true;
		}
	},
}
</script>
<style lang="scss" lang="scss">
</style>
