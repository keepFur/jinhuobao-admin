import axios from '@/libs/api.request'
export const createStore = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/store/create_store',
    data: {
      title,
      content,
      groupId,
      authorId,
      media
    },
    method: 'post'
  })
}

export const readStoreList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/store/read_store_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readStoreById = (id) => {
  return axios.request({
    url: '/api/store/read_store_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateStoreById = (id, { title, content }) => {
  return axios.request({
    url: '/api/store/update_store_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deleteStoreById = (id, status) => {
  return axios.request({
    url: '/api/store/delete_store_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
