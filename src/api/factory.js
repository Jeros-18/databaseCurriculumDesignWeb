import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getfactoryPageVo(current,limit,factoryQuery){
        return request({
            url: `/sql/factory/getFactory/${current}/${limit}`,
            method: 'post',
            data: factoryQuery  //转化json传递
          })
    },

    delfactory(id){
        return request({
            url: `/sql/factory/${id}`,
            method: 'delete'
        })
    },

    addfactory(factory){
        return request({
            url: `/sql/factory/`,
            method: 'post',
            data: factory  //转化json传递
          })
    },

    updatefactory(factory){
        return request({
            url: `/sql/factory/${factory.id}`,
            method: 'put',
            data: factory
          })
    },

    getfactoryById(id){
        return request({
            url: `/sql/factory/getFactory/${id}`,
            method: 'get'
          })
    }

  
}