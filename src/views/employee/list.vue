<template>
  <div class="app-container">
    员工列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="employeeQuery.id" placeholder="员工id" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="employeeQuery.name" placeholder="员工名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="employeeQuery.tell" placeholder="电话" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="employeeQuery.address" placeholder="员工住址" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="employeeQuery.shopId" placeholder="员工所属车间" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getEmployeePage()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          (current - 1) * limit + scope.$index + 1
        }}</template>
      </el-table-column>

      <el-table-column prop="id" label="id" width="110" />

      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="tell" label="电话" width="160" />
      <el-table-column prop="address" label="住址" />
      <el-table-column prop="shopId" label="所属车间" width="100" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/employee/add/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getEmployeePage"
    />
  </div>
</template>
<script>
import employee from "@/api/employee";

export default {
  data() {
    return {
      current: 1, //页码
      limit: 10, //每页多少行
      employeeQuery: {}, //查询条件
      list: [], //列表数据
      total: 0, //总记录数
    };
  },
  created() {
    this.getEmployeePage();
  },
  methods: {
    getEmployeePage(current = 1) {
      this.current = current;
      employee
        .getEmployeePageVo(this.current, this.limit, this.employeeQuery)
        .then((response) => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    //清空
    resetData() {
      this.employeeQuery = {};
      this.getEmployeePage();
    },
    //删除员工
    removeDataById(id) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          employee.delEmployee(id).then((response) => {
            //删除成功
            console.log("删除成功");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新表格
            this.getEmployeePage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
