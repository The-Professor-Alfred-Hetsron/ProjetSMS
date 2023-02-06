import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  axiosinstance = axios.create({
    baseURL: 'https://haterbsms.onrender.com',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
  setCookie(cname:string, cvalue:string, exdays:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
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
      this.setCookie("token", response.data.token, 1)
      document.cookie
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
      }
      const response = await this.axiosinstance.request({
        url: `/api/user/${this.cookies.get('token')}/${id}`,
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
      this.setCookie("token", token, 1)
      return {user, token}
    } catch (error) {
      console.log(error)
    }
    return null
  }
  
}
