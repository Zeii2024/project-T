<template>
	<view>
		<view class="muli-tags">
			<span ref="tag" class="tag" v-for="(tag, index) in tags" :key="`${index}-${tag}`" :data-tag-index="index">
				<view class="label"><text>{{tag}}</text></view>
				<button class="delTagBtn" @click="delTag(tag)">x</button>
			</span>
			<input ref="input" v-model="current" type="text" class="input" background-color="black" @keyup.enter="add"
				@blur="add" @click.stop @keydown.up="selectItem($event, 'before')"
				@keydown.down="selectItem($event, 'after')"></input>
		</view>
		<!-- TODO: 给这块加上css -->
		<!-- @mouseleave  @mouseenter 是h5上的方法，在小程序上对应 touch -->
		<view @mouseleave="selectedItem = null">
			<view v-for="(item, i) in relativeTagOpts" :key="i" class="tip-item" @mouseenter="selectedItem = i"
				@click="add">
				<span>{{ item }}</span>
				<span v-if="isSelected(i)" class="enter">回车选中</span>
			</view>
		</view>

		<!-- <div class="tip" @mouseout="selectedItem = null">
			<div v-for="(item, i) in relativeTagOpts" :key="i" :class="isSelected(i) ? 'tip-selected' : ''"
				@mouseover="selectedItem = i">

				<span class="tip-text">{{ item }}</span>
				<span v-if="isSelected(i)" class="enter">回车选中</span>
			</div>
		</div> -->
	</view>
</template>

<script>
	import {
		nextTick
	} from "vue";
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
			}
		},
		computed: {
			relativeTagOpts() {
				const curInputVal = this.current.trim();
				console.log("Current: ", this.current)
				if (!curInputVal) return [];
				console.log("relativeOpts: ", this.relativeOpts)
				const res = this.relativeOpts.filter(opt => opt.includes(curInputVal));
				console.log("res: ", res)
				return res;
			},
		},
		methods: {
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
	.muli-tags {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		position: relative;
		min-height: 32px;
		min-width: 50px;
		border: 1px solid #ccc;
	}

	.tag {
		display: flex;
		align-items: center;
		margin: 5px 8px;
		max-width: calc(100% - 16px);
		height: 32px;
		background: #f8f9fa;
		border: 1px solid #dadfe3;
		border-radius: 4px;

		.label {
			font-style: normal;
			padding: 0 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.delTagBtn {
			font-style: normal;
			padding: 0 6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			border-width: 0;
			background: #f8f9fa;
			height: 32px;
			text-align: center;
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
		background: white;
		box-shadow: 0px 0px 10px rgba(29, 29, 46, 0.02), 0px 6px 10px rgba(29, 29, 46, 0.04);
		border-radius: 4px;

		.tip-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 12px;
			height: 34px;
			cursor: pointer;

			&.tip-selected {
				background: #edf2ff;
			}
		}

		.enter {
			font-size: 12px;
			color: #c6c6cc;
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