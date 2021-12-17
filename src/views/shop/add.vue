<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="仓库占地面积">
        <el-input v-model="store.size" />
      </el-form-item>
      <el-form-item label="仓库管理员id">
        <el-input v-model="store.storeAdmin" />
      </el-form-item>
      
      <el-form-item label="备注">
        <el-input v-model="store.note" :rows="10" type="textarea" />
      </el-form-item>


      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import store from "@/api/store";

export default {

  data() {
    return {
      store: {}, //表单数据
      saveBtnDisabled: false, //按钮是否不可操作

    };
  },
  created() {
    console.log("created!!!");
    this.init();
  },
  watch: {
    $route(to, from) {
      console.log("watch $route!!!");
      this.init();
    },
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        console.log("$route.params.id=" + this.$route.params.id);
        store.getStoreById(this.$route.params.id).then((response) => {
          this.store = response.data.store;
        });
      } else {
        console.log("清空数据！！！！！");
        this.store = {};
      }
    },

    saveOrUpdate() {
      if (this.store.id) {
        //id存在、执行修改
        this.updatestoreInfo();
      } else {
        //id不存在、执行添加
        this.savestore();
      }
    },
    //添加仓库
    savestore() {
      store.addStore(this.store).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/store/list" });
      });
    },
    //修改仓库
    updatestoreInfo() {
      store.updateStore(this.store).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/store/list" });
      });
    }

  },
};
</script>
