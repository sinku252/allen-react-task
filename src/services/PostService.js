import axios from 'axios';

const API_BASE_URL = "https://gorest.co.in/public/v2/";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer f149db4607b6702614c3824b5e44ec421c1dd3f560ed8d969d95d33909f86589',
    }
  };
class PostService {

    getPostList(userId){
        return axios.get(API_BASE_URL +  'users/' + userId + "/posts");;
    }

    createPost(post, userId){
        let url =API_BASE_URL + 'users/' + userId + "/posts"
        return axios.post(url,post, axiosConfig);
    }

    getCommentList(postId){
        return axios.get(API_BASE_URL +'posts/'+   postId + "/comments");;
    }

    createComment(comment, postId){
        let url =API_BASE_URL + 'posts/' + postId + "/comments"
        return axios.post(url,comment, axiosConfig);
    }

    
   
}

export default new PostService()