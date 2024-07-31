<template>
	<view class="fix-top-window">
		<view class="uni-header">
			<uni-stat-breadcrumb class="uni-stat-breadcrumb-on-phone" />
			<view class="uni-group">
				<!-- 搜索框 -->
				<!-- 页面模板中使用 $t() 获取，并传递国际化json文件中定义的key，js中使用 this.$t('') -->
				<input class="uni-search" type="text" v-model="query" @confirm="search"
					:placeholder="$t('common.placeholder.query')" />
				<button class="uni-button hide-on-phone" type="default" size="mini"
					@click="search">{{$t('common.button.search')}}</button>

				<!-- 新增 ./add 当前目录的add文件  ../表示上一层目录  ../../表示上上层目录-->
				<button class="uni-button" type="primary" size="mini"
					@click="navigateTo('../../admin-projects/add')">{{$t('common.button.add')}}</button>
				<!-- 批量删除 -->
				<button class="uni-button" type="warn" size="mini" :disabled="!selectedIndexs.length"
					@click="delTable">{{$t('common.button.batchDelete')}}</button>
				<!-- #ifdef H5 -->
				<!-- #ifndef VUE3 -->
				<download-excel class="hide-on-phone" :fields="exportExcel.fields" :data="exportExcelData"
					:type="exportExcel.type" :name="exportExcel.filename">
					<button class="uni-button" type="primary" size="mini">{{$t('common.button.exportExcel')}}</button>
				</download-excel>
				<!-- #endif -->
				<!-- #endif -->
			</view>
		</view>

		<view class="uni-container">
			<unicloud-db ref="udb" collection="admin-projects,admin-stages" :where="where" page-data="replace"
				:orderby="orderby" :getcount="true" :page-size="options.pageSize" :page-current="options.pageCurrent"
				v-slot:default="{data,pagination,loading,error,options}">

				<view class="uni-side-screen" style="display: flex; width: 100%;height: 100%;">
					<!-- 项目左侧导航栏 -->
					<view
						style="align-self: flex-start; min-width: 15%; height: 100%; text-align: left; border: 2px;border-color: antiquewhite;">
						<uni-list height="auto">
							<uni-list-item v-for="item in data" :key="item.id" :title="item.name"
								@click="selectProject(item)" link>

							</uni-list-item>
						</uni-list>
					</view>
					<!-- 项目右侧内容区 -->
					<view
						style="align-self: flex-end; min-width: 15%; height: 100%; text-align: left; border: 2px;border-color: antiquewhite;">
						<!-- 项目基础信息 上部-->
						<view class="project_base"
							style="display:inline-block; width: 100%; min-height: 100px; padding-bottom: 30px;">
							<!-- 一行基础信息 -->
							<view calss="base_info_line" style="display: flex; flex-wrap: wrap; margin: 20px 0 0 20px;">
								<!-- 一项 -->
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-start; width: 50%;display: flex;">
									<!-- Key -->
									<view class="base_info_key" style="margin-left:20px;">
										<text>项目名:</text>
									</view>
									<!-- Value -->
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.name}}</text>
									</view>
								</view>
								<!-- 第二项 -->
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-end; width: 50%; display: flex;">
									<!-- Key -->
									<view class="base_info_key" style="margin-left:20px;">
										<text>负责人:</text>
									</view>
									<!-- Value -->
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.owner}}</text>
									</view>
								</view>
							</view>
							<!-- 一行基础信息 -->
							<view calss="base_info_line" style="display: flex; flex-wrap: wrap; margin: 20px 0 0 20px;">
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-start; width: 50%;display: flex;">
									<view class="base_info_key" style="margin-left:20px;">
										<text>项目成员:</text>
									</view>
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.members}}</text>
									</view>
								</view>
								<!-- 第二项 -->
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-end; width: 50%; display: flex;">
									<view class="base_info_key" style="margin-left:20px;">
										<text>项目状态:</text>
									</view>
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.state}}</text>
									</view>
								</view>
							</view>
							<!-- 一行基础信息 -->
							<view calss="base_info_line" style="display: flex; flex-wrap: wrap; margin: 20px 0 0 20px;">
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-start; width: 50%;display: flex;">
									<view class="base_info_key" style="margin-left:20px;">
										<text>项目进度:</text>
									</view>
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.stages}}</text>
									</view>
								</view>
								<!-- 第二项 -->
								<view class="base_info_item"
									style="flex-wrap: wrap; align-self: flex-end; width: 50%; display: flex;">
									<view class="base_info_key" style="margin-left:20px;">
										<text>项目成本:</text>
									</view>
									<view class="base_info_value" style="margin-left:20px;">
										<text>{{project.cost}}/{{project.total_cost}}</text>
									</view>
								</view>
							</view>
						</view>
						<!-- 项目基础信息（表格） 下部 -->
						<!-- table 和  uni-pagination必须是同级，否则页面中的表和页脚分离-->
						<uni-table ref="table" :loading="loading" :emptyText="error.message || $t('common.empty')"
							border stripe type="selection" @selection-change="selectionChange">
							<uni-tr>
								<uni-th align="center" filter-type="search">StageId</uni-th>
								<uni-th align="center" filter-type="search">阶段名称</uni-th>
								<uni-th align="center" filter-type="search">阶段状态</uni-th>
								<uni-th align="center" filter-type="search">负责人</uni-th>
								<uni-th align="center" filter-type="search">阶段成员</uni-th>
								<uni-th align="center" filter-type="timestamp">创建时间</uni-th>
								<uni-th align="center" :width="buttonThWidth">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(item,index) in stages" :key="index">
								<uni-td align="center">{{item.stage_id}}</uni-td>
								<uni-td align="center">{{item.name}}</uni-td>
								<uni-td align="left">{{item.state}}</uni-td>
								<uni-td align="center">{{item.owner}}</uni-td>
								<uni-td align="center">{{item.members}}</uni-td>
								<uni-td align="center">{{item.creat_time}}</uni-td>
								<uni-td align="center">
									<view class="uni-group">
										<!-- 阶段的修改和删除 弹窗表单形式 -->
										<button @click="editRow(item)" class="uni-button" size="mini"
											type="primary">{{$t('common.button.edit')}}</button>
										<button @click="confirmDelete(item._id)" class="uni-button" size="mini"
											type="warn">{{$t('common.button.delete')}}</button>
									</view>
								</uni-td>
							</uni-tr>
							<!-- 新增阶段 -->
							<uni-tr>
								<button class="uni-button" @click="navigateTo('../../admin-stages/add')">新增阶段</button>
							</uni-tr>

						</uni-table>


						<!--弹框组件开始-----------------------start-->
						<uni-popup ref="editDialog" type="dialog">
							<edit-stage :test-info="testInfo" :itemInfo="stageItem">编辑阶段组件</edit-stage>
						</uni-popup>
						<!-- <dialog-component v-if="showDialog" ref="dialogComponent" :dialog-title="dialogTitle"
							:item-info="stageItem" @closeDialog="closeDialog()"></dialog-component> -->
						<!--弹框组件开始-----------------------end-->

						<!-- 底部 -->
						<view class="uni-pagination-box">
							<uni-pagination show-icon show-page-size :page-size="pagination.size"
								v-model="pagination.current" :total="pagination.count" @change="onPageChanged"
								@pageSizeChange="pageSizeChange" />
						</view>
					</view>
				</view>
			</unicloud-db>
		</view>

		<!-- #ifndef H5 -->
		<fix-window />
		<!-- #endif -->
	</view>
</template>


<script>
	// import DialogComponent from "../../admin-stages/edit.vue";
	import {
		enumConverter,
		filterToWhere
	} from '../../../js_sdk/validator/admin-projects.js';
	import {
		mapState
	} from 'vuex'

	const db = uniCloud.database()
	// 表查询配置
	const dbOrderBy = 'create_date' // 排序字段
	const dbSearchFields = [] // 模糊搜索字段，支持模糊搜索的字段列表
	// 分页配置
	const pageSize = 20
	const pageCurrent = 1

	const orderByMapping = {
		"ascending": "asc",
		"descending": "desc"
	}

	export default {
		// name: "DialogDemo",
		// components: {
		// 	DialogComponent
		// },
		data() {
			return {
				collectionList: [db.collection('admin-projects').field(
						'project_id,name,description,create_date,cost, state, stages, total_cost, owner_id, members')
					.getTemp(), db.collection('admin-stages').field('_id,stage_id, name, owner').getTemp()
				],
				query: '',
				where: '',
				orderby: dbOrderBy,
				orderByFieldName: "",
				selectedIndexs: [],
				options: {
					pageSize,
					pageCurrent,
					filterData: {},
					...enumConverter
				},
				imageStyles: {
					width: 64,
					height: 64
				},
				exportExcel: {
					"filename": "opendb-app-list.xls",
					"type": "xls",
					"fields": {
						"ProjectId": "project_id",
						"项目名称": "name",
						"项目描述": "description",
						"创建时间": "create_date"
					}
				},
				project: {
					name: "",
					owner: "",
					members: "",
					state: 0,
					stages: "",
					cost: 0,
					total_cost: 0,
				},
				stages: [],

				stageItem: {
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
				},
				// dialogTitle: "添加阶段信息",
				// showDialog: false,
				testInfo: "测试通信",

				exportExcelData: [],
				addAppidLoading: true,
				descriptionThWidth: 380,
				buttonThWidth: 200
			}
		},
		onLoad() {
			this._filter = {}
		},
		onReady() {
			this.$refs.udb.loadData()
		},
		computed: {
			...mapState('app', ['appName', 'appid'])
		},
		methods: {
			// 关闭操作
			// closeDialog(flag) {
			// 	if (flag) {
			// 		// 重新刷新表格内容
			// 		// this.fetchData();
			// 		const that = this;
			// 		that.tableLoading = true;
			// 		setTimeout(() => {
			// 			that.tableLoading = false;
			// 		}, 1500);
			// 	}
			// 	this.showDialog = false;
			// },
			editRow(row) {
				console.log("#####################editDialog#######row##########################")
				this.stageItem = row;
				console.log("stageItem:", JSON.stringify(this.stageItem))
				this.$refs.editDialog.open()
				// this.dialogTitle = "编辑阶段信息";
				// this.showDialog = true;
				// this.$nextTick(() => {
				// 	this.$refs["dialogComponent"].showDialog = true;
				// });
			},
			pageSizeChange(pageSize) {
				this.options.pageSize = pageSize
				this.options.pageCurrent = 1
				this.$nextTick(() => {
					this.loadData()
				})
			},
			/* 选中项目导航中的一项后 */
			selectProject(item) {
				let mem = JSON.stringify(item.members)
				var st = []

				for (let e of item.stages) {
					//console.log(JSON.stringify(e.name)) // e为一个阶段表的内容
					// st.push(e.name)  //ToDo
				}
				// console.log("list.vue###########item: ", JSON.stringify(item))
				// console.log("list.vue###########item.satges: ", JSON.stringify(item.satges))
				console.log("list.vue###########item.stages: ", JSON.stringify(item.stages))
				// console.log("##################################################################")
				this.project = {
					name: item.name,
					owner: item.owner_id,
					members: mem,
					state: item.state,
					stages: JSON.stringify(item.satges),
					cost: item.cost,
					total_cost: item.total_cost
				}
				this.stages = item.stages
				// console.log(item.name)
				// console.log(this.project.stages)
			},
			onqueryload(data) {
				if (!data.find(item => item.project_id === this.project_id)) {
					this.addCurrentAppid({
						appid: this.project_id,
						name: this.appName,
						description: "admin 管理后台"
					})
				} else {
					this.addAppidLoading = false
				}
				this.exportExcelData = data
			},
			changeSize(e) {
				this.pageSizeIndex = e.detail.value
			},
			addCurrentAppid(app) {
				// 使用 clientDB 提交当前 appid
				db.collection('opendb-app-list').add(app).then((res) => {
					this.loadData()
					setTimeout(() => {
						uni.showModal({
							content: `检测到数据库中无当前应用, 已自动添加应用: ${this.appName}`,
							showCancel: false
						})
					}, 500)
				}).catch((err) => {

				}).finally(() => {
					this.addAppidLoading = false
				})
			},
			getWhere() {
				const query = this.query.trim()
				if (!query) {
					return ''
				}
				const queryRe = new RegExp(query, 'i')
				return dbSearchFields.map(name => queryRe + '.test(' + name + ')').join(' || ')
			},
			search() {
				const newWhere = this.getWhere()
				this.where = newWhere
				this.loadData()
			},
			loadData(clear = true) {
				this.$refs.udb.loadData({
					clear
				})
			},
			onPageChanged(e) {
				this.selectedIndexs.length = 0
				this.$refs.table.clearSelection()
				this.$refs.udb.loadData({
					current: e.current
				})
			},
			navigateTo(url, clear) {
				// clear 表示刷新列表时是否清除页码，true 表示刷新并回到列表第 1 页，默认为 true
				uni.navigateTo({
					url,
					events: {
						refreshData: () => {
							this.loadData(clear)
						}
					}
				})
			},
			// 多选处理
			selectedItems() {
				let dataList = this.$refs.udb.dataList
				return this.selectedIndexs.map(i => dataList[i]._id)
			},
			// 批量删除
			delTable() {
				console.warn(
					"删除应用，只能删除应用表 opendb-app-list 中的应用数据记录，不能删除与应用关联的其他数据，例如：使用升级中心 uni-upgrade-center 等插件产生的数据（应用版本数据等）"
				)
				this.$refs.udb.remove(this.selectedItems(), {
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			// 多选
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			confirmDelete(id) {
				console.warn(
					"删除应用，只能删除应用表 opendb-app-list 中的应用数据记录，不能删除与应用关联的其他数据，例如：使用升级中心 uni-upgrade-center 等插件产生的数据（应用版本数据等）"
				)
				this.$refs.udb.remove(id, {
					confirmContent: '是否删除该应用',
					success: (res) => {
						this.$refs.table.clearSelection()
					}
				})
			},
			sortChange(e, name) {
				this.orderByFieldName = name;
				if (e.order) {
					this.orderby = name + ' ' + orderByMapping[e.order]
				} else {
					this.orderby = ''
				}
				this.$refs.table.clearSelection()
				this.$nextTick(() => {
					this.$refs.udb.loadData()
				})
			},
			filterChange(e, name) {
				this._filter[name] = {
					type: e.filterType,
					value: e.filter
				}
				let newWhere = filterToWhere(this._filter, db.command)
				if (Object.keys(newWhere).length) {
					this.where = newWhere
				} else {
					this.where = ''
				}
				this.$nextTick(() => {
					this.$refs.udb.loadData()
				})
			},
			publish(id) {
				uni.navigateTo({
					url: '/pages/system/app/uni-portal/uni-portal?id=' + id
				})
			}
		}
	}
</script>

<style>
	.button {
		display: table-cell;
		padding: 8px 10px;
		font-size: 14px;
		border-bottom: 1px $border-color solid;
		font-weight: 400;
		color: #606266;
		line-height: 23px;
		box-sizing: border-box;
	}
</style>