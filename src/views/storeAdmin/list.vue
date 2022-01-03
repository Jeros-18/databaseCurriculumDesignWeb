<template>
  <div class="app-container">
   
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="storeAdminQuery.id" placeholder="仓库管理员id" />
      </el-form-item>
    
      <el-form-item>
        <el-input v-model="storeAdminQuery.name" placeholder="仓库管理员姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="storeAdminQuery.tell" placeholder="仓库管理员姓名电话" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="storeAdminQuery.storeId" placeholder="所管仓库id" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getstoreAdminPage()"
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

      <el-table-column prop="id" label="仓库管理员id" width="160" />

      <el-table-column prop="name" label="仓库管理员姓名" width="150" />
      <el-table-column prop="tell" label="仓库管理员电话" width="160" />
      <el-table-column prop="storeId" label="所管仓库id" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/storeAdmin/add/' + scope.row.id">
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
      @current-change="getstoreAdminPage"
    />
  </div>
</template>
<script>
import storeAdmin from "@/api/storeAdmin";

export default {
  data() {
    return {
      current: 1, //页码
      limit: 10, //每页多少行
      storeAdminQuery: {}, //查询条件
      list: [], //列表数据
      total: 0, //总记录数
      sizeMin: 0,
      sizeMax: 10000
    };
  },
  created() {
    this.getstoreAdminPage();
  },
  methods: {
    getstoreAdminPage(current = 1) {
      this.current = current;
      storeAdmin
        .getstoreAdminPageVo(this.current, this.limit, this.storeAdminQuery)
        .then((response) => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    //清空
    resetData() {
      this.storeAdminQuery = {};
      this.getstoreAdminPage();
    },
    //删除仓库管理员
    removeDataById(id) {
      this.$confirm("此操作将永久删除该仓库管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          storeAdmin.delstoreAdmin(id).then((response) => {
            //删除成功
            console.log("删除成功");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新表格
            this.getstoreAdminPage();
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
