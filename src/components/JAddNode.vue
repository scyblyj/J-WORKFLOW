<template>
  <div class="add_node_btn_box">
    <div class="add_node_btn_line">
      <el-popover
        placement="right-start"
        width="150"
        trigger="click"
        ref="popover"
      >
        <div
          v-for="item in popMenu"
          :key="item.id"
          class="pop_menu_item"
          @click="addNode(item.id)"
        >
          <div class="pop_menu_item_icon">
            <i :class="item.icon"></i>
          </div>
          <div class="pop_menu_item_title">
            {{ item.title }}
          </div>
        </div>

        <div class="add_node_btn" slot="reference">+</div>
      </el-popover>
    </div>
  </div>
  <!-- <div class="add_node">
    <el-popover
      placement="right-start"
      width="150"
      trigger="click"
      ref="popover"
    >
      <div
        v-for="item in popMenu"
        :key="item.id"
        class="pop_menu_item"
        @click="addNode(item.id)"
      >
        <div class="pop_menu_item_icon">
          <i :class="item.icon"></i>
        </div>
        <div class="pop_menu_item_title">
          {{ item.title }}
        </div>
      </div>

      <div class="add_node_btn" slot="reference">+</div>
    </el-popover>
  </div> -->
</template>

<script>
export default {
  props: ["childNode"],
  data() {
    return {
      popMenu: [
        {
          id: 1,
          icon: "el-icon-edit-outline",
          title: "办理节点",
        },
        {
          id: 2,
          icon: "el-icon-document-checked",
          title: "审批节点",
        },
        {
          id: 3,
          icon: "el-icon-s-promotion",
          title: "抄送节点",
        },
        {
          id: 9,
          icon: "el-icon-s-operation",
          title: "条件分支",
        },
      ],
    };
  },
  components: {},
  methods: {
    addNode(nodeType) {
      this.$refs["popover"].showPopper = false;
      let newNode;
      switch (nodeType) {
        case 1:
          newNode = {
            type: 1,
            name: "办理节点",
          };
          break;
        case 2:
          newNode = {
            type: 2,
            name: "审批节点",
          };
          break;
        case 3:
          newNode = {
            type: 3,
            name: "抄送节点",
          };
          break;
        case 9:
          newNode = {
            type: 9,
            name: "路由",
            conditionNodes: [
              {
                name: "条件分支",
                type: 10,
                childNode: null,
              },
              {
                name: "条件分支",
                type: 10,
                childNode: null,
              },
            ],
          };
          break;
      }
      newNode.childNode = this.childNode;
      this.$emit("update:childNode", newNode);
    },
  },
};
</script>

<style scoped>
.add_node_btn_box {
  width: 240px;
  display: inline-flex;
  position: relative;
}

.add_node_btn_box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  z-index: -1;
  background-color: #cacaca;
}

.add_node_btn_line {
  user-select: none;
  padding: 38px 0 38px;
  display: flex;
  justify-content: center;
  flex: 1;
  position: relative;
}

.add_node_btn {
  position: absolute;
  top: 22px;
  left: 106px;
  width: 26px;
  height: 26px;
  border: 1px solid #d8d8d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  user-select: none;
  cursor: pointer;
  box-shadow: 3px 3px 5px #aaa;
  background-color: white;
  color: #3a5069;
}

.add_node_btn:hover {
  background-color: #3a5069;
  color: white;
}

.pop_menu_item {
  cursor: pointer;
  display: flex;
  user-select: none;
  align-items: center;
  line-height: 38px;
  padding: 0 10px;
}

.pop_menu_item:hover {
  background-color: #e8e8e8;
}

.pop_menu_item_icon {
  font-size: 20px;
  color: #aaa;
}
.pop_menu_item_title {
  padding-left: 10px;
  color: #888;
}

/* .add_node {
  position: relative;
  left: 108px;
  width: 2px;
  height: 80px;
  background-color: #ccc;
}

.add_node_btn {
  position: absolute;
  top: 22px;
  left: -13px;
  width: 26px;
  height: 26px;
  border: 1px solid #d8d8d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  user-select: none;
  cursor: pointer;
  box-shadow: 3px 3px 5px #aaa;
  background-color: white;
  color: #3a5069;
}

.add_node_btn:hover {
  background-color: #3a5069;
  color: white;
}

.pop_menu_item {
  cursor: pointer;
  display: flex;
  user-select: none;
  align-items: center;
  line-height: 38px;
  padding: 0 10px;
}

.pop_menu_item:hover {
  background-color: #e8e8e8;
}

.pop_menu_item_icon {
  font-size: 20px;
  color: #aaa;
}
.pop_menu_item_title {
  padding-left: 10px;
  color: #888;
} */
</style>
