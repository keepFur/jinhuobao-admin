import axios from '@/libs/api.request'
export const createPromote = ({ title, content, groupId, media, authorId }) => {
  return axios.request({
    url: '/api/promote/create_promote',
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

export const readPromoteList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/promote/read_promote_list',
    params: {
      limit,
      offset,
      isSuper: 1,
      keyword
    },
    method: 'get'
  })
}

export const readPromoteById = (id) => {
  return axios.request({
    url: '/api/promote/read_promote_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updatePromoteById = (id, { title, content }) => {
  return axios.request({
    url: '/api/promote/update_promote_by_id',
    method: 'post',
    data: {
      id,
      title,
      content
    }
  })
}

export const deletePromoteById = (id, status) => {
  return axios.request({
    url: '/api/promote/delete_promote_by_id',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
