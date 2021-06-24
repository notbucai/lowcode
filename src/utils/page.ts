export const getDataByModel = (data: any, key: string) => {
  if (!data) return undefined;
  return key.split('.').reduce((pv, key) => {
    if (!pv) return undefined;
    return pv[key];
  }, data);
}
export const setDataByModel = (data: any, key: string, value: any) => {
  const keys = key.split('.');
  const _key = keys.pop();
  if (!_key) return;
  keys.reduce((pv, key) => {
    return pv[key];
  }, data)[_key] = value;
}