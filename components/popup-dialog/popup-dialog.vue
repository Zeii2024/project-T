<template>
	<view class="popup-dialog" v-show="show">
		<uni-popup type="center" v-if="show" ref="popup" style="height:80%;background-color: aqua;">
			// TODO 表单做成组件
			<view class="vv" style="background-color:white;">
				<tags-input style="margin: 20px;" v-model="formData.tags">InputHerre</tags-input>
				<tags-input style="margin: 20px;">InputHerre</tags-input>
				<tags-input style="margin: 20px;">InputHerre</tags-input>
				<button v-model="formData.name"></button>
				<radio></radio>
				<button @click="close">关闭</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "popup-dialog",
		props: {
			show: Boolean,
			formData: {
				tags: [],
				name: ""
			}
		},
		created() {
			this.toggle("center")
		},
		methods: {
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			close() {
				this.$emit('update:show', false)
			}
		}
	}
</script>