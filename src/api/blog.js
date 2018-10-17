import axios from '@/libs/api.request'
export const createBlog = ({ title, content, groupId, media, authorId }) => {
    return axios.request({
        url: '/api/blog/create_blog',
        data: {
            title,
            content,
            groupId,
            authorId,
            media
        },
        method: 'post'
    });
};

export const readBlogList = ({ limit = 20, offset = 1, keyword }) => {
    return axios.request({
        url: '/api/blog/read_blog_list',
        params: {
            limit,
            offset,
            isSuper: 1,
            keyword
        },
        method: 'get'
    });
};

export const readBlogById = (id) => {
    return axios.request({
        url: '/api/blog/read_blog_by_id',
        method: 'get',
        params: {
            id
        }
    });
};

export const updateBlogById = (id, { title, content }) => {
    return axios.request({
        url: '/api/blog/update_blog_by_id',
        method: 'post',
        data: {
            id,
            title,
            content
        }
    });
};

export const deleteBlogById = (id, status) => {
    return axios.request({
        url: '/api/blog/delete_blog_by_id',
        method: 'post',
        data: {
            id,
            status
        }
    });
};
