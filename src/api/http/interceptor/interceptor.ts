export class FetchInterceptor {
  private resInterceptor: ((res: Response) => Promise<Response>)[]
  private reqInterceptor: ((option: RequestInit) => void)[]
  public constructor() {
    this.resInterceptor = []
    this.reqInterceptor = []
  }

  public addReqInterceptor(name: (option: RequestInit) => void) {
    this.reqInterceptor.push(name)
  }
  public deleteReqInterceptor(name: (option: RequestInit) => void) {
    for (let i = 0; i < this.reqInterceptor.length; i++) {
      if (this.reqInterceptor[i] === name) {
        this.reqInterceptor.splice(i, 1)
      }
    }
  }
  public async useReqInterceptor(host: string, option: RequestInit) {
    let newoption: RequestInit = option
    for (let i = 0; i < this.reqInterceptor.length; i++) {
      await this.reqInterceptor[i](newoption)
    }
    return { host, newoption }
  }

  public addResInterceptor(name: (res: Response) => Promise<Response>) {
    this.resInterceptor.push(name)
  }
  public deleteResInterceptor(name: (res: Response) => Promise<Response>) {
    for (let i = 0; i < this.resInterceptor.length; i++) {
      if (this.resInterceptor[i] === name) {
        this.resInterceptor.splice(i, 1)
      }
    }
  }
  public async useResInterceptor(res: Promise<Response>) {
    let responsePromise = res
    for (let i = 0; i < this.resInterceptor.length; i++) {
      let middle = await responsePromise
      responsePromise = this.resInterceptor[i](middle)
    }
    return responsePromise
  }
}
