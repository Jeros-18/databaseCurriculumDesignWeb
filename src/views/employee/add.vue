<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="员工名称">
        <el-input maxlength="10" v-model="employee.name"/>
      </el-form-item>
      <el-form-item label="员工电话">
        <el-input v-model="employee.tell" />
      </el-form-item>
      
      
      <el-form-item label="员工住址">
        <el-input v-model="employee.address" :rows="10" type="textarea" />
      </el-form-item>

    <el-form-item label="所属车间">
        <el-input v-model="employee.shopId" />
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
import employee from "@/api/employee";

export default {

  data() {
    return {
      employee: {}, //表单数据
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
        employee.getemployeeById(this.$route.params.id).then((response) => {
          this.employee = response.data.employee;
        });
      } else {
        console.log("清空数据！！！！！");
        this.employee = {};
      }
    },

    saveOrUpdate() {
      if (this.employee.id) {
        //id存在、执行修改
        this.updateemployeeInfo();
      } else {
        //id不存在、执行添加
        this.saveemployee();
      }
    },
    //添加讲师
    saveemployee() {
      employee.addemployee(this.employee).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/employee/list" });
      });
    },
    //修改讲师
    updateemployeeInfo() {
      employee.updateemployee(this.employee).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/employee/list" });
      });
    }

  },
};
</script>
