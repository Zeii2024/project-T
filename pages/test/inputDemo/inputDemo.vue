<template>
	<view>
		<el-form ref="form" :model="form">
			<el-form-item label="知识点">
				<el-select v-model="form.knowledge" clearable multiple filterable allow-create default-first-option
					placeholder="输入知识点内容，用回车添加">
					<el-option v-for="item in knowledge" :key="item.value" :label="item.label"
						:value="item.label"></el-option>
				</el-select>
			</el-form-item>
		</el-form>

		<button class="uni-button" type="primary" size="mini" @click="navigateTo('popDiaglog')">
			{{$t('common.button.add')}} </button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				knowledge: [{
						label: "知识点1"
					},
					{
						label: "知识点2"
					},
					{
						label: "知识点3"
					}
				],
				form: {}
			}
		},
		methods: {
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
			}
		}
	}
</script>