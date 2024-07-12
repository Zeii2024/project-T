<template>
	<view class="uni-container">
		<el-form ref="form" :model="formData" :rules="rules">
			<el-form-item prop="project_id" label="项目序号" required>
				<el-input :disabled="false" placeholder="项目id" v-model="formData.project_id"></el-input>
			</el-form-item>
			<!-- disabled属性来控制是否可以输入 -->
			<el-form-item prop="name" label="项目名称" required>
				<el-input :disabled="false" placeholder="项目名称" v-model="formData.name"></el-input>
			</el-form-item>
			<el-form-item prop="description" label="项目描述">
				<el-input v-model="formData.description" style="width: 240px" :autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea" placeholder="项目描述" />
				<!-- <textarea placeholder="项目描述" @input="binddata('description', $event.detail.value)"
					class="uni-textarea-border" v-model="formData.description"></textarea> -->
			</el-form-item>
			<el-form-item prop="owner_id" label="项目负责人" required="">
				<el-select v-model="formData.owner_id" clearable multiple filterable allow-create default-first-option
					placeholder="输入项目负责人，用回车添加"></el-select>
				<el-option v-for="item in project_owner_id" :key="item.value" :label="item.label"
					:value="item.label"></el-option>
			</el-form-item>

			<el-form-item prop="members" label="项目成员" required>
				<el-input :disabled="false" placeholder="成员姓名" v-model="formData.members"></el-input>
			</el-form-item>

			<uni-section title="项目类型-单选" type="line">
				<view class="uni-px-5 uni-pb-5">
					<view class="text">选中：{{JSON.stringify(formData.project_type)}}</view>
					<uni-data-checkbox v-model="formData.project_type" :localdata="project_type"></uni-data-checkbox>
				</view>
			</uni-section>
			<uni-section title="项目状态-单选" type="line">
				<view class="uni-px-5 uni-pb-5">
					<view class="text">选中：{{JSON.stringify(formData.state)}}</view>
					<uni-data-checkbox v-model="formData.state" :localdata="project_state"></uni-data-checkbox>
				</view>
			</uni-section>
			<uni-section title="项目阶段-单选" type="line">
				<view class="uni-px-5 uni-pb-5">
					<view class="text">选中：{{JSON.stringify(formData.stages)}}</view>
					<uni-data-checkbox v-model="formData.stages" :localdata="project_stages"></uni-data-checkbox>
				</view>
			</uni-section>

			<el-form-item prop="cost" label="当前成本">
				<el-input placeholder="当前成本" type="number" v-model="formData.cost"></el-input>
			</el-form-item>
			<el-form-item prop="total_cost" label="总成本">
				<el-input placeholder="总成本" type="number" v-model="formData.total_cost"></el-input>
			</el-form-item>
			<el-form-item prop="other_cost" label="其他成本">
				<el-input placeholder="其他成本" v-model="formData.other_cost"></el-input>
			</el-form-item>
			<el-form-item prop="start_time" label="项目开始时间">
				<uni-datetime-picker return-type="timestamp" v-model="formData.start_time"></uni-datetime-picker>
			</el-form-item>
			<el-form-item prop="end_time" label="项目结束时间">
				<uni-datetime-picker return-type="timestamp" v-model="formData.end_time"></uni-datetime-picker>
			</el-form-item>

			<uni-dateformat return-type="timestamp" v-model="formData.create_date"></uni-dateformat>

			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</el-form>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/admin-projects.js';

	const db = uniCloud.database();
	const dbCollectionName = 'admin-projects';
	//const dbCollectionUser = 'uni-id-users'; //用户表

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
				"project_id": "",
				"name": "",
				"description": "",
				"project_type": null,
				"owner_id": [],
				"members": [],
				"stages": [],
				"state": null,
				"cost": null,
				"total_cost": null,
				"other_cost": "",
				"start_time": null,
				"end_time": null,
				"create_date": null
			}
			return {
				project_owner_id: [db.collection('uni-id-users').field('username').getTemp()],

				project_type: [{
					text: '个人',
					value: 1
				}, {
					text: '企业',
					value: 2
				}, {
					text: '未知',
					value: 3
				}],
				/* 未开始，2：进行中，3：已结束，4：延期中，5：已中止 */
				project_state: [{
					text: '未开始',
					value: 1
				}, {
					text: '进行中',
					value: 2
				}, {
					text: '已结束',
					value: 3
				}, {
					text: '延期中',
					value: 4
				}, {
					text: '已中止',
					value: 5
				}],
				project_stages: [{
					text: '立项',
					value: 1001
				}, {
					text: '招标',
					value: 1002
				}, {
					text: '进行中',
					value: 1003
				}, {
					text: '延期中',
					value: 1004
				}, {
					text: '已中止',
					value: 1005
				}],


				formData,
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			// this.$refs.form.setRules(this.rules)
		},
		methods: {
			//查询用户表，得到用户名列表，并存到project_owner_id
			QueryUsers() {
				console.log("用户表姓名：", project_owner_id)
			},

			//验证表单并提交
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

			//提交表单
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
	.text {
		font-size: 12px;
		color: #666;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}



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

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.button-text {
		color: #fff;
		font-size: 12px;

	}
</style>