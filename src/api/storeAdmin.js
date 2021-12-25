import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getstoreAdminPageVo(current,limit,storeAdminQuery){
        return request({
            url: `/sql/storeadmin/getStoreAdmin/${current}/${limit}`,
            method: 'post',
            data: storeAdminQuery  //转化json传递
          })
    },

    delstoreAdmin(id){
        return request({
            url: `/sql/storeadmin/${id}`,
            method: 'delete'
        })
    },

    addstoreAdmin(storeAdmin){
        return request({
            url: `/sql/storeadmin/`,
            method: 'post',
            data: storeAdmin  //转化json传递
          })
    },

    updatestoreAdmin(storeAdmin){
        return request({
            url: `/sql/storeadmin/${storeAdmin.id}`,
            method: 'put',
            data: storeAdmin
          })
    },

    getstoreAdminById(id){
        return request({
            url: `/sql/storeadmin/getStoreAdmin/${id}`,
            method: 'get'
          })
    }

  
}