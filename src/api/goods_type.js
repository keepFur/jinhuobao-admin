import axios from '@/libs/api.request'
export const createGoodsType = ({ name, type, userId }) => {
  return axios.request({
    url: '/api/goods_type/create_goods_type',
    data: {
      name,
      type,
      userId
    },
    method: 'post'
  })
}

export const readGoodsTypeList = ({ limit = 20, offset = 1, keyword, type }) => {
  return axios.request({
    url: '/api/goods_type/read_goods_type_list',
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

export const readGoodsTypeById = (id) => {
  return axios.request({
    url: '/api/goods_type/read_goods_type_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateGoodsTypeById = ({ id, name, type }) => {
  return axios.request({
    url: '/api/goods_type/update_goods_type_by_id',
    method: 'post',
    data: {
      id,
      name,
      type
    }
  })
}

export const deleteGoodsTypeById = (id, status) => {
  return axios.request({
    url: '/api/goods_type/delete_goods_type_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
