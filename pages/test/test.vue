<template>
	<!-- <view>
		<el-popover placement="right" width="400" trigger="click">
			<el-table :data="gridData">
				<el-table-column width="150" property="date" label="日期"></el-table-column>
				<el-table-column width="100" property="name" label="姓名"></el-table-column>
				<el-table-column width="300" property="address" label="地址"></el-table-column>
			</el-table>
			<el-button slot="reference">click 激活</el-button>
		</el-popover>
	</view> -->
	<!-- <view>
		<span v-for="(tag, index) in list" ref="tag" :key="`${index}-${tag}`" :data-tag-index="index" class="tag">
			<i class="label">tag:{{ tag }}</i>
		</span>
	</view> -->
	<view>
		<span ref="tag" class="tag" v-for="(tag, index) in tags" :key="`${index}-${tag}`" :data-tag-index="index">
			<i class="label">{{tag}}</i>
		</span>
	</view>

</template>

<script>
	export default {
		name: 'TagsInput',
		props: {
			value: {
				type: Array,
				require: true,
				default: () => [],
			},
			relativeOpts: {
				type: Array,
				default: () => ['110', '114', '119', '120'],
			},
		},
		data() {
			return {
				current: '',
				selectedItem: null,
				list: [{
						id: 1,
						name: "zs1"
					},
					{
						id: 2,
						name: "zs2"
					},
					{
						id: 3,
						name: "zs3"
					},
					{
						id: 4,
						name: "zs4"
					},
				],
				tags: [11, 21, 31, 41],
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			};
		},
		watch: {
			value: {
				deep: true,
				immediate: true,
				handler() {
					this.tags = this.value.slice();
				}
			}
		}
	};
</script>

<style>

</style>