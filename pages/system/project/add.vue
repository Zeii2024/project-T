<!-- <template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="project_id" label="ProjectId" required>
				<uni-easyinput :disabled="true" placeholder="项目id" v-model="formData.project_id"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="name" label="项目名称" required>
				<uni-easyinput :disabled="true" placeholder="项目名称" v-model="formData.name"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="description" label="项目描述">
				<textarea placeholder="项目描述" @input="binddata('description', $event.detail.value)"
					class="uni-textarea-border" v-model="formData.description"></textarea>
			</uni-forms-item>
			<uni-forms-item name="project_type" label="">
				<uni-easyinput placeholder="项目类型，1：个人，2：企业" type="number"
					v-model="formData.project_type"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="owner_id" label="">
				<uni-data-checkbox :multiple="true" v-model="formData.owner_id"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="members" label="">
				<uni-data-checkbox :multiple="true" v-model="formData.members"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item name="stages" label="">
				<uni-data-picker :multiple="true" v-model="formData.stages" collection="admin-stages"
					field="stage_id as value"></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="state" label="">
				<uni-easyinput placeholder="项目所处状态，1:未开始，2：进行中，3：已结束，4：延期中，5：已中止" type="number"
					v-model="formData.state"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="cost" label="">
				<uni-easyinput placeholder="当前成本" type="number" v-model="formData.cost"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="total_cost" label="">
				<uni-easyinput placeholder="总成本" type="number" v-model="formData.total_cost"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="other_cost" label="">
				<uni-easyinput placeholder="其他成本" v-model="formData.other_cost"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="start_time" label="">
				<uni-datetime-picker return-type="timestamp" v-model="formData.start_time"></uni-datetime-picker>
			</uni-forms-item>
			<uni-forms-item name="end_time" label="">
				<uni-datetime-picker return-type="timestamp" v-model="formData.end_time"></uni-datetime-picker>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/admin-projects.js';

	const db = uniCloud.database();
	const dbCollectionName = 'admin-projects';

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
				"end_time": null
			}
			return {
				formData,
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {

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
</style> -->