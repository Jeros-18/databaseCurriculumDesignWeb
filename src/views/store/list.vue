<template>
  <div class="app-container">
    仓库列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="StoreQuery.id" placeholder="仓库id" />
      </el-form-item>
      <!-- <el-form-item>
        <el-input v-model="StoreQuery.sizeMin" placeholder="仓库大小下限" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="StoreQuery.sizeMax" placeholder="仓库大小上限" />
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="StoreQuery.storeAdmin" placeholder="仓库管理员id" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="StoreQuery.note" placeholder="备注" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getstorePage()"
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

      <el-table-column prop="size" label="仓库占地面积" width="150" />
      <el-table-column prop="storeAdmin" label="仓库管理员Id" width="160" />
      <el-table-column prop="note" label="备注" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/store/add/' + scope.row.id">
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
      @current-change="getstorePage"
    />
  </div>
</template>
<script>
import store from "@/api/store";

export default {
  data() {
    return {
      current: 1, //页码
      limit: 10, //每页多少行
      StoreQuery: {}, //查询条件
      list: [], //列表数据
      total: 0, //总记录数
      sizeMin: 0,
      sizeMax: 10000
    };
  },
  created() {
    this.getstorePage();
  },
  methods: {
    getstorePage(current = 1) {
      this.current = current;
      store
        .getstorePageVo(this.current, this.limit, this.StoreQuery)
        .then((response) => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    //清空
    resetData() {
      this.StoreQuery = {};
      this.getstorePage();
    },
    //删除仓库
    removeDataById(id) {
      this.$confirm("此操作将永久删除该仓库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          store.delstore(id).then((response) => {
            //删除成功
            console.log("删除成功");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新表格
            this.getstorePage();
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
