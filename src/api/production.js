import request from '@/utils/request'

export default {
    //带条件分页查询产品列表
    getproductionPageVo(current,limit,productionQuery){
        return request({
            url: `/sql/production/getProduction/${current}/${limit}`,
            method: 'post',
            data: productionQuery  //转化json传递
          })
    },

    delproduction(id){
        return request({
            url: `/sql/production/${id}`,
            method: 'delete'
        })
    },

    addproduction(production){
        return request({
            url: `/sql/production/`,
            method: 'post',
            data: production  //转化json传递
          })
    },

    updateproduction(production){
        return request({
            url: `/sql/production/${production.id}`,
            method: 'put',
            data: production
          })
    },

    getproductionById(id){
        return request({
            url: `/sql/production/getProduction/${id}`,
            method: 'get'
          })
    }

  
}