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
		<!-- <view>
			<uni-tag text="标签" type="primary" />
			<button class="dialog">X</button>
		</view>
		<span ref="tag" class="tag" v-for="(tag, index) in tags" :key="`${index}-${tag}`" :data-tag-index="index">
			span标签
			<i class="label">{{tag}}</i>
		</span>
		<view style="background-color: aquamarine;">
			<view class="label"><text>tag</text></view>
			<button @click="delTag(tag)">x</button>
		</view> -->
		<!-- <div style="background-color:aquamarine;">
			<button style="background-color: blue;left: 10px; right: 300px; top: 100px;">x</button>
		</div>
		<div style="background-color: rebeccapurple;position: relative;">
			<button style="background-color: sandybrown; position: absolute;left:50%;right: 40%;top: 80%;">xte</button>
		</div> -->

		<view style="background-color: grey;">
			<div class="container">
				<div class="box1"></div>
				<div class="box2"></div>
			</div>
		</view>

		<view class="muli-tags" style="position: relative;">
			<!-- span标签将一部分内容独立出来，从而对独立出来的内容设置单独的样式 -->
			<span style="position: relative;z-index: 0;order: 1;" class="tag">

				<view style="position: relative; z-index: 0;" class="label">tag</view>
				<button style="position: relative; z-index: 0;" class="delTagBtn" @click="delTag(tag)">x</button>
			</span>
			<!-- <input ref="input" v-model="current" :placeholder="placeholder" type="text"
				class="uni-easyinput__content-input" :placeholderStyle="placeholderStyle" :style="inputStyle"
				placeholder-class="uni-easyinput__placeholder-class" @keyup.enter="add" @blur="add" @click.stop
				@keydown.up="selectItem($event, 'before')" @keydown.down="selectItem($event, 'after')"></input> -->
		</view>

		<view class="parent">
			<text class="child1">test嵌套1</text>
			<text class="child2">test嵌套2</text>

		</view>


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

<style style lang="scss" scoped>
	.parent {
		position: relative;
		background-color: greenyellow;
		border: 8px solid black;
		margin: 70px 5px;


		.child1 {
			width: 10px;
			height: 10px;
			background-color: gray;
			border: 5px solid rebeccapurple;
			// margin: 30px 5px;
		}
	}

	.child2 {
		width: 10px;
		height: 10px;
		background-color: gray;
		border: 5px solid rebeccapurple;
		margin: 50px 22px;
		position: relative;
		z-index: -1;
	}

	.container {
		position: relative;
		width: 200px;
		height: 200px;
		background-color: white;
	}

	.box1 {
		position: relative;
		z-index: -1;
		background-color: red;
		width: 20px;
		height: 20px;
	}

	.box2 {
		position: relative;
		z-index: 2;
		background-color: blue;
		width: 20px;
		height: 20px;
		top: -15px;
		left: 15px;
	}

	/* 一个标签parent嵌套另一个标签child,如果子标签的大小位置调整超出了父标签，那么就会失效 */
	.muli-tags {
		display: flex;
		flex-wrap: wrap;
		/* 多出来的元素换行显示，并且仍是按照标签1 标签2...的时间先后顺序显示 */
		align-content: flex-start;
		position: relative;
		min-height: 22px;

		min-width: 50px;
		border: 10px solid red;
		background-color: blanchedalmond;
	}

	.tag {
		display: flex;
		align-items: center;
		margin: 15px 28px;
		max-width: calc(100% - 16px);
		height: 22px;
		background: skyblue;
		border: 10px solid red;
		border-radius: 4px;
		background-color: greenyellow;

		.tag1 {
			border: 5px solid blue;
		}
	}

	.label {
		font-style: normal;
		padding: 0 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 3px solid yellow;
		background-color: grey;
	}

	.delTagBtn {
		font-style: normal;
		padding: 10 20 30 40;
		border-width: 0;
		background-color: gold;
		// height: 30px;
		// font-size: 15px;
		border: 1px solid black;
		top: 90%;
	}

	/* 	.delTagBtn {
		font-style: normal;
		padding: 1% 0 0 0;
		border-width: 0;
		
		background-color: gold;
		height: 30px;
		font-size: 15px;
		border: 1px solid black;
	} */

	/* 
	.label {
		
		font-style: normal;
		padding: 0 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} */

	.dialog {
		position: relative;
		/* position: absolute; */
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
</style>