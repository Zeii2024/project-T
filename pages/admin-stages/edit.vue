<!-- <template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="stage_id" label="StageId">
        <uni-easyinput :disabled="true" placeholder="阶段id" v-model="formData.stage_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="project_id" label="ProjectId" required>
        <uni-easyinput :disabled="true" placeholder="对应的项目id" v-model="formData.project_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="" required>
        <uni-easyinput placeholder="阶段名称" v-model="formData.name"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="state" label="">
        <uni-easyinput placeholder="阶段状态, 1:未开始,2:进行中,3:已完成,4:延期中,5:已中止" type="number" v-model="formData.state"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="owner" label="">
        <uni-easyinput placeholder="负责人" v-model="formData.owner"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="members" label="">
        <uni-easyinput placeholder="阶段成员" v-model="formData.members"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="sort" label="">
        <uni-easyinput placeholder="阶段排序" type="number" v-model="formData.sort"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="permision" label="">
        <uni-data-checkbox :multiple="true" v-model="formData.permision"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="start_time" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.start_time"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="end_time" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.end_time"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="create_time" label="">
        <uni-datetime-picker return-type="timestamp" v-model="formData.create_time"></uni-datetime-picker>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/admin-stages.js';

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
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
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
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("stage_id,project_id,name,state,owner,members,sort,permision,start_time,end_time,create_time").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
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
</style -->>



<template>
	<transition name="dialog-fade">
		<el-dialog v-if="showDialog" :title="dialogTitle" class="dialog-component" :visible.sync="showDialog"
			width="500px" @close="closeDialog(0)">

			<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
				<uni-forms-item name="stage_id" label="阶段id">
					<uni-easyinput :disabled="false" placeholder="阶段id" v-model="formData.stage_id"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="project_id" label="对应的项目id" required>
					<uni-easyinput :disabled="false" placeholder="对应的项目id"
						v-model="formData.project_id"></uni-easyinput>
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
					<uni-datetime-picker return-type="timestamp" v-model="formData.create_time"></uni-datetime-picker>
				</uni-forms-item>
				<view class="uni-button-group">
					<button class="uni-button" type="primary" size="mini" @click="submit">确定</button>
					<button class="uni-button" type="warn" size="mini" @click="closeDialog(0)">取消</button>
				</view>
			</uni-forms>
		</el-dialog>
	</transition>
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
		name: "DialogComponent",
		props: {
			dialogTitle: {
				type: String,
				default: "添加人员",
			},
			itemInfo: {
				type: Object,
				default: function() {
					return {};
				},
			},
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
			console.log("edit form************")
			return {
				showDialog: false,
				formData: JSON.parse(JSON.stringify(this.itemInfo)),
				formOptions: {},
				rules: {
					...getValidator(Object.keys(formData))
				}
			}
		},

		onReady() {
			/* ToDo 表单验证 */
			this.$refs.form.setRules(this.rules)
		},

		methods: {
			initFormData(item) {
				let i = item
				i.members = JSON.stringify(i.members)
				return i
			},
			//验证表单并提交			 
			submit() {
				uni.showLoading({
					mask: true
				})
				console.log("dialogCompent--res:")
				// console.log(JSON.stringify(res))
				/* 出错，验证通过不了 ToDo */
				this.$refs.form.validate().then((res) => {
					return this.submitForm(res)
				}).catch(() => {}).finally(() => {
					uni.hideLoading()
					let formData = {}
				})

			},
			//提交表单
			submitForm(value) {
				// 使用 clientDB 提交数据
				console.log("提交表单submitForm...........................")
				console.log(this.formDataId)
				return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
					that.closeDialog(1);
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				})
			},
			// 关闭弹框
			closeDialog(flag) {
				// this.$refs["formInfo"].resetFields();
				this.showDialog = false;
				this.$emit("closeDialog", flag);
				this.formData = {}
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName).doc(id).field(
						"stage_id,project_id,name,state,owner,members,sort,permision,start_time,end_time,create_time")
					.get().then((res) => {
						const data = res.result.data[0]
						if (data) {
							this.formData = data

						}
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					}).finally(() => {
						uni.hideLoading()
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