import { Injectable } from '@angular/core';

export interface User{
  id: string;
  name: string;
  role: 'Student' | 'Teacher' | 'Admin';  
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //Credentials for testing
  private users: User[] = [
    { id: 'stu123', name: 'Harsh', role: 'Student', password: 'stu123' },
    { id: 'tch456', name: 'Mohan Rao', role: 'Teacher', password: 'tch456' },
    { id: 'adm123', name: 'Admin User', role: 'Admin', password: 'adm123' },
  ];
  
  private currentUser: User | null = null;

  login(id: string, password: string): boolean {
    const user=this.users.find(
      u=>u.id === id && u.password === password
    );
    if(user){
      this.currentUser=user;
      return true;
    }
    return false;
  }

  logout(): void{
    this.currentUser = null;
  }

  isLoggedIn():boolean{
    return this.currentUser !== null;
  }
  
  getRole(): string | null{
    return this.currentUser ? this.currentUser.role : null;
  }

  getCurrentUser(): User | null{
    return this.currentUser;
  }
}  