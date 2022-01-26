import axios from 'axios';

import {BACKEND_URI} from '../../config';

export const fetchPost = async (num: number = 30) => {
  let response: Array<any> | any;
  await axios
    .get(`${BACKEND_URI}/post/${num}`)
    .then(res => {
      response = res.data;
    })
    .catch(error => {
      throw new Error(error);
    });
  return response;
};
