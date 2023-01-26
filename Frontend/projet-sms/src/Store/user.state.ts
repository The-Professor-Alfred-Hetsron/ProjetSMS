import { State } from '@ngxs/store';
import User from 'src/Types/user';



@State<User>({
  name: 'UserState',
  defaults: {
    id: '',
    name: '',
    lastname: '',
    phone: ''
  }
})
export class UserState {}