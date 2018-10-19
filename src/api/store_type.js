import axios from '@/libs/api.request'
export const createStoreType = ({ name, type, userId }) => {
  return axios.request({
    url: '/api/store_type/create_store_type',
    data: {
      name,
      type,
      userId
    },
    method: 'post'
  })
}

export const readStoreTypeList = ({ limit = 20, offset = 1, keyword, type }) => {
  return axios.request({
    url: '/api/store_type/read_store_type_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword,
      type
    },
    method: 'get'
  })
}

export const readStoreTypeById = (id) => {
  return axios.request({
    url: '/api/store_type/read_store_type_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateStoreTypeById = ({ id, name, type }) => {
  return axios.request({
    url: '/api/store_type/update_store_type_by_id',
    method: 'post',
    data: {
      id,
      name,
      type
    }
  })
}

export const deleteStoreTypeById = (id, status) => {
  return axios.request({
    url: '/api/store_type/delete_store_type_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
