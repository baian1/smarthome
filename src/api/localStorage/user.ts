function tuple<T extends string[]>(...args: T): T {
  return args;
}

const userKey = tuple('id', 'token', 'devices');
type userKeytype = (typeof userKey)[number];

export class UserStorage {
  private isEmpty = true;

  public constructor() {
    this._init();
  }

  private _init = async () => {
    const data = await this._retrieveData();
    if (data === null) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  public get = async (key: userKeytype) => {
    const data = await this._retrieveData();
    if (data === null) {
      return null;
    } else {
      const res = JSON.parse(data);
      switch (key) {
        case 'id':
        case 'token':
          return res[key];
        case 'devices':
          return res[key] || [];
        default:
          return res[key];
      }
    }
  }

  public save = async (key: userKeytype, value: string | string[]) => {
    const Userdelta = {
      [key]: value
    };
    this._storeData(Userdelta);
  }

  private _storeData = async (data: { [index: string]: string | string[] }) => {
    try {
      if (this.isEmpty) {
        localStorage.setItem('User', JSON.stringify(data));
        this.isEmpty = false;
      } else {
        let olddata = JSON.parse(localStorage.getItem('User') as string);
        let newdata = { ...olddata, ...data, };
        localStorage.setItem('User', JSON.stringify(newdata));
      }
    } catch (error) {
      // Error saving data
    }
  }

  private _retrieveData = async () => {
    const value = await localStorage.getItem('User');
    if (value !== null) {
      console.log(value);
      return value;
    }
    return null;
  }
}
