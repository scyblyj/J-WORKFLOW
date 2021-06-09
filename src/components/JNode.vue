<template>
  <div>
    <!-- 普通节点 -->
    <div class="node_wrap" v-if="nodeOpts.type !== 9">
      <div class="node_wrap_box" @click="showDrawer">
        <div
          class="title"
          v-if="nodeOpts.type !== 10"
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

        <div class="title" v-if="nodeOpts.type === 10">
          <span style="color: green; font-size: 14px">{{ nodeOpts.name }}</span>
        </div>

        <div class="content" v-if="nodeOpts.type !== 10">
          <div class="duty">
            <div class="duty_name">未设置负责人</div>
            <div class="duty_icon"><i class="el-icon-arrow-right"></i></div>
          </div>
          <div v-if="nodeOpts.type !== 0" class="extra">
            <div class="status"></div>
            <div class="op">
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
    </div>

    <!-- 条件节点区域 -->
    <div class="branch_wrap" v-if="nodeOpts.type === 9">
      <div class="branch_box_wrap">
        <div class="branch_box">
          <button class="add_branch" @click="addBranch(nodeOpts)">
            添加条件
          </button>
          <!-- 条件节点列 -->
          <div
            class="col_box"
            v-for="(item, idx) in nodeOpts.conditionNodes"
            :key="idx"
          >
            <!-- 覆盖超区域线条 -->
            <div class="top_left_cover_line" v-if="idx === 0"></div>
            <div class="bottom_left_cover_line" v-if="idx === 0"></div>
            <div
              class="top_right_cover_line"
              v-if="idx === nodeOpts.conditionNodes.length - 1"
            ></div>
            <div
              class="bottom_right_cover_line"
              v-if="idx === nodeOpts.conditionNodes.length - 1"
            ></div>

            <!-- 条件分支 -->
            <div class="condition_node">
              <div class="condition_node_box">
                <div class="condition_card">
                  <div class="condition_content">所有数据可以进入该分支</div>
                  <div class="condition_op">
                    <el-tooltip
                      effect="dark"
                      content="删除节点"
                      :open-delay="300"
                      placement="bottom"
                    >
                      <i
                        class="el-icon-delete op_icon"
                        @click="delConditionNode(idx)"
                      ></i>
                    </el-tooltip>
                  </div>
                </div>
                <j-add-node :childNode.sync="item.childNode"></j-add-node>
              </div>
            </div>

            <j-node
              v-if="item.childNode"
              :nodeOpts.sync="item.childNode"
            ></j-node>
          </div>
        </div>
        <j-add-node :childNode.sync="nodeOpts.childNode"></j-add-node>
      </div>
    </div>

    <!-- 递归调用 -->
    <j-node
      v-if="nodeOpts.childNode"
      :nodeOpts.sync="nodeOpts.childNode"
    ></j-node>

    <!-- 流程开始配置页 -->
    <el-drawer
      :with-header="false"
      :visible.sync="beginNodeDrawer"
      direction="rtl"
    >
      <div class="drawer_header drawer_header_begin">流程开始</div>
      <div class="drawer_content">
        <!-- 发起人 -->
        <div class="drawer_content_creator">
          <div class="drawer_content_title">设置发起人</div>
          <el-input
            style="margin-top: 10px"
            type="textarea"
            :autosize="true"
            :readonly="true"
            :value="creatorForString"
            @focus="creatorSelector = true"
          >
          </el-input>
          <el-dialog
            title="设置发起人"
            width="600px"
            :append-to-body="true"
            :visible.sync="creatorSelector"
          >
            <div class="dialog_creator_content">
              <div class="dialog_creator_left">
                <div>
                  <el-input
                    size="small"
                    style="margin-top: 10px"
                  >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div>
                <div style="height: calc(100% - 70px)">
                  <el-tabs
                    :stretch="true"
                    type="border-card"
                    style="margin-top: 6px; height: 100%; overflow-y: auto"
                  >
                    <el-tab-pane label="按组织架构选择">
                      <el-tree
                        ref="tree"
                        @check="checkCreator"
                        :data="organizeList"
                        show-checkbox
                        :props="treeProps"
                      ></el-tree>
                    </el-tab-pane>
                    <el-tab-pane label="按角色选择"> </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
              <div class="dialog_creator_right">
                <div>具备发起此流程的人员</div>
                <el-divider></el-divider>
                <div
                  style="
                    margin-top: 10px;
                    height: calc(100% - 70px);
                    overflow-y: auto;
                  "
                >
                  <div
                    class="creator_selected_row"
                    v-for="(item, idx) in treeCheckedList"
                    :key="idx"
                  >
                    <div>
                      {{ item.name }}
                    </div>
                    <!-- <div class="creator_selected_del">
                      <el-tooltip
                        effect="dark"
                        content="删除"
                        :open-delay="300"
                        placement="bottom"
                      >
                        <i
                          class="el-icon-circle-close"
                          @click.stop="delSelectedItem(idx)"
                        ></i>
                      </el-tooltip>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <el-button type="primary" @click.stop="creatorSelectOk"
                >确定</el-button
              >
              <el-button @click="creatorSelector = false">取消</el-button>
            </div>
          </el-dialog>
        </div>
        <!-- <el-divider></el-divider> -->
        <!-- 字段权限 -->
        <div class="drawer_content_field_right">
          <div class="drawer_content_title">设置表单操作权限</div>
          <div class="field_right_grid">
            <div class="field_right_grid_header">
              <div style="flex: 2; text-align: left">表单字段</div>
              <el-radio-group
                @change="radioGroupChange"
                style="flex: 3; display: flex; justify-content: space-between"
                v-model="allRight"
              >
                <el-radio label="editAll">可编辑</el-radio>
                <el-radio label="readAll">只读</el-radio>
                <el-radio label="hideAll">隐藏</el-radio>
              </el-radio-group>
            </div>
            <div
              v-for="(field, idx) in fieldsRight"
              :key="idx"
              class="field_right_grid_data"
            >
              <div class="field_label">{{ field.fieldLabel }}</div>

              <el-radio-group
                @change="radioGroupChange"
                style="flex: 3; display: flex; justify-content: space-between"
                v-model="field.fieldRight"
              >
                <el-radio label="edit">可编辑</el-radio>
                <el-radio label="read">只读</el-radio>
                <el-radio label="hide">隐藏</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
      <!-- 保存取消操作区 -->
      <div class="drawer_op">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-drawer>

    <!-- 办理节点配置页 -->
    <el-drawer
      :with-header="false"
      :visible.sync="processNodeDrawer"
      direction="rtl"
    >
      <div class="drawer_header drawer_header_process">办理节点</div>
    </el-drawer>
    <!-- 审批节点配置页 -->
    <el-drawer
      :with-header="false"
      :visible.sync="approvalNodeDrawer"
      direction="rtl"
    >
    </el-drawer>
    <!-- 抄送节点配置页 -->
    <el-drawer
      :with-header="false"
      :visible.sync="sendNodeDrawer"
      direction="rtl"
    >
    </el-drawer>
  </div>
</template>

<script>
import JAddNode from "./JAddNode.vue";

export default {
  name: "JNode",
  props: ["nodeOpts"],
  data() {
    return {
      beginNodeDrawer: false, // 流程开始配置页显示开关
      processNodeDrawer: false, // 办理节点配置页显示开关
      approvalNodeDrawer: false, // 审批节点配置页显示开关
      sendNodeDrawer: false, // 抄送节点配置页显示开关
      creator: [], // 流程发起人
      creatorSelector: false, // 选择发起人对话框开关
      organizeList: [
        {
          id: 1,
          name: "开发部",
          subordinate: [
            {
              id: 101,
              name: "前端组",
              subordinate: [{ id: 1011, name: "张三" }],
            },
            {
              id: 102,
              name: "后端组",
              subordinate: [
                { id: 1021, name: "李四" },
                { id: 1022, name: "王五" },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "后勤部",
          subordinate: [
            { id: 201, name: "点点" },
            { id: 202, name: "叉叉" },
            {
              id: 203,
              name: "商务组",
              subordinate: [
                {
                  id: 2031,
                  name: "哦哦",
                  subordinate: [
                    { id: 20311, name: "biubiu" },
                    { id: 20312, name: "wowo" },
                  ],
                },
                { id: 2032, name: "嗯嗯" },
              ],
            },
          ],
        },
      ], // 组织架构列表
      treeProps: {
        label: "name",
        children: "subordinate",
      }, // 树形组件配置
      treeCheckedList: [], // 已选中的发起人列表
      allRight: "", // 所有权限
      fieldsRight: [
        {
          fieldLabel: "姓名",
          fieldRight: "edit",
        },
        {
          fieldLabel: "性别",
          fieldRight: "read",
        },
        {
          fieldLabel: "毕业院校",
          fieldRight: "hide",
        },
      ],
    };
  },
  components: {
    JAddNode,
    // JCheckbox,
  },
  mounted() {},
  computed: {
    // 卡片标题图标
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
      }
      return res;
    },
    // 将发起人（数组）转换成字符串
    creatorForString() {
      if (this.creator.length > 0) {
        let res = [];
        this.creator.forEach((item) => {
          res.push(item.name);
        });
        return res.join(",");
      } else {
        return "点击选择可以发起此流程的人员";
      }
    },
  },
  methods: {
    // 在el-tree中选中或取消选中项目
    checkCreator() {
      let selectedItem = this.$refs.tree.getCheckedNodes();
      this.treeCheckedList = this.getItemFromTree(selectedItem);
    },

    // 方法：获取实际选中的人员
    getItemFromTree(arr) {
      let res = [];
      arr.forEach((item) => {
        if (item.subordinate) {
          this.getItemFromTree(item.subordinate);
        } else {
          res.push(item);
        }
      });
      return res;
    },

    // 从列表中删除选中的发起人
    delSelectedItem(idx) {
      this.treeCheckedList.splice(idx, 1);
    },
    // 表单权限切换事件
    radioGroupChange(e) {
      console.log(e);
      switch (e) {
        case "editAll":
          this.fieldsRight.forEach((item) => {
            item.fieldRight = "edit";
          });
          break;
        case "readAll":
          this.fieldsRight.forEach((item) => {
            item.fieldRight = "read";
          });
          break;
        case "hideAll":
          this.fieldsRight.forEach((item) => {
            item.fieldRight = "hide";
          });
          break;
        default:
          this.allRight = "";
          break;
      }
    },
    // 确定选择发起人
    creatorSelectOk() {
      this.creator = [...this.treeCheckedList];
      this.creatorSelector = false;
    },
    // 按照组织机构切换全选开关
    allSwitchByDep(e) {
      if (e) {
        this.checkList = [...this.depList];
      } else {
        this.checkList = [];
      }
    },
    // 添加条件分支列
    addBranch(nodeOpts) {
      const conditionNode = {
        name: "条件节点",
        type: 10,
        childNode: null,
      };
      nodeOpts.conditionNodes.push(conditionNode);
    },
    // 复制节点
    dupNode() {
      let newNode = { ...this.nodeOpts };
      let nodeOpts = { ...this.nodeOpts };
      // this.addLevel(newNode);
      nodeOpts.childNode = newNode;
      this.$emit("update:nodeOpts", nodeOpts);
    },
    // 删除节点
    delNode() {
      // this.decLevel(this.nodeOpts.childNode);
      this.$emit("update:nodeOpts", this.nodeOpts.childNode);
    },
    // 删除条件分支列
    delConditionNode(idx) {
      // 先删除当前的条件分支列
      this.nodeOpts.conditionNodes.splice(idx, 1);
      this.$emit("update:nodeOpts", this.nodeOpts);

      // 如果仅剩下一个条件分支列，则把它与普通节点进行合并
      // 合并方法为先把分支后续的childNode附加到当前条件分支列的链尾，然后用当前分支的childNode更新this.nodeOpts
      if (this.nodeOpts.conditionNodes.length === 1) {
        if (this.nodeOpts.childNode) {
          if (this.nodeOpts.conditionNodes[0].childNode) {
            this.addChildNode(
              this.nodeOpts.conditionNodes[0].childNode,
              this.nodeOpts.childNode
            );
          } else {
            this.nodeOpts.conditionNodes[0].childNode = this.nodeOpts.childNode;
          }
        }
        this.$emit(
          "update:nodeOpts",
          this.nodeOpts.conditionNodes[0].childNode
        );
      }
    },
    // 用于在链尾添加childNode
    addChildNode(node, childNode) {
      if (!node.childNode) {
        node.childNode = childNode;
      } else {
        this.addChildNode(node.childNode, childNode);
      }
    },
    // 打开配置页
    showDrawer() {
      switch (this.nodeOpts.type) {
        case 0:
          this.beginNodeDrawer = true;
          break;
        case 1:
          this.processNodeDrawer = true;
          break;
        case 2:
          this.approvalNodeDrawer = true;
          break;
        case 3:
          this.sendNodeDrawer = true;
          break;
      }
    },
  },
};
</script>

<style scoped>
.node_wrap,
.branch_wrap {
  display: inline-flex;
  box-sizing: border-box;
  width: 100%;
}

.node_wrap {
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 50px;
}

.node_wrap_box {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 220px;
  min-height: 72px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px #aaa;
}

.not_root {
  position: absolute;
  left: 102px;
  top: -8px;
  width: 0;
  height: 0;
  border: 8px solid #ccc;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}

.title {
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
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
  color: #aaa;
}

.op_icon:hover {
  background-color: #d8d8d8;
  color: white;
}

.branch_box_wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  min-height: 270px;
  width: 100%;
  flex-shrink: 0;
}

.branch_box {
  display: flex;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid #ccc;
  border-top: 2px solid #ccc;
  position: relative;
  margin-top: 15px;
}

.add_branch {
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: #ff943e;
  background-color: #fff;
  box-shadow: 2px 2px 6px #aaa;
  position: absolute;
  top: -16px;
  left: calc(50% - 39px);
  z-index: 2;
  /* transition:ease-out 0.2s;  */
}

.add_branch:hover {
  /* transform: scale(1.1);
  font-weight: 600; */
  color: white;
  background-color: #ff943e;
}

.col_box {
  position: relative;
}

.col_box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.top_left_cover_line,
.bottom_left_cover_line {
  left: -1px;
}

.top_right_cover_line,
.bottom_right_cover_line {
  right: -1px;
}

.top_left_cover_line,
.top_right_cover_line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: white;
  top: -2px;
}

.bottom_left_cover_line,
.bottom_right_cover_line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: white;
  bottom: -2px;
}

.condition_node {
  min-height: 220px;
}

.condition_node,
.condition_node_box {
  display: inline-flex;
  flex-direction: column;
}

.condition_node_box {
  padding: 30px 50px 0;
  justify-content: center;
  align-items: center;
  position: relative;
}

.condition_node_box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.condition_card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 220px;
  min-height: 80px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 6px #aaa;
  cursor: pointer;
}

/* .condition_card:after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.1s cubic-bezier(0.645, 0.45, 0.355, 1);
} */

.condition_content {
  flex: 1;
  padding: 20px 10px;
  font-size: 14px;
  text-align: left;
  color: #888;
}

.condition_op {
  line-height: 30px;
  text-align: right;
  padding: 0 10px;
  font-size: 12px;
  /* color: #ff943e; */
  border-top: 1px solid #cacaca;
}

.drawer_header {
  padding-left: 10px;
  text-align: left;
  line-height: 50px;
  font-size: 18px;
  color: white;
}

.drawer_header_begin {
  background-color: #3a5069;
}
.drawer_header_process {
  background-color: #3296fa;
}
.drawer_header_approval {
  background-color: #ff943e;
}
.drawer_header_send {
  background-color: #c2c2cb;
}
.drawer_content {
  box-sizing: border-box;
  height: calc(100vh - 100px);
  border-bottom: 1px solid #ededed;
  overflow-y: auto;
}

.drawer_content_creator,
.drawer_content_field_right {
  padding: 10px;
}

.drawer_content_title {
  font-size: 16px;
  text-align: left;
}

.dialog_creator_content {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
.dialog_creator_left,
.dialog_creator_right {
  flex: 1;
  height: 360px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f6f8;
}
.dialog_creator_right {
  margin-left: 10px;
}
.creator_selected_row {
  color: #333;
  padding: 0 10px;
  line-height: 26px;
  display: flex;
  justify-content: space-between;
}
.creator_selected_row:hover {
  background-color: #e8e8e8;
}
.creator_selected_del {
  cursor: pointer;
}
.field_right_grid {
  margin-top: 10px;
  border: 1px solid #ededed;
}
.field_right_grid_header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background-color: #ededed;
}
.field_right_grid_data {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
}
.field_label {
  flex: 2;
  text-align: left;
}

.drawer_op {
  margin-right: 20px;
  line-height: 50px;
  text-align: right;
}

.checkbox_dep_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 26px;
  padding: 0 6px;
}

.checkbox_dep_wrap:hover {
  background-color: #ededed;
}

.checkbox_dep {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
