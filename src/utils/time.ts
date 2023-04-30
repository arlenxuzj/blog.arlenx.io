export const parseWakaTimeText = (text: string, hStr = 'h', mStr = 'm') => {
  const h = text.match(/\S+(?=\s+hrs)/g);
  const m = text.match(/\S+(?=\s+mins)/g);

  if (h && m) {
    return `${h}${hStr} ${m}${mStr}`;
  } else if (h && !m) {
    return `${h}${hStr}`;
  } else if (!h && m) {
    return `${m}${mStr}`;
  } else {
    return `0${mStr}`;
  }
};
