<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="车间地址">
        <el-input v-model="shop.address" />
      </el-form-item>
      <el-form-item label="车间管理员id">
        <el-input v-model="shop.shopAdmin" />
      </el-form-item>
      
      <el-form-item label="备注">
        <el-input v-model="shop.note" :rows="10" type="textarea" />
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
import shop from "@/api/shop";

export default {

  data() {
    return {
      shop: {}, //表单数据
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
        shop.getShopById(this.$route.params.id).then((response) => {
          this.shop = response.data.shop;
        });
      } else {
        console.log("清空数据！！！！！");
        this.shop = {};
      }
    },

    saveOrUpdate() {
      if (this.shop.id) {
        //id存在、执行修改
        this.updateshopInfo();
      } else {
        //id不存在、执行添加
        this.saveshop();
      }
    },
    //添加车间
    saveshop() {
      shop.addShop(this.shop).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "添加成功!",
        });

        //路由跳转
        this.$router.push({ path: "/shop/list" });
      });
    },
    //修改车间
    updateshopInfo() {
      shop.updateShop(this.shop).then((response) => {
        //提示成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });

        //路由跳转
        this.$router.push({ path: "/shop/list" });
      });
    }

  },
};
</script>
