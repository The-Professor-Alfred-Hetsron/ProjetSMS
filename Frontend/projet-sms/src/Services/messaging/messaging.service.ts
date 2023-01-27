import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
  });
  constructor() { }

  async getMessages(contact: string){
    try {
      const configObject = {
        method: 'get',
        headers: {
          'Set-Cookie': `token=${localStorage.getItem('token')}; HttpOnly`,
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
}
