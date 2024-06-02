const storageKey = 'evceramics';

class InternalStorage {
  private _storage!: Storage | null;

  constructor(storage: Storage | null) {
    this._storage = storage;
  }

  private _getStorageObj(): any {
    if (!this._storage) return {};

    const storageStr = this._storage.getItem(storageKey);
    let storageObj = {};

    try {
      if (storageStr) storageObj = JSON.parse(storageStr);
    } catch (_) {}

    if (typeof storageObj !== 'object' || storageObj === null) storageObj = {};
    return storageObj;
  }

  private _setStorageObj(obj: Object): void {
    if (!this._storage) return;
    this._storage.setItem(storageKey, JSON.stringify(obj));
  }

  public set(key: string, value: any): void {
    const storageObj = this._getStorageObj();
    storageObj[key] = value;
    this._setStorageObj(storageObj);
  }

  public get(key: string): any {
    const storageObj = this._getStorageObj();
    return storageObj[key];
  }

  public remove(key: string): void {
    const storageObj = this._getStorageObj();
    delete storageObj[key];
    this._setStorageObj(storageObj);
  }
}

const LocalStorage = new InternalStorage(
  (typeof window !== 'undefined' && window.localStorage) || null,
);
const SessionStorage = new InternalStorage(
  (typeof window !== 'undefined' && window.sessionStorage) || null,
);

export { LocalStorage, SessionStorage };
