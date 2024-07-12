<template>
	<view>
		<uni-popup type="center" ref="popup">
			<view style="background-color: aliceblue;">
				<tags-input style="border: 20px;"></tags-input>
				<tags-input style="border: 20px;"></tags-input>
				<tags-input style="border: 20px;"></tags-input>
				<tags-input style="border: 20px;"></tags-input>
				<tags-input style="border: 20px;"></tags-input>
				<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
					<uni-forms-item name="members" label="阶段成员">
						<uni-easyinput placeholder="阶段成员" v-model="formData"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="sort" label="阶段排序">
						<uni-easyinput placeholder="阶段排序" type="number" v-model="formData"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="permision" label="权限">
						<uni-data-checkbox :multiple="true" v-model="formData"></uni-data-checkbox>
					</uni-forms-item>
					<uni-forms-item name="start_time" label="开始时间">
						<uni-datetime-picker return-type="timestamp" v-model="formData"></uni-datetime-picker>
					</uni-forms-item>
					<uni-forms-item name="end_time" label="结束时间">
						<uni-datetime-picker return-type="timestamp" v-model="formData"></uni-datetime-picker>
					</uni-forms-item>
					<uni-forms-item name="create_time" label="创建时间">
						<uni-datetime-picker return-type="timestamp" v-model="formData"></uni-datetime-picker>
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-popup>
		<button @click="show">打开表单</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: false,
				formData: ""
			}
		},
		methods: {
			show() {
				this.showPopup = true
				this.$refs.popup.open("center")
			}
		}
	}
</script>

<style></style>