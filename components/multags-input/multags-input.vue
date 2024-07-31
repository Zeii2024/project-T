<template>
	<view>
		<view class="muli-tags" style="position: relative;">
			<!-- span标签将一部分内容独立出来，从而对独立出来的内容设置单独的样式 -->
			<span style="position: relative;" ref="tag" class="tag" v-for="(tag, index) in tags"
				:key="`${index}-${tag}`" :data-tag-index="index">
				<!-- <uni-tag type="primary" :text="tag" /> -->
				<!-- <view class="label"><text>{{tag}}</text></view> -->
				<view style="position: relative;" class="label">{{tag}}</view>
				<!-- style="position: absolute;bottom: 0; right: 0;padding: 10px;" -->
				<view style="position: relative;width:20px; height: 15px; padding-top: 20%;">
					<view class="close" style="left:1px;position:absolute;z-index: 1;margin-right: 1px;top:50%"></view>
					<button
						style="left:1px;top:15%;bottom:15%;position:absolute;z-index: 10;padding-right:10%;: 80%;margin-bottom: 20%;border: 0;opacity:0;margin-right: 1px;"
						@click="delTag(tag)">
					</button>
				</view>
			</span>
			<input ref="input" v-model="current" :placeholder="placeholder" type="text"
				class="uni-easyinput__content-input" :placeholderStyle="placeholderStyle" :style="inputStyle"
				placeholder-class="uni-easyinput__placeholder-class" @keyup.enter="add" @blur="add" @click.stop
				@keydown.up="selectItem($event, 'before')" @keydown.down="selectItem($event, 'after')"></input>
		</view>
		<!-- TODO: 给这块加上css -->
		<!-- @mouseleave  @mouseenter 是h5上的方法，在小程序上对应 touch -->
		<view @mouseleave="selectedItem = null">
			<view v-for="(item, i) in relativeTagOpts" :key="i" class="tip-item" @mouseenter="selectedItem = i"
				@click="add">
				<span class="">{{ item }}</span>
				<span v-if="isSelected(i)" class="enter">回车选中</span>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		FormItem
	} from "element-ui";
	import {
		nextTick
	} from "vue";

	function obj2strStyle(obj) {
		let style = '';
		for (let key in obj) {
			const val = obj[key];
			style += `${key}:${val};`;
		}
		return style;
	}

	export default {
		name: 'multags-input',
		props: {
			orignRelativeOpts: {
				type: Array,
				default: () => [],
			},
			value: {
				type: Array,
				require: true,
				default: () => [],
			},
			/* 直接修改父组件传过来的relativeOpts值就会报警告 [Vue warn]: Avoid mutating a prop directly 
			不要直接修改从父组件传过来的 props 数据，在data函数中重新定义一个变量，将props数据数据赋值在data变量上，后面修改data变量即可*/
			relativeOpts: {
				type: Array,
				default: () => ['110', '114', '119', '120'],
			},
			placeholderStyle: String,
			placeholder: {
				type: String,
				default: ' '
			}
		},
		data() {
			return {
				// focused: false,
				relativeOpts_a: this.relativeOpts,
				users: [],
				// relativeOpts_a,
				current: '',
				selectedItem: null,
				tags: [1, 2, 3, 4]
			};
		},
		watch: {
			value: {
				deep: true,
				immediate: true,
				handler() {
					this.tags = this.value.slice();
				}
			},
			// relativeOpts(val, valOld) {
			// 	//如果值发生了变化
			// 	// relativeOpts_a =
			// 	console.log("####relativeOpts##val##: ", JSON.stringify(val))
			// 	var newRelativeOpts = new Array();
			// 	for (var i = 0; i < val.length; i++) {
			// 		console.log(val[i].username)
			// 		newRelativeOpts[i] = val[i].username
			// 	}
			// 	this.relativeOpts_a = newRelativeOpts
			// 	console.log("####relativeOpts_a####: ", JSON.stringify(this.relativeOpts))
			// }
		},
		computed: {
			relativeTagOpts() {
				const curInputVal = this.current.trim();
				console.log("Current: ", this.current)

				if (!curInputVal) return [];
				//当候选列表大于4的时候说明不是默认列表， 而是从用户表中读取的数据； 对relativeOpts的值进行修改, 筛选为只剩用户名的列表
				if (this.users.length == 0) {
					for (var i = 0; i < this.relativeOpts_a.length; i++) {
						this.users[i] = this.relativeOpts_a[i].username
					}
					console.log("#### usernames: ####: ", JSON.stringify(this.users))
				}

				const res = this.users.filter(opt => opt.includes(curInputVal));
				return res;
			},

			// input右侧样式
			inputStyle() {
				const paddingRight =
					this.type === 'password' || this.clearable || this.prefixIcon ?
					'' :
					'10px';
				return obj2strStyle({
					'padding-right': paddingRight,
					'padding-left': this.prefixIcon ? '' : '10px'
				});
			}
		},

		methods: {
			// getCanditorList() {
			// 	//当候选列表大于4的时候说明不是默认列表， 而是从用户表中读取的数据； 对relativeOpts的值进行修改, 筛选为只剩用户名的列表

			// 	return newRelativeOpts
			// },
			delTag(tag) {
				console.log("DEL Tags");
				// 当文本框内没有值才删除
				if (this.current.length || !this.tags.length) return;
				this.tags = this.tags.filter(function(item) {
					return item != tag;
				})
				this.emitParent();
			},
			mouseenter() {
				console.log("mouseenter")
			},
			focus() {
				console.log("this.refs: ", this.$refs.input);
				this.$refs.input.focus = true;
			},

			add() {
				const v = this.relativeTagOpts[this.selectedItem] || this.current;
				this.selectedItem = null;
				this.current = '';
				if (!v) return;
				this.$nextTick(() => {
					this.tags.push(v);
				})

				this.emitParent();
				this.focus();

			},

			// 下面几个是下拉相关方法
			selectItem(e, method) {
				e.preventDefault();
				this.selectedItem = this.getSelectedIndex(method);
			},
			getSelectedIndex(method) {
				// 上下键高亮候选词
				const items = this.relativeTagOpts;
				const selectedItem = this.selectedItem;
				const lastItem = items.length - 1;
				if (items.length === 0) return null;
				if (selectedItem === null) return 0;
				if (method === 'before' && selectedItem === 0) return lastItem;
				else if (method === 'after' && selectedItem === lastItem) return 0;
				else return method === 'after' ? selectedItem + 1 : selectedItem - 1;
			},
			isSelected(index) {
				return this.selectedItem === index;
			},
			emitParent() {
				this.$emit('input', this.tags);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.uni-stat__select {
		display: flex;
		align-items: center;
		// padding: 15px;
		cursor: pointer;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}

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


	.close {
		display: inline-block;
		width: 12px;
		height: 2px;
		background: lightgray;
		transform: rotate(45deg);
	}

	.close::after {
		content: '';
		display: block;
		width: 12px;
		height: 2px;
		background: lightgray;
		transform: rotate(-90deg);
	}


	.uni-easyinput__placeholder-class {
		// color: #999;
		color: #999;
		font-size: 12px;
		// margin-left: 20rpx;
		// font-weight: 200;
	}

	.uni-easyinput__content-input {
		/* #ifndef APP-NVUE */
		width: auto;
		/* #endif */
		position: relative;
		overflow: hidden;
		flex: 1;
		line-height: 1;
		font-size: 14px;
		height: 35px;
		// min-height: 36px;

		/*ifdef H5*/
		& ::-ms-reveal {
			display: none;
		}

		& ::-ms-clear {
			display: none;
		}

		& ::-o-clear {
			display: none;
		}

		/*endif*/
	}

	.muli-tags {
		display: flex;
		flex-wrap: wrap;
		/* 多出来的元素换行显示，并且仍是按照标签1 标签2...的时间先后顺序显示 */
		align-content: flex-start;
		position: relative;
		min-height: 22px;
		// min-height: 32px;
		min-width: 50px;
		border: 1px solid #ccc;
	}

	.tag {
		display: flex;
		align-items: center;
		margin: 5px 3px;
		max-width: calc(100% - 16px);
		height: 22px;
		//标签背景颜色
		// background: #f8f9fa;
		// background: skyblue;
		border: 1px solid #dadfe3;
		// border: 1px solid red;
		border-radius: 4px;

		.label {
			font-style: normal;
			/* 字体 四条边的内边距区域（两个值对应上下和左右）*/
			padding: 0 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			// background-color: #666;
		}

		.delTagBtn {
			font-style: normal;
			// right: 1px; 
			padding: 0 0 0 0;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// white-space: nowrap;
			border-width: 0;
			// background: #f8f9fa;
			// background-color: gold;
			//按钮x的高度;x的大小
			height: 30px;
			// margin: 5 0 0 5;
			// text-align: match-parent;
			font-size: 15px;
			bottom: 10%;
			right: 5%;
			// align-items: flex-end;
			// margin: 1px 1px 1px 1px;
		}
	}

	.input {
		margin: 5px 8px;
		max-width: calc(100% - 16px);
		height: 32px;
		font-size: 16px;
		box-shadow: none;
		outline: none;
		background-color: transparent;
		border: none;
	}

	.tip2 {
		position: absolute;
		top: 102%;
		left: 0;
		right: 0;
		background: white;
		box-shadow: 0px 0px 10px rgba(29, 29, 46, 0.02), 0px 6px 10px rgba(29, 29, 46, 0.04);
		border-radius: 4px;
	}

	.tip {
		position: absolute;
		top: 102%;
		left: 0;
		right: 0;
		background: skyblue;
		// background: white;
		box-shadow: 0px 0px 10px rgba(29, 29, 46, 0.02), 0px 6px 10px rgba(29, 29, 46, 0.04);
		border-radius: 4px;

		.tip-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px;
			margin: 10px 0 10px 0;
			height: 34px;
			cursor: pointer;

			&.tip-selected {
				// background: #edf2ff;
				background: cadetblue;
			}
		}

		.enter {
			font-size: 12px;
			color: skyblue;
		}

		.tip-text {
			display: inline-flex;
			align-items: center;
			padding: 0 6px;
			height: 26px;
			background: #f8f9fa;
			border: 1px solid #dadfe3;
			border-radius: 4px;
		}
	}
</style>