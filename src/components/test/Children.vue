<template>
	<div style="color: brown">子组件</div>
	<div>父组件传过来的值为：{{ title }}-- {{ msg }}</div>
	<button @click="emitXx">给父组件</button>
</template>

<script>
module.exports = {
	name: "test.Children",
	props: {
		title: {
			type: String,
		},
		msg: {
			type: String,
		},
	},
	setup(prop, context) {
		// props 参数，是一个对象，里面有父级组件向子组件传递的数据，
		// 且是在子组件中使用props接收到的所有的属性
		// 包含props 配置声明且传入了的所有属性的对象
		console.log(prop, context);
		// context.attrs 可以查询到在props中没有定义的属性
		// console.log(context.attrs.msg);
		function emitXx() {
			let ask = "nihao";
			// context作用是获取上下文对象，
			// 如果setup写法为setup(props, { emit })的方式的话，下面的context可以省略
			context.emit("xxx", ask);
		}
		return {
			emitXx,
		};
	},
};
</script>

<style scoped>

</style>