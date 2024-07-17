<template>
	<div class="muli-tags" @click='focus'>
		<button class='btn' v-for='(tag, index) in tags' :key='index'>
			{{tag}}
		</button>
		<!-- <input type="text" ref='input' v-model='current'> -->
		// @keydown.188 188代表是是分号键的keyCode
		<input type="text" ref='input' @keyup.enter="add" @keydown.delete="del" @keydown.188='split' v-model='current'>
	</div>
</template>

<script>
	export default {
		name: 'TagsInput',
		methods: {
			focus() {
				this.$refs.input.focus()
			},
			// 按下分号键的时候，需要阻止默认事件，否则会出现分号
			split(e) {
				e.preventDefault()
				this.add(e)
			},
			add(e) {
				const val = e.target.value
				if (!val) return
				// 如果已经存在相同tag，不再添加
				if (this.tags.indexOf(val) > -1) return
				// 把输入值添加到tag，并清空文本框
				this.tags.push(val)
				this.current = ''
			},
			del(e) {
				// 当文本框内没有值，再按回退键，则删除最后一个tag
				if (!e.target.value.length) {
					this.tags.pop()
				}
			},
		},

		data() {
			return {
				tags: [11, 12, 13],
				current: ''
			}
		}
	}
</script>

<style lang='less'>
	.muli-tags {
		padding: 5px 10px;
		display: block;
		border: 1px solid #ccc;

		input {
			background: transparent;
		}
	}

	.btn {
		margin: 0 5px 3px 0;
		padding: 4px 5px;
		background: #fff;
		border: 1px solid #eee;
		box-shadow: 0 0 4px;
	}
</style>