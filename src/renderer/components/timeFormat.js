export default function timeConverter (UNIX_timestamp) {
  const date = new Date(UNIX_timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const _date = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  const time = _date + '-' + month + '-' + year+ ' ' + hour + ':' + min + ':' + sec;
  return time;
}