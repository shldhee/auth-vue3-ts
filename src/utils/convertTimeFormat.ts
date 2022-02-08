const convertTimeFormat = (time: number): string => {
  const minites = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minites < 10 ? '0' + minites : minites}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
}

export default convertTimeFormat
