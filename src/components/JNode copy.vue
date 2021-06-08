<template>
  <div>
    <div class="node_wrap" v-if="nodeOpts.type !== 9">
      <div class="node_condition" v-if="nodeOpts.type === 10">
        <div class="node_condition_content">123</div>
        <div class="node_condition_tips">请设置条件</div>
      </div>
      <div class="node" v-if="nodeOpts.type !== 10">
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
              <!-- <el-tooltip
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
          </el-tooltip> -->
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
      </div>

      <j-add-node :childNode.sync="nodeOpts.childNode"></j-add-node>

      <j-node
        v-if="nodeOpts.childNode"
        :nodeOpts.sync="nodeOpts.childNode"
      ></j-node>
    </div>
    <div class="branch-wrap" v-if="nodeOpts.type === 9">123</div>
  </div>
</template>

<script>
import JAddNode from "./JAddNode.vue";

export default {
  name: "JNode",
  props: ["nodeOpts", "mynodeObjs"],
  data() {
    return {};
  },
  components: {
    JAddNode,
  },
  mounted() {
    console.log(this.mynodeObjs);
  },
  computed: {
    titleIconForType() {
      let res = {};
      switch (this.nodeOpts.type) {
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
        case 4:
          res = { "": true };
          break;
      }
      return res;
    },
  },
  methods: {
    dupNode() {
      let newNode = { ...this.nodeOpts };
      let nodeOpts = { ...this.nodeOpts };
      // this.addLevel(newNode);
      nodeOpts.childNode = newNode;
      this.$emit("update:nodeOpts", nodeOpts);
    },
    delNode() {
      // this.decLevel(this.nodeOpts.childNode);
      this.$emit("update:nodeOpts", this.nodeOpts.childNode);
    },

    // 向前移动
    // moveUpNode() {
    //   let arr = [];
    //   // nodeObj是全局对象
    //   console.log(this.mynodeObjs);
    //   this.objToArr(this.nodeObjs, arr);

    //   let currentNode, parentNode, childNode;

    //   arr.forEach((item) => {
    //     if (this.nodeOpts.id == item.id) {
    //       currentNode = item;
    //     } //自己
    //     if (this.nodeOpts.parentNode == item.id) {
    //       parentNode = item;
    //     } //父亲

    //     if (this.nodeOpts.id == item.parentNode) {
    //       childNode = item;
    //     } //儿子
    //   });

    //   let currentNodeId = currentNode.id;
    //   let parentNodeId = parentNode.id;
    //   let grandParentNodeId = parentNode.parentNode;

    //   currentNode.parentNode = grandParentNodeId;
    //   parentNode.parentNode = currentNodeId;
    //   childNode.parentNode = parentNodeId;

    //   let resObj = this.arrToObj(arr);
    //   console.log(resObj);

    //   // this.$emit("update:nodeObj", resObj);
    //   console.log(resObj);
    // },
    // moveDownNode() {
    //   let newNodeOpts = { ...this.nodeOpts.childNode }; //3

    //   let newNodeOptsChild = newNodeOpts.childNode //4如果有
    //     ? { ...newNodeOpts.childNode }
    //     : null;

    //   let movedNode = { ...this.nodeOpts }; //2

    //   movedNode.childNode = newNodeOptsChild; //4放到2后    newNodeOptsChild.level+1
    //   if (newNodeOptsChild) {
    //     newNodeOptsChild.level -= 1;
    //   }

    //   this.addLevel(movedNode);
    //   newNodeOpts.childNode = movedNode; //2放到3后  movedNode.level+1  newNodeOpts-1

    //   newNodeOpts.level -= 1;
    //   this.$emit("update:nodeOpts", newNodeOpts); //3放到2的位置
    // },

    // objToArr(obj, arr) {
    //   let childNode;

    //   if (obj !== null) {
    //     //   console.log(obj);
    //     childNode = obj.childNode ? { ...obj.childNode } : null;
    //     delete obj.childNode;
    //     arr.push(obj);

    //     this.objToArr(childNode, arr);
    //   }
    // },

    // arrToObj(arr, id) {
    //   let res = null;
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].parentNode == id) {
    //       res = arr[i];
    //       res.childNode = this.arrToObj(arr, arr[i].id);
    //     }
    //   }
    //   return res;
    // },

    // addLevel(obj) {
    //   obj.level++;
    //   if (obj.childNode) {
    //     this.addLevel(obj.childNode);
    //   }
    // },

    // decLevel(obj) {
    //   obj.level--;
    //   if (obj.childNode) {
    //     this.decLevel(obj.childNode);
    //   }
    // },
  },
};
</script>

<style scoped>
.node_wrap {
  position: relative;
  box-sizing: border-box;
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

.node_condition {
  background-color: white;
  color: gray;
}
</style>
