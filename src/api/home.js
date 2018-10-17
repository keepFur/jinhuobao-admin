import axios from '@/libs/api.request';

export const readNewsList = (type) => {
  return axios.request({
    url: '/api/home/read_news_list',
    method: 'get',
    params: {

    }
  });
};
