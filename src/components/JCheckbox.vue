<template>
  <div>
    <!-- <div style="line-height: 26px">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox>
    </div> -->

    <el-checkbox-group
      v-model="checkedItems"
      @change="handleCheckedItemsChange"
    >
      <div v-for="(item, idx) in itemList" :key="idx" style="width: 100%">
        <div class="j-checkbox-row">
          <div class="j-checkbox-left">
            <el-checkbox>
              <i :class="item.subordinate ? 'el-icon-s-management' : 'el-icon-s-custom'" :label="item.name"></i>
              {{ item.name }}
            </el-checkbox>
          </div>
          
        </div>
        <div v-if="item.subordinate" class="j-checkbox-row">
          <j-checkbox :itemList="item.subordinate"></j-checkbox>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "JCheckbox",
  props: ["itemList"],
  data() {
    return {
      checkAll: false,
      checkedItems: ['开发部'],
      isIndeterminate: true,
    };
  },
  methods: {
    // handleCheckAllChange(val) {
    //   this.checkedCities = val ? this.itemList : [];
    //   this.isIndeterminate = false;
    // },
    handleCheckedItemsChange(val) {
        console.log(val);
      //   let checkedCount = value.length;
      //   this.checkAll = checkedCount === this.cities.length;
      //   this.isIndeterminate =
      //     checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
};
</script>

<style scoped>
.j-checkbox {
  display: flex;
}
.j-checkbox-row {
  width: 180px;
  display: flex;
  justify-content: space-between;
  line-height: 26px;
  padding-left: 10px;
  /* border: 1px solid gray; */
}
.j-checkbox-left {
  flex: 100px;
  display: flex;
  align-items: center;
}
.j-checkbox-right {
  width: 60px;
  text-align: right;
}
</style>
