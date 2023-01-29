import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
  });
  constructor(private cookies:CookieService) { }
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
      const response = await this.axiosinstance.request({
        url: '/api/user/auth/login',
        data: {...values},
        ...configObject
      });
      resp.id = response.data.user._id;
      resp.contact = response.data.user.contact
      resp.token = response.data.token
      return resp
    }
    catch (error){
      console.log(error)
        const newErr:AxiosError | any = error
        if (newErr){
          const { response } = newErr
          const { data } = response
          alert(data.message)
        }
    }
    
    return resp
  }
  
  async getUser(id: string){
    try{
      const configObject = {
        method: 'get', 
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
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
