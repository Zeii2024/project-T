<template>
	<view>
		<uni-collapse>
			<!-- <uni-collapse-item title="默认开启" :open="true">
				<text>折叠内容</text>
			</uni-collapse-item>
			<uni-collapse-item title="禁用状态" disabled>
				<text>折叠内容</text>
			</uni-collapse-item> -->

			<uni-collapse-item title="折叠内容">
				<text>折叠内容</text>
			</uni-collapse-item>

			<uni-collapse-item title="折叠内容">
				<uni-table ref="table" :loading="loading" type="selection">
					<uni-tr v-show="true" style="display: table-row;">
						<uni-td align="center">工作项id</uni-td>
						<uni-td align="center">工作名称</uni-td>
						<uni-td align="left">所属用户id</uni-td>
						<uni-td align="center">对应阶段id</uni-td>
						<uni-td align="center">对应的项目id</uni-td>
						<uni-td align="center">当前工时成本</uni-td>
						<uni-td align="center" :width="stateThWidth">状态</uni-td>
						<uni-th align="center" :width="buttonThWidth">操作</uni-th>
					</uni-tr>
				</uni-table>
			</uni-collapse-item>

		</uni-collapse>

		<uni-table ref="table" :loading="loading" type="expand">
			<uni-tr>
				<uni-th align="center" filter-type="search">StageId</uni-th>
				<uni-th align="center" filter-type="search">阶段名称</uni-th>
				<uni-th align="center" filter-type="search">阶段状态</uni-th>
				<uni-th align="center" filter-type="search">负责人</uni-th>
				<uni-th align="center" filter-type="search">阶段成员</uni-th>
				<uni-th align="center" filter-type="timestamp">创建时间</uni-th>
				<uni-th align="center" :width="buttonThWidth">操作</uni-th>
				<uni-th align="center" :width="50">详情</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in stages" :key="index" style="display: table-row;">
				<uni-td align="center">{{item.stage_id}}</uni-td>
				<uni-td align="center">{{item.name}}</uni-td>
				<uni-td align="left">{{item.state}}</uni-td>
				<uni-td align="center">{{item.owner}}</uni-td>
				<uni-td align="center">{{item.members}}</uni-td>
				<uni-td align="center">{{item.creat_time}}</uni-td>
				<uni-td align="center">
					<view class="uni-group">
						<button @click="editRow(item)" class="uni-button" size="mini"
							type="primary">{{$t('common.button.edit')}}</button>
						<button @click="confirmDelete(item._id)" class="uni-button" size="mini"
							type="warn">{{$t('common.button.delete')}}</button>
					</view>
				</uni-td>
				<uni-td>
					<uni-collapse>
						<uni-collapse-item title="折叠内容">
							<uni-table>
								<uni-tr v-show="true" style="display: table-row;">
									<uni-td align="center">工作项id</uni-td>
									<uni-td align="center">工作名称</uni-td>
									<uni-td align="left">所属用户id</uni-td>
									<uni-td align="center">对应阶段id</uni-td>
									<uni-td align="center">对应的项目id</uni-td>
									<uni-td align="center">当前工时成本</uni-td>
								</uni-tr>
							</uni-table>
						</uni-collapse-item>
					</uni-collapse>
				</uni-td>
			</uni-tr>

		</uni-table>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				stages: [{
					"_id": "66b5dc9f2eea65451ccd01c1",
					"stage_id": "1001",
					"project_id": "1001",
					"name": "10011001",
					"state": 1001,
					"owner": "wabbf",
					"members": "1001",
					"sort": 1001,
					"permision": [],
					"start_time": null,
					"end_time": null,
					"create_time": null
				}, {
					"_id": "66b5dde3f08210682c7dd904",
					"stage_id": "1002",
					"project_id": "1002",
					"name": "1002",
					"state": 1002,
					"owner": "qqqqq",
					"members": "1002",
					"sort": 1002,
					"permision": [],
					"start_time": null,
					"end_time": null,
					"create_time": null
				}, {
					"_id": "66b5e2ce466d415ce3d44bc1",
					"stage_id": "1003",
					"project_id": "1003",
					"name": "1003",
					"state": 1003,
					"owner": "asdsa",
					"members": "1003",
					"sort": 1003,
					"permision": [],
					"start_time": null,
					"end_time": null,
					"create_time": null
				}, {
					"_id": "66b5e2b46e5d2d2a67cfc079",
					"stage_id": "1004",
					"project_id": "1004",
					"name": "1004",
					"state": 1004,
					"owner": "q2wqe",
					"members": "1004",
					"sort": null,
					"permision": [],
					"start_time": null,
					"end_time": null,
					"create_time": null
				}]

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>