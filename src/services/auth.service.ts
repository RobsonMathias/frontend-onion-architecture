import { Service } from './service';
import { Auth } from '@types';
import { SignUpPayload } from '@types';
import { BehaviorSubject } from 'rxjs';

export class AuthService {
  private interceptorId: any;
  private subject = new BehaviorSubject<Auth | null>(null);

  constructor(private service: Service) {
    this.verifyAuthenticated().then();
  }

  private async verifyAuthenticated() {
    try {
      const user = await this.service.get<Auth>('/auth');
      this.subject.next(user);
    } catch (e) {
      this.subject.next(null);
    }
  }

  async signInWithGoogle() {
    const response = await this.service.post<Partial<Auth & { password: string }>, Auth>('/auth', {
      email: 'signed-with-google'
    });
    // Em uma API de sign up, iremos receber um token, para simular isso vou usar o e-mail.
    this.setInterceptor(response.email as string);
    this.subject.next(response as Auth);
    return response;
  }

  async signIn(email: string, password: string) {
    const response = await this.service.post<{ email: string; password: string }, Auth>('/auth', {
      email,
      password
    });
    // Em uma API de login, iremos receber um token, para simular isso vou usar o e-mail.
    this.setInterceptor(response.email as string);
    this.subject.next(response as Auth);
    return response;
  }

  async signUp(payload: SignUpPayload) {
    const response = await this.service.post<SignUpPayload, Auth>('/auth', payload);
    // Em uma API de sign up, iremos receber um token, para simular isso vou usar o e-mail.
    this.setInterceptor(response.email as string);
    this.subject.next(response as Auth);
    return response;
  }

  async signOut() {
    const response = await this.service.delete('/auth');
    this.removeInterceptor();
    this.subject.next(null);
    return response;
  }

  removeInterceptor() {
    return this.service.removeInterceptorHeaders(this.interceptorId);
  }

  onAuthStateChange(callback?: (auth: Auth | null) => void) {
    return this.subject.subscribe(callback);
  }

  setInterceptor(token: string) {
    this.interceptorId = this.service.setInterceptorHeaders({ Authorization: `Bearer ${token}` });
    return this.interceptorId;
  }
}
