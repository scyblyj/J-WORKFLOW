<template>
  <div class="node_wrap">
    <j-node :nodeOpts.sync="nodeOpts"></j-node>

    <div class="end_node">
      <span class="end_node_icon">结束</span>
    </div>
    {{ nodeOpts }}
  </div>
</template>

<script>
import JNode from "./JNode.vue";
export default {
  data() {
    return {
      nodeOpts: {
        type: 0, //0: 起点， 1：办理节点,  2:审批节点, 3:抄送节点, 9:路由, 10:条件节点
        name: "流程开始",
        childNode: {
          type: 1,
          name: "办理节点",
          childNode: {
            type: 2,
            name: "审批节点",
            childNode: {
              type: 3,
              name: "抄送节点",
              childNode: {
                type: 9,
                name: "路由",
                childNode: {
                  type: 3,
                  name: "抄送节点",
                },
                conditionNodes: [
                  {
                    name: "条件1",
                    type: 10,
                    childNode: {
                      type: 2,
                      name: "审批节点",
                      childNode: {
                        type: 2,
                        name: "审批节点",
                        childNode: null,
                      },
                    },
                  },
                  {
                    name: "条件2",
                    type: 10,
                    childNode: null,
                  },
                  
                ],
              },
            },
          },
        },
      },
    };
  },
  components: {
    JNode,
    // JNodeArray,
  },
  methods: {
    objToArr(obj, arr) {
      let childNode;

      if (obj !== null) {
        //   console.log(obj);
        childNode = obj.childNode ? { ...obj.childNode } : null;
        delete obj.childNode;
        arr.push(obj);

        this.objToArr(childNode, arr);
      }
    },

    arrToObj(arr, id) {
      let res = null;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].parentNode == id) {
          res = arr[i];
          res.childNode = this.arrToObj(arr, arr[i].id);
        }
      }
      return res;
    },
  },
};
</script>

<style scoped>
.node_wrap {
  width: 100%;
  min-width: 1600px;
  height: 100%;
  padding: 60px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}
.end_node {
  width: 60px;
  margin: 0 auto;
}
.end_node_icon {
  margin-left: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  background-color: #d8d8d8;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
