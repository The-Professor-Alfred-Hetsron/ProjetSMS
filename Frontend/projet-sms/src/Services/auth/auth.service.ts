import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
  });
  constructor() { }
  async getUserContactId(values: {email:string, password: string}){
    let resp = {
      contact: '',
      id: '',
      token: ''
    };
    try {
      const configObject = {
        method: 'post'
      }
      console.log(values)
      const response = await this.axiosinstance.request({
        url: '/api/user/auth/login',
        data: {...values},
        ...configObject
      });
      console.log(response)
      resp.id = response.data.user._id;
      resp.contact = response.data.user.contact
      resp.token = response.data.token
      localStorage.setItem('userid', resp.id)
      return resp
    }
    catch (error){
      console.log(error)
    }
    
    return resp
  }
  
  async getUser(id: string){
    try{
      const configObject = {
        method: 'get', 
        headers: {
          'Set-Cookie': `token=${localStorage.getItem('token')}; HttpOnly`,
        },
        withCredentials: true
      }
      const response = await this.axiosinstance.request({
        url: `/api/user/${id}`,
        ...configObject
      });
      const { user } = response.data
      return user 
    } catch (err) {
      console.log(err)
    }
    return null
  }
  async createUser(name: string, email: string, password: string, phone: string){
    try {
      const configObject = {
        method: 'post', 
      }
      const data = {
        name,
        phone,
        email,
        password,
        comcode: 237
      }
      console.log(data)
      const response = await this.axiosinstance.request({
        url: '/api/user/auth/register',
        data: data,
        ...configObject
      });
      const { user, token } = response.data
      return {user, token}
    } catch (error) {
      console.log(error)
    }
    return null
  }
  
}
