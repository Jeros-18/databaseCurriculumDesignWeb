import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getstorePageVo(current,limit,storeQuery){
        return request({
            url: `/sql/store/getStore/${current}/${limit}`,
            method: 'post',
            data: storeQuery  //转化json传递
          })
    },

    delstore(id){
        return request({
            url: `/sql/store/${id}`,
            method: 'delete'
        })
    },

    addStore(store){
        return request({
            url: `/sql/store/`,
            method: 'post',
            data: store  //转化json传递
          })
    },

    updateStore(store){
        return request({
            url: `/sql/store/${store.id}`,
            method: 'put',
            data: store
          })
    },

    getStoreById(id){
        return request({
            url: `/sql/store/getStore/${id}`,
            method: 'get'
          })
    }

  
}