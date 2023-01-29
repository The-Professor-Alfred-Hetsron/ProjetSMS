import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  axiosinstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 1000,
  });
  constructor(private cookies:CookieService, private rooter:Router) { }

  async getContact(id:string, token: string,){
    try{
      const configObject = {
        method: 'get', 
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/${id}`,
        ...configObject
      });
      const { contact } = response.data
      return contact
    }
    catch (error){
      console.log(error)
      alert("sorry an error ocurred please try to login again")
      this.rooter.navigate(['/login'])
    }
    return null
  }
  async getUserContact(token: string){
    try{
      const configObject = {
        method: 'get', 
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/get/personal`,
        ...configObject
      });
      const { contact } = response.data
      return contact
    }
    catch (error){
      console.log(error)
    }
    return null
  }
  async createContact(name: string, email: string, phone: string, comcode: string, token: string){
    try {
      const configObject = {
        method: 'post', 
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true
      }
      const data = {
        name,
        email,
        phone: Number.parseInt(phone),
        comcode: Number.parseInt(comcode)
      }
      console.log(data)
      const response = await this.axiosinstance.request({
        url: '/api/contact/new',
        data: data,
        ...configObject
      })
      const { contact } = response.data
      return contact
    } catch (error) {
      console.log(error)
    }
    return null
  }
  async getContacts(token:string){
    try {
      const configObject = {
        method: 'get', 
        headers: {
          'Cookie': `token=${this.cookies.get('token')}; Secure; HttpOnly`,
        },
        withCredentials: true
      }
      const response = await this.axiosinstance.request({
        url: '/api/contact/all',
        ...configObject
      })
      const { contacts } = response.data
      return contacts
    } catch (error) {
      console.log(error)
    }
    return null
  }
}
