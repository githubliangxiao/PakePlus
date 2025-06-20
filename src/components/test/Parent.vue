<template>
	<div style="color: aqua">父组件</div>
	<button @click="uoData">给子组件</button>
	<h4>子传过来的-- {{ children_msg }}</h4>
	<hr />
	<Children :title="msg" :msg="dataMsg" @xxx="hh"></Children>
	<hr />
	<el-button @click="fnGotoLogin">Login</el-button>
</template>

<script>
const { defineAsyncComponent, ref } = Vue;
const Children = defineAsyncComponent(() => (loadModule("/components/test/Children.vue", loaderOptions)));
module.exports = {
	name: "test.Parent",
	components: {
		Children
	},
	setup () {
		const router = useRouter();
		let msg = ref("");
		let dataMsg = ref("ooooo");
		function uoData() {
			msg.value = msg.value + "44";
		}
		let children_msg = ref("");
		console.log(children_msg, "children_msg");
		function hh(val) {  // 警告解决办法： 加类型
			console.log(val, "val");
			// 使用ref包裹的数据，需要通过 .value 的形式访问他的值
			children_msg.value = val;
		}
		
		function fnGotoLogin () {
			router.push("/login");
		}
		
		return {
			msg,
			dataMsg,
			uoData,
			hh,
			children_msg,
			fnGotoLogin,
		};
	}
};
</script>

<style scoped>

</style>