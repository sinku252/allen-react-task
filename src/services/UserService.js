import axios from 'axios';

const API_BASE_URL = "https://gorest.co.in/public/v2/users";

  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer f149db4607b6702614c3824b5e44ec421c1dd3f560ed8d969d95d33909f86589',
    }
  };

class UserService {

    createUser(user){
        return axios.post(API_BASE_URL,user, axiosConfig);
    }
    
    updateUser(user,userId){
        let url=API_BASE_URL + '/' + userId
        return axios.patch(url,user,axiosConfig);
    }

    getUserDetails(userId){
        return axios.get(API_BASE_URL + '/' + userId);
    }

    getUserList(page){
        return axios.get(API_BASE_URL + '?page=' +page);;
    }
   
}

export default new UserService()