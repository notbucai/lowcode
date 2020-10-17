interface AnyObjectType {
  [key: string]: any
}

export function findByCallback (object: AnyObjectType, currentKey: string, callback: (current: AnyObjectType, key: string, value: any) => boolean): any{
  const current = object[currentKey];
  for (let key in current) {
    if (callback(current, key, current[key])) return [object, currentKey];
    if (typeof current[key] === 'object') {
      const value = findByCallback(current, key, callback);
      if (value) return value;
    }
  }
}