<!-- 基本节点: 开始/办理/审批/抄送 -->

<template>
  <div class="node">
    <div
      class="title"
      :style="{
        backgroundColor: ['#3a5069', '#3296fa', '#ff943e', '#c2c2cb'][
          nodeOpts.type
        ],
      }"
    >
      <div v-if="nodeOpts.type !== 0" class="not_root"></div>
      <div class="title_name">{{ nodeOpts.name }}</div>
      <div><i class="title_icon" :class="titleIconForType"></i></div>
    </div>

    <div class="content">
      <div class="duty">
        <div class="duty_name">未设置负责人</div>
        <div class="duty_icon"><i class="el-icon-arrow-right"></i></div>
      </div>
      <div v-if="nodeOpts.type !== 0" class="extra">
        <div class="status"></div>
        <div class="op">
          <el-tooltip
            v-if="nodeOpts.level > 2"
            effect="dark"
            content="向前移动"
            :open-delay="300"
            placement="bottom"
          >
            <i class="el-icon-caret-top op_icon" @click="moveUpNode()"></i>
          </el-tooltip>
          <el-tooltip
            v-if="nodeOpts.childNode"
            effect="dark"
            content="向后移动"
            :open-delay="300"
            placement="bottom"
          >
            <i class="el-icon-caret-bottom op_icon" @click="moveDownNode()"></i>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="复制节点"
            :open-delay="300"
            placement="bottom"
          >
            <i class="el-icon-copy-document op_icon" @click="dupNode()"></i>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="删除节点"
            :open-delay="300"
            placement="bottom"
          >
            <i class="el-icon-delete op_icon" @click="delNode()"></i>
          </el-tooltip>
        </div>
      </div>
    </div>

    <j-add-node-array :idx="idx" @addNode="onAddNode"></j-add-node-array>
  </div>
</template>

<script>
import JAddNodeArray from "./JAddNodeArray.vue";

export default {
  name: "JBaseNode",
  props: ["nodeOpts"],
  data() {
    return {};
  },
  components: {
    JAddNodeArray,
  },
  computed: {
    // 节点图标
    titleIconForType() {
      return function (type) {
        let res = {};
        switch (type) {
          case 0:
            res = { "el-icon-files": true };
            break;
          case 1:
            res = { "el-icon-edit-outline": true };
            break;
          case 2:
            res = { "el-icon-document-checked": true };
            break;
          case 3:
            res = { "el-icon-s-promotion": true };
            break;
        }
        return res;
      };
    },
  },
  methods: {
    // 添加节点
    onAddNode(idx, item) {
      this.nodeCfg.splice(idx, 0, item);
    },
    // 复制节点
    onDupNode(idx, item) {
      this.nodeCfg.splice(idx, 0, item);
    },
    // 删除节点
    onDelNode(idx) {
      this.nodeCfg.splice(idx, 1);
    },
    // 向前移动
    onMoveUpNode(idx) {
      this.swapArray(this.nodeCfg, idx, idx - 1);
    },
    // 向后移动
    onMoveDownNode(idx) {
      this.swapArray(this.nodeCfg, idx, idx + 1);
    },
    // 交换数组元素
    swapArray(arr, idx1, idx2) {
      arr[idx1] = arr.splice(idx2, 1, arr[idx1])[0];
    },
  },
};
</script>

<style scoped>
.data_div {
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
}
.node {
  user-select: none;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  width: 220px;
}
.not_root {
  position: absolute;
  left: 99px;
  top: -10px;
  width: 0;
  height: 0;
  border: 10px solid #ccc;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
.title {
  background-color: #3a5069;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px #aaa;
}

.title_name {
  font-size: 14px;
  color: white;
}
.title_icon {
  font-size: 22px;
  color: #ddd;
}

.content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px #aaa;
}
.duty {
  cursor: pointer;
  font-size: 13px;
  color: #666;
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  align-items: center;
}
.duty_icon {
  font-size: 22px;
  color: #ccc;
}

.op {
  text-align: right;
  padding: 5px 10px;
}

.op_icon {
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  /* margin-right: 10px; */
  color: #aaa;
}
.op_icon:hover {
  background-color: #d8d8d8;
  color: white;
}

.condition {
  position: relative;
  display: flex;
  width: 100%;
  height: 270px;
  margin: auto;
  border: 1px solid #ccc;
}

.condition_add_btn {
  cursor: pointer;
  user-select: none;
  position: absolute;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: white;
  box-shadow: 2px 2px 6px #aaa;
  color: #ff943e;
  padding: 5px 10px;
  font-size: 14px;
  left: calc(50% - 40px);
  top: -15px;
}

.condition_add_btn:hover {
  color: white;
  background-color: #ff943e;
}
</style>
