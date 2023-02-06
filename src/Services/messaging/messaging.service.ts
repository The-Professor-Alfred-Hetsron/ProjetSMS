import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  axiosinstance = axios.create({
    baseURL: 'https://haterbsms.onrender.com',
  });
  constructor(private cookies:CookieService) { }

  async getMessages(contact: string){
    try {
      const configObject = {
        method: 'get',
      }
      const response = await this.axiosinstance.request({
        url: `/api/msg/filter/${this.cookies.get('token')}/${contact}`,
        ...configObject
      });
      const { messages } = await response.data
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
      }
      const data = {
        message: rmessage,
        receivers
      }
      const response = await this.axiosinstance.request({
        url: `/api/msg/${this.cookies.get('token')}/new`,
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
