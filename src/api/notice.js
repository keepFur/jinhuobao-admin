import axios from '@/libs/api.request'
export const createNotice = ({ name, content, useRange, remark }) => {
  return axios.request({
    url: '/api/notice/create_notice',
    data: {
      name,
      content,
      useRange,
      remark
    },
    method: 'post'
  })
}

export const readNoticeList = ({ limit = 20, offset = 1, keyword }) => {
  return axios.request({
    url: '/api/notice/read_notice_list',
    params: {
      limit,
      offset,
      keyword
    },
    method: 'get'
  })
}

export const readNoticeById = (id) => {
  return axios.request({
    url: '/api/notice/read_notice_by_id',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateNoticeById = ({ id, name, content, remark, useRange }) => {
  return axios.request({
    url: '/api/notice/update_notice_by_id',
    method: 'post',
    data: {
      id,
      name,
      useRange,
      remark,
      content
    }
  })
}

export const deleteNoticeById = (id, dataStatus) => {
  return axios.request({
    url: '/api/notice/delete_notice_by_id',
    method: 'post',
    data: {
      id,
      dataStatus
    }
  })
}
