const isoTimeFormat = (dateTime) => {
  const date = new Date(dateTime);
  const localTIme = date.toLocaleTimeString('en-US',{
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return localTIme;
}

export default isoTimeFormat