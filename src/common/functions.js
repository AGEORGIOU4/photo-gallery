export const FormatTimestamp = (props) => {
  var date = new Date(props.date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (setMonth < 10 ? '0' + setMonth : setMonth) + '/' + date.getFullYear();

  return formattedDate;
}

export const FormatTimestampWithDate = (props) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const date = new Date(props.date);
  const dayOfWeekIndex = date.getDay();
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  const setMonth = date.getMonth() + 1;
  const formattedDate = `${(date.getDate() < 10 ? '0' + date.getDate() : date.getDate())}/${(setMonth < 10 ? '0' + setMonth : setMonth)}/${date.getFullYear()}`;

  return `${formattedDate}, ${dayOfWeek}`;
}

export const FormatTimestampDateTime = (props) => {
  var date = new Date(props.date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + (setMonth < 10 ? '0' + setMonth : setMonth) + '/' + date.getFullYear() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  return formattedDate;
}

export function FormatTimestampFunction(date) {
  var date = new Date(date);
  var setDate = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
  var incrementMonth = date.getMonth() + 1;
  var setMonth = (incrementMonth) < 10 ? '0' + incrementMonth : incrementMonth;

  var formattedDate = date.getFullYear() + '-' + setMonth + '-' + setDate;

  return formattedDate;
}

export function FormatTimestampFunction2(date) {
  var date = new Date(date);
  var setMonth = date.getMonth() + 1;
  var formattedDate = date.getDate() + '/' + setMonth + '/' + date.getFullYear();

  return formattedDate;
}

export function formatDate(date) {
  return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD
}

