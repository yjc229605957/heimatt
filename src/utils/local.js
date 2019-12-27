// 封装所有操作localstorage的方法
// 设置localstorage
function setlocal (key, value) {
  // 将数据对象转为字符串
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取localstorage
function getlocal (key) {
  // 获取的是字符串 需要转为对象
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除localstorage
function removelocal (key) {
  window.localStorage.removeItem(key)
}

export {
  setlocal,
  getlocal,
  removelocal
}
