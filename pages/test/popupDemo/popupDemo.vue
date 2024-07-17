<template>
	<view>
		<uni-section title="输入框示例" type="line" padding>
			<view class="dialog-box">
				<text class="dialog-text">输入内容：{{ value }}</text>
			</view>
			<button class="button" type="primary" @click="inputDialogToggle"><text
					class="button-text">输入对话框</text></button>
		</uni-section>

		<!-- 输入框示例 -->
		<uni-popup ref="inputDialog" type="dialog">
			<!-- <edit-stage >编辑阶段组件</edit-stage> -->
			<uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容"
				@confirm="dialogInputConfirm"></uni-popup-dialog>

		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			}
		},
		methods: {
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			}

		}
	}
</script>

<style>

</style>