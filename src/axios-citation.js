import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-template-b9bd0.firebaseio.com/'
});

export default instance;