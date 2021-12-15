import request from '@/utils/request'

export default {
    //带条件分页查询讲师列表
    getEmployeePageVo(current,limit,employeeQuery){
        return request({
            url: `/sql/employee/getEmployee/${current}/${limit}`,
            method: 'post',
            data: employeeQuery  //转化json传递
          })
    },

    getemployeeById(id){
        return request({
            url: `/sql/employee/getEmployee/${id}`,
            method: 'get',
          })
    },

    addemployee(employee){
        return request({
            url: `/sql/employee/addEmployee`,
            method: 'post',
            data: employee
          })
    },

    updateemployee(employee){
        return request({
            url: `/sql/employee/updateEmployee`,
            method: 'post',
            data: employee
          })
    },

    delEmployee(id){
        return request({
            url: `/sql/employee/${id}`,
            method: 'delete'
          })
    }
}