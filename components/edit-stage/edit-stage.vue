<template>
	<view class="uni-container" style="background-color: azure;">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="stage_id" label="阶段id">
				<uni-easyinput :disabled="false" placeholder="阶段id" v-model="formData.stage_id"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="project_id" label="对应的项目id" required>
				<uni-easyinput :disabled="false" placeholder="对应的项目id" v-model="formData.project_id"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="阶段名称" label="阶段名称" required>
				<uni-easyinput placeholder="阶段名称" v-model="formData.name"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="state" label="阶段状态">
				<uni-easyinput placeholder="阶段状态, 1:未开始,2:进行中,3:已完成,4:延期中,5:已中止" type="number"
					v-model="formData.state"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="owner" label="负责人">
				<uni-easyinput placeholder="负责人" v-model="formData.owner"></uni-easyinput>
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
				<uni-datetime-picker return-type="timestamp" v-model="itemInfo.create_time"></uni-datetime-picker>
			</uni-forms-item>
			<!-- <text>{{testInfo}}</text> -->
			<!-- <text>{{this.formData}}</text> -->
			<!-- 如果在此处传递 this.formData会报错 -->
			<view class="uni-button-group">
				<button class="uni-button" type="primary" size="mini"
					@click="submit()">{{$t('common.button.submit')}}</button>
				<button class="uni-button" type="warn" size="mini" @click="closeDialog(0)">取消</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/admin-stages.js';

	const db = uniCloud.database();
	const dbCollectionName = 'admin-stages';

	function getValidator(fields) {
		console.log("edit-stage.vue ######getValidator#####")
		let result = {}
		for (let key in validator) {
			if (fields.indexOf(key) > -1) {
				result[key] = validator[key]
			}
		}
		return result
	}
	export default {
		name: "edit-stage",
		props: {
			testInfo: {
				type: String,
				default: null
			},
			itemInfo: {
				type: Object,
				// 对象或数组默认值必须从一个工厂函数获取
				default: function() {
					return {
						message: '没有数据，请排查'
					}
				}
			}
			// title: "测试一下属性的用法"
		},
		data() {
			let formData = {
				"_id": "",
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
			console.log("edit-stage.vue#######data()")
			return {
				// formData: JSON.parse(JSON.stringify(this.itemInfo)),
				// formData: {
				// 	// "_id": "",
				// 	"stage_id": "",
				// 	"project_id": "",
				// 	"name": "",
				// 	"state": 0,
				// 	"owner": "",
				// 	"members": "",
				// 	"sort": null,
				// 	"permision": [],
				// 	"start_time": null,
				// 	"end_time": null,
				// 	"create_time": null
				// },
				formData: this.itemInfo,
				rules: {
					...getValidator(Object.keys(formData))
				}
			};
		},

		onLoad(e) {
			console.log("edit-stage.vue ######onLoad#####")
			const id = e.id
			this.formDataId = id
			console.log("edit-stage.vue####onLoad()###e.id", id, "###formDataId###", this.formDataId)
			let userInfo = uni.getStorageSync("uni-id-pages-userInfo") || {};
			console.log("edit-stage.vue####onLoad()###userInfo", userInfo,
				" ###userInfo._id", userInfo._id)
			this.userId = userInfo._id;
			this.getDetail(id)
		},
		onReady() {
			console.log("edit-stage.vue####onReady()###", this.rules)
			/* ToDo 表单验证 */
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			getDetail(id) {
				console.log("edit-stage.vue ######getDetail#####")
				//显示加载圈
				uni.showLoading({
					mask: true
				})
				//获取表单数据
				db.collection(dbCollectionName) /* admin-stages */
					.doc(id)
					.field(
						'stage_id,project_id,name,state,owner,members,sort,permission,start_time,end_time,create_time'
					)
					.get()
					.then((res) => {
						const data = res.result.data[0]
						console.log("edit-stage.vue####onLoad()###getDetail()###res:", data, "###res:", res)
						if (data) {
							if (data.status === undefined) {
								data.status = true
							}
							if (data.status === 0) {
								data.status = true
							}
							if (data.status === 1) {
								data.status = false
							}
							this.formData = Object.assign(this.formData, data);
						}
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading()
					})
			},

			/**
			 * 验证表单并提交
			 */
			submit() {
				console.log("edit-stage.vue ######submit#####")
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					console.log("edit-stage.vue ######submit#####res", res)
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 提交表单
			 */
			submitForm(value) {
				console.log("edit-stage.vue ######submitForm#####value ", value)
				const id = this.itemInfo._id
				this.formDataId = id
				// this.formDataId = JSON.stringify(value._id)
				console.log("edit-stage.vue ######submitForm#####this.formDataId ", this.formDataId)
				// 使用 clientDB 提交数据,更新一条记录
				return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					// this.getOpenerEventChannel().emit('refreshData') //页面跳转，跳转回父页面
					//todo 关闭弹窗
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			},

			// submitForm(form) {
			// 	console.log("edit-stage.vue ######submitForm", form)
			// 	this.$refs.form.submit();
			// },
			//验证表单并提交			 
			// submit(event) {
			// 	console.log("edit-stage.vue ####submit", event)

			// 	/* 出错，验证通过不了 ToDo */
			// 	// this.$refs.form.validate().then((res) => {
			// 	// 	return this.submitForm(res)
			// 	// }).catch(() => {}).finally(() => {
			// 	// 	uni.hideLoading()
			// 	// 	let formData = {}
			// 	// })

			// 	const {
			// 		value,
			// 		errors
			// 	} = event.detail

			// 	// 表单校验失败页面会提示报错 ，要停止表单提交逻辑
			// 	if (errors) {
			// 		return
			// 	}
			// 	console.log("edit-stage.vue ####methods.submit###value", value)
			// 	console.log("edit-stage.vue ####methods.submit##errors", errors)
			// 	uni.showLoading({
			// 		title: '修改中...',
			// 		mask: true
			// 	})
			// 	// 使用 uni-clientDB 提交数据
			// 	db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
			// 		uni.showToast({
			// 			title: '修改成功'
			// 		})
			// 		this.getOpenerEventChannel().emit('refreshData')
			// 		setTimeout(() => uni.navigateBack(), 500)
			// 	}).catch((err) => {
			// 		uni.showModal({
			// 			content: err.message || '请求服务失败',
			// 			showCancel: false
			// 		})
			// 	}).finally(() => {
			// 		uni.hideLoading()
			// 	})

			// },
			//提交表单
			// submitForm(formData) {
			// 	// 使用 clientDB 提交数据
			// 	console.log("提交表单submitForm...........................")
			// 	console.log("formData:", formData)
			// 	console.log(JSON.stringify(this.formDataId))

			// 	return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '修改成功'
			// 		})
			// 		this.getOpenerEventChannel().emit('refreshData')
			// 		setTimeout(() => uni.navigateBack(), 500)
			// 		that.closeDialog(1);
			// 	}).catch((err) => {
			// 		uni.showModal({
			// 			content: err.message || '请求服务失败',
			// 			showCancel: false
			// 		})
			// 	})
			// },

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			// getDetail(id) {
			// 	uni.showLoading({
			// 		mask: true
			// 	})
			// 	db.collection(dbCollectionName).doc(id).field(
			// 			"stage_id,project_id,name,state,owner,members,sort,permision,start_time,end_time,create_time")
			// 		.get().then((res) => {
			// 			const data = res.result.data[0]
			// 			if (data) {
			// 				this.formData = data

			// 			}
			// 		}).catch((err) => {
			// 			uni.showModal({
			// 				content: err.message || '请求服务失败',
			// 				showCancel: false
			// 			})
			// 		}).finally(() => {
			// 			uni.hideLoading()
			// 		})
			// },

			// 关闭弹框
			closeDialog(flag) {
				console.log("edit-stage###关闭弹框")
				uni.navigateTo({
					// delta: 2, //返回层数，2则上上页; 因为要关闭的是弹框，所以用这个属性不起作用
					url: 'list'
				})

				//关闭当前窗口
				// this.$refs["formInfo"].resetFields();
				// this.showDialog = false;
				// this.$emit("closeDialog", flag);
				// this.formData = {}
				// this.$refs.udb.remove(this._id, {
				// 	success: (res) => {
				// 		// 删除数据成功后跳转到list页面
				// 		uni.navigateTo({
				// 			url: '../../pages/system/project/list'
				// 		})
				// 	}
				// })
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