// 父组件
<template>
	<tags-input v-model='tags' />
</template>
<script>
	import TagsInput from './mulTagsInputDemo02.vue'
	export default {
		components: {
			TagsInput
		},
		data() {
			return {
				tags: ['tag1', 'tag2', 'tag3']
			}
		}
	}
</script>