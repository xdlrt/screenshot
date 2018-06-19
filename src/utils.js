
/**
 * 时间格式化工具函数
 * 
 * @export
 * @param {any} timestamp 时间戳，可选
 * @param {any} format 格式化方式，可选
 * @return {string} 格式化后的字符串
 */
export function dateFormat(timestamp, format) {
  let date;
  // 解决 safari 无法处理YYYY-MM-DD时间的问题
  if (typeof timestamp !== 'number') {
    timestamp = timestamp ? timestamp.replace(/-/g, '/') : '';
  }
  // 未传时间戳时，按当前时间处理
  if (timestamp) {
    date = new Date(timestamp);
  }
  else {
    date = new Date();
  }
  let year = date.getFullYear();  // 获取完整的年份(4位,1970)
  let month = timeFormat(date.getMonth() + 1);  // 获取月份(0-11,0代表1月,用的时候记得加上1)
  let day = timeFormat(date.getDate());  // 获取日(1-31)
  let hours = timeFormat(date.getHours());  // 获取小时数(0-23)
  let minutes = timeFormat(date.getMinutes());  // 获取分钟数(0-59)
  let seconds = timeFormat(date.getSeconds());  // 获取秒数(0-59)
  let time;
  if (format === 'YYMMDD') {
    time = `${year}${month}${day}`;
  }
  else {
    time = `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  return time;
}

function timeFormat(time) {
  if (time < 10) {
    return `0${time}`;
  }
  else {
    return time;
  }
}

export function runTaskQueue(arr) {
  const next = () => {
    const fn = arr.shift();
    if (!fn) {
      return;
    }
    fn(next);
  };
  next();
};
