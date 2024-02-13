/**
 * 放入一個 ref 值，得到大寫開頭的元件名稱
 */
const getComponentName = (refStr) => {
  return refStr.value[0].toUpperCase() + refStr.value.slice(1)
}



export { getComponentName }