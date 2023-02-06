import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  axiosinstance = axios.create({
    baseURL: 'https://haterbsms.onrender.com',
  });
  constructor(private cookies:CookieService, private rooter:Router) { }

  async getContact(id:string, token: string,){
    try{
      const configObject = {
        method: 'get', 
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/${this.cookies.get('token')}/${id}`,
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
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/get/${this.cookies.get('token')}/personal`,
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
      }
      const data = {
        name,
        email,
        phone: Number.parseInt(phone),
        comcode: Number.parseInt(comcode)
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/${this.cookies.get('token')}/new`,
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
      }
      const response = await this.axiosinstance.request({
        url: `/api/contact/${this.cookies.get('token')}/all`,
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
