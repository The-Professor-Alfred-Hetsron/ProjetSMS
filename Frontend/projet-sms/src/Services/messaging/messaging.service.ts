import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
  });
  constructor(private cookies:CookieService) { }

  async getMessages(contact: string){
    try {
      const configObject = {
        method: 'get',
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true 
      }
      const response = await this.axiosinstance.request({
        url: `/api/msg/filter/${contact}`,
        ...configObject
      });
      const { messages } = await response.data
      //console.log(messages[0])
      return messages
    } catch (error) {
      console.log(error)
    }
    return null
  }
  async sendMessage(rmessage: string, receivers:string[], token:string) {
    try {
      const configObject = {
        method: 'post',
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true 
      }
      const data = {
        message: rmessage,
        receivers
      }
      const response = await this.axiosinstance.request({
        url: `/api/msg/new`,
        data: data,
        ...configObject
      });
      const { message } = await response.data
      return message
    } catch (error) {
      console.log(error)
    }
    return null
  }
}
