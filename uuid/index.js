function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now(); // 获取更精确的时间戳
  }

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0; // 对两个二进制数进行或运算
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); // 与操作和转成16位进制数
    }
  );

  return uuid;
}

// 示例用法
const randomUUID = generateUUID();
console.log(randomUUID);
