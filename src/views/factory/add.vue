<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="工厂名称">
        <el-input v-model="factory.faName" />
      </el-form-item>
      <el-form-item label="厂长名">
        <el-input v-model="factory.dirName" />
      </el-form-item>
       <el-form-item label="厂长电话">
        <el-input v-model="factory.dirTell" />
      </el-form-item>
       
      
      <el-form-item label="工厂地址">
        <el-input v-model="factory.faAddress" :rows="10" type="textarea" />
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
import factory from "@/api/factory";

export default {

  data() {
    return {
      factory: {}, //表单数据
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
        factory.getfactoryById(this.$route.params.id).then((response) => {
          this.factory = response.data.factory;
        });
      } else {
        console.log("清空数据！！！！！");
        this.factory = {};
      }
    },

    saveOrUpdate() {
      if (this.factory.id) {
        //id存在、执行修改
        this.updatefactoryInfo();
      } else {
        //id不存在、执行添加
        this.savefactory();
      }
    },
    //添加工厂
    savefactory() {
      factory.addfactory(this.factory).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/factory/list" });
      });
    },
    //修改工厂
    updatefactoryInfo() {
      factory.updatefactory(this.factory).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/factory/list" });
      });
    }

  },
};
</script>
