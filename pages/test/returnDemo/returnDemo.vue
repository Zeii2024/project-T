<template>
	<view>
		<!-- a定义在了return之外,就不是响应式的了，所以第一个button中间显示的a一直都是最开始的初始值false,但是点击的时候是在改变a的值，
		clickA方法中打出来的a是true/false/true/false,并且使用watch监听不到a的变化，即不进入watch中的方法。
		b定义在了return之内,是响应式，
		第二个button中间显示的b就是true/false/true/false,
		并且使用watch能监听到b的变化,即watch中也会打印出来b是true/false/true/false。 -->
		<button type="primary" @click="clickA">{{a}}</button>
		<button type="primary" @click="clickB">{{b}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			this.a = false
			const arr = []
			return {
				b: false,
			}
		},
		watch: {
			a(newVal) {
				console.log(newVal)
			},
			b(newVal) {
				console.log(newVal)
			}
		},
		methods: {
			clickA() {
				this.a = !this.a
				console.log("methods--a:", this.a)
			},
			clickB() {
				this.b = !this.b
				console.log("methods--b:", this.b)
			}
		}
	}
</script>

<style>

</style>