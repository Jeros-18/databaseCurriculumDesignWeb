<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="仓库管理员姓名">
        <el-input v-model="storeAdmin.name" />
      </el-form-item>
      <el-form-item label="仓库管理员电话">
        <el-input v-model="storeAdmin.tell" />
      </el-form-item>
      
      <el-form-item label="所管仓库">
        <el-input v-model="storeAdmin.storeId"/>
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
import storeAdmin from "@/api/storeAdmin";

export default {

  data() {
    return {
      storeAdmin: {}, //表单数据
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
        storeAdmin.getstoreAdminById(this.$route.params.id).then((response) => {
          this.storeAdmin = response.data.storeAdmin;
        });
      } else {
        console.log("清空数据！！！！！");
        this.storeAdmin = {};
      }
    },

    saveOrUpdate() {
      if (this.storeAdmin.id) {
        //id存在、执行修改
        this.updatestoreAdminInfo();
      } else {
        //id不存在、执行添加
        this.savestoreAdmin();
      }
    },
    //添加仓库管理员
    savestoreAdmin() {
      storeAdmin.addstoreAdmin(this.storeAdmin).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/storeAdmin/list" });
      });
    },
    //修改仓库管理员
    updatestoreAdminInfo() {
      storeAdmin.updatestoreAdmin(this.storeAdmin).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/storeAdmin/list" });
      });
    }

  },
};
</script>
