<template>
	<view class="uni-container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="uni-id-users"
			field="username">
			<!-- [ { "_id": "6672f28221821b6d2b00df18", "username": "terry" },
			{ "_id": "_uni_starter_test_user_id", "username": "uni-starter预置用户名" }, 
			{ "_id": "668cfe16a7c432be30568abf", "username": "test01" }, 
			{ "_id": "668d0ad989bd273fb311c427", "username": "test02" }, 
			{ "_id": "668d0ae98620667bb416d74b", "username": "test03" }, 
			{ "_id": "668d0b031c90b65e4374424d", "username": "test04" } ] -->
			<!-- <view>				
				{{data}}				
			</view> -->
			<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
				<uni-forms-item name="stage_id" label="阶段id">
					<uni-easyinput :disabled="false" placeholder="阶段id" v-model="formData.stage_id"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="project_id" label="项目id" required>
					<uni-easyinput :disabled="false" placeholder="项目id" v-model="formData.project_id"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="name" label="阶段名称" required>
					<uni-easyinput placeholder="阶段名称" v-model="formData.name"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="state" label="阶段状态">
					<uni-easyinput placeholder="阶段状态, 1:未开始,2:进行中,3:已完成,4:延期中,5:已中止" type="number"
						v-model="formData.state"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="owner" label="负责人">
					<!-- :relativeOpts="data" -->
					<multags-input class="uni-easyinput" placeholder="负责人" :relativeOpts="data"></multags-input>
					<!-- <uni-easyinput placeholder="负责人" v-model="formData.owner"></uni-easyinput> -->
				</uni-forms-item>
				<uni-forms-item name="members" label="阶段成员">
					<uni-easyinput placeholder="阶段成员" v-model="formData.members"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="sort" label="阶段排序">
					<uni-easyinput placeholder="阶段排序" type="number" v-model="formData.sort"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="permision" label="权限">
					<uni-data-checkbox :multiple="true" v-model="formData.permision"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item name="start_time" label="开始时间">
					<uni-datetime-picker return-type="timestamp" v-model="formData.start_time"></uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item name="end_time" label="结束时间">
					<uni-datetime-picker return-type="timestamp" v-model="formData.end_time"></uni-datetime-picker>
				</uni-forms-item>
				<uni-forms-item name="create_time" label="创建时间">
					<uni-datetime-picker return-type="timestamp" v-model="formData.create_time"></uni-datetime-picker>
				</uni-forms-item>
				<view class="uni-button-group">
					<button type="primary" class="uni-button" @click="submit">提交</button>
				</view>
			</uni-forms>

		</unicloud-db>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/admin-stages.js';

	const db = uniCloud.database();
	const dbCollectionName = 'admin-stages';

	function getValidator(fields) {
		let result = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}

	export default {
		data() {
			let formData = {
				"stage_id": "",
				"project_id": "",
				"name": "",
				"state": null,
				"owner": "",
				"members": "",
				"sort": null,
				"permision": [],
				"start_time": null,
				"end_time": null,
				"create_time": null
			}
			return {
				//relativeOpts="userList"
				userList: [db.collection('uni-id-users').field('username').get()],
				formData,
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			// let res = db.collection('uni-id-users').field('username').get();
			// console.log(res)
			// this.$nextTick(() => {				
			// 	this.$refs.form.setRules(this.rules)
			// })
			this.$refs.form.setRules(this.rules)
			// console.log("users:", this.getUsers())
		},

		mounted() {
			// this.$nextTick(() => {
			// 	this.$refs.form.setRules(this.rules)
			// })
			// this.$refs.form.setRules(this.rules)
		},
		methods: {
			// getUsers() {
			// 	var userData = JSON.stringify(this.$refs.udb.data)
			// 	let pp = JSON.parse(userData)
			// 	console.log("userData: ", userData)
			// 	var users = []
			// 	var i = 0
			// 	// for (let u of userData) {
			// 	// 	users[i++] = Object(u)[1]
			// 	// }
			// 	// return users
			// },
			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				// 使用 clientDB 提交数据
				return db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			}
		}
	}
</script>

<style>
	.uni-container {
		padding: 15px;
	}

	.uni-input-border,
	.uni-textarea-border {
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.uni-input-border {
		padding: 0 10px;
		height: 35px;

	}

	.uni-textarea-border {
		padding: 10px;
		height: 80px;
	}

	.uni-button-group {
		margin-top: 50px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
	}

	.uni-button {
		width: 184px;
	}
</style>