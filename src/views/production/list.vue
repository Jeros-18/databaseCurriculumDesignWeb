<template>
  <div class="app-container">
    
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="productionQuery.id" placeholder="产品id" />
      </el-form-item>
    <el-form-item>
        <el-input v-model="productionQuery.name" placeholder="产品名" />
      </el-form-item>
      
      <el-form-item>
        <el-input v-model="productionQuery.shopId" placeholder="车间id" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="productionQuery.storeId" placeholder="仓库id" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getproductionPage()"
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

      <el-table-column prop="id" label="产品id" width="110" />

      <el-table-column prop="name" label="产品名" />
      <el-table-column prop="price" label="价格" width="160" />
      <el-table-column prop="shopId" label="车间id" width="180"/>
      <el-table-column prop="storeId" label="仓库id" width="180"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/production/add/' + scope.row.id">
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
      @current-change="getproductionPage"
    />
  </div>
</template>
<script>
import production from "@/api/production";

export default {
  data() {
    return {
      current: 1, //页码
      limit: 10, //每页多少行
      productionQuery: {}, //查询条件
      list: [], //列表数据
      total: 0, //总记录数
      sizeMin: 0,
      sizeMax: 10000
    };
  },
  created() {
    this.getproductionPage();
  },
  methods: {
    getproductionPage(current = 1) {
      this.current = current;
      production
        .getproductionPageVo(this.current, this.limit, this.productionQuery)
        .then((response) => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        });
    },
    //清空
    resetData() {
      this.productionQuery = {};
      this.getproductionPage();
    },
    //删除产品
    removeDataById(id) {
      this.$confirm("此操作将永久删除该产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          production.delproduction(id).then((response) => {
            //删除成功
            console.log("删除成功");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新表格
            this.getproductionPage();
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
