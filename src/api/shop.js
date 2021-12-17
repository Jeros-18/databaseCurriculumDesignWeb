import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getshopPageVo(current,limit,shopQuery){
        return request({
            url: `/sql/shop/getShop/${current}/${limit}`,
            method: 'post',
            data: shopQuery  //转化json传递
          })
    },

    getAllShop(){
        return request({
            url: `/sql/shop`,
            method: 'get'
          })
    },

    getShopById(id){
        return request({
            url: `/sql/shop/getShop/${id}`,
            method: 'get'
          })
    },

    deleShop(id){
        return request({
            url: `/sql/shop/${id}`,
            method: 'delete'
          })
    },

    updateShop(shop){
        return request({
            url: `/sql/shop/${shop.id}`,
            method: 'put',
            data: shop
          })
    },

    addShop(shop){
        return request({
            url: `/sql/shop/`,
            method: 'post',
            data: shop  //转化json传递
          })
    },

}