export class FetchInterceptor {
  resInterceptor: ((res: Response) => Promise<Response>)[];
  reqInterceptor: ((option: RequestInit) => void)[];
  constructor() {
    this.resInterceptor = [];
    this.reqInterceptor = [];
  }
  addReqInterceptor(name: (option: RequestInit) => void) {
    this.reqInterceptor.push(name);
  }
  deleteReqInterceptor(name: (option: RequestInit) => void) {
    for (let i = 0; i < this.reqInterceptor.length; i++) {
      if (this.reqInterceptor[i] === name) {
        this.reqInterceptor.splice(i, 1);
      }
    }
  }

  async useReqInterceptor(host: string, option: RequestInit) {
    let newoption: RequestInit = option;
    for (let i = 0; i < this.reqInterceptor.length; i++) {
      await this.reqInterceptor[i](newoption);
    }
    return { host, newoption };
  }

  addResInterceptor(name: (res: Response) => Promise<Response>) {
    this.resInterceptor.push(name);
  }
  deleteResInterceptor(name: (res: Response) => Promise<Response>) {
    for (let i = 0; i < this.resInterceptor.length; i++) {
      if (this.resInterceptor[i] === name) {
        this.resInterceptor.splice(i, 1);
      }
    }
  }
  async useResInterceptor(res: Promise<Response>) {
    let responsePromise = res;
    for (let i = 0; i < this.resInterceptor.length; i++) {
      let middle = await responsePromise;
      responsePromise = this.resInterceptor[i](middle);
    }
    return responsePromise;
  }
}