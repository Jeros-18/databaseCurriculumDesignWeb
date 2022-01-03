<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="产品名称">
        <el-input v-model="production.name" />
      </el-form-item>
      <el-form-item label="产品价格">
        <el-input v-model="production.price" />
      </el-form-item>
       <el-form-item label="车间id">
        <el-input v-model="production.shopId" />
      </el-form-item>
      <el-form-item label="仓库id">
        <el-input v-model="production.storeId" />
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
import production from "@/api/production";

export default {

  data() {
    return {
      production: {}, //表单数据
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
        production.getproductionById(this.$route.params.id).then((response) => {
          this.production = response.data.production;
        });
      } else {
        console.log("清空数据！！！！！");
        this.production = {};
      }
    },

    saveOrUpdate() {
      if (this.production.id) {
        //id存在、执行修改
        this.updateproductionInfo();
      } else {
        //id不存在、执行添加
        this.saveproduction();
      }
    },
    //添加产品
    saveproduction() {
      production.addproduction(this.production).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/production/list" });
      });
    },
    //修改产品
    updateproductionInfo() {
      production.updateproduction(this.production).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/production/list" });
      });
    }

  },
};
</script>
