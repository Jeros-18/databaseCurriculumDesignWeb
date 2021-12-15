import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getEmployeePageVo(current,limit,employeeQuery){
        return request({
            url: `/sql/employee/getEmployee/${current}/${limit}`,
            method: 'post',
            data: employeeQuery  //转化json传递
          })
    }
}