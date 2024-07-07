<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view>
          <text>ProjectId</text>
          <text>{{data.project_id}}</text>
        </view>
        <view>
          <text>项目名称</text>
          <text>{{data.name}}</text>
        </view>
        <view>
          <text>项目描述</text>
          <textarea :disabled="true" :value="data.description"></textarea>
        </view>
        <view>
          <text>project_type</text>
          <text>{{data.project_type}}</text>
        </view>
        <view>
          <text>owner_id</text>
          <text>{{data.owner_id}}</text>
        </view>
        <view>
          <text>members</text>
          <text>{{data.members}}</text>
        </view>
        <view>
          <text>stages</text>
          <text>{{data.stages}}</text>
        </view>
        <view>
          <text>state</text>
          <text>{{data.state}}</text>
        </view>
        <view>
          <text>cost</text>
          <text>{{data.cost}}</text>
        </view>
        <view>
          <text>total_cost</text>
          <text>{{data.total_cost}}</text>
        </view>
        <view>
          <text>other_cost</text>
          <text>{{data.other_cost}}</text>
        </view>
        <view>
          <text>start_time</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.start_time"></uni-dateformat>
        </view>
        <view>
          <text>end_time</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.end_time"></uni-dateformat>
        </view>
        <view>
          <text>创建时间</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.create_date"></uni-dateformat>
        </view>
      </view>
    </unicloud-db>
    <view class="btns">
      <button type="primary" @click="handleUpdate">修改</button>
      <button type="warn" class="btn-delete" @click="handleDelete">删除</button>
    </view>
  </view>
</template>

<script>
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/admin-projects.js'
  const db = uniCloud.database()

  export default {
    data() {
      return {
        queryWhere: '',
        collectionList: [ db.collection('admin-projects').field('project_id,name,description,project_type,owner_id,members,stages,state,cost,total_cost,other_cost,start_time,end_time,create_date').getTemp(),db.collection('admin-stages').field('stage_id').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.collectionList = [ db.collection('admin-projects').where('_id=="' + this._id + '"').field('project_id,name,description,project_type,owner_id,members,stages,state,cost,total_cost,other_cost,start_time,end_time,create_date').getTemp(),db.collection('admin-stages').field('stage_id').getTemp() ]
      }
    },
    methods: {
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
