export const utilService = {
  makeId,
  isValidUrl,
  isValidImg,
  getDateByTimestamp,
  timeSince,
  getInitials,
  getDemoImages,
  getDateTimeFormat,
  formatTimeToDM,
  isImage,
  getExtension,
  getPosition,
  getYearMonthFormat,
  getTimeFormat,
  getNewDateTime,
  getTimeAgo
}

function getNewDateTime(date, time) {
  const milliseconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000
  const timeParts = time.split(':')
  let newDate = new Date(date)
  newDate = newDate.setHours(0, 0, 0)

  return milliseconds(timeParts[0], timeParts[1], 0) + newDate
}
function getTimeAgo(timestamp, locale = 'en') {
  let value
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  const minutes = Math.floor(diff / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (years > 0) {
    value = rtf.format(0 - years, 'year')
  } else if (months > 0) {
    value = rtf.format(0 - months, 'month')
  } else if (days > 0) {
    value = rtf.format(0 - days, 'day')
  } else if (hours > 0) {
    value = rtf.format(0 - hours, 'hour')
  } else if (minutes > 0) {
    value = rtf.format(0 - minutes, 'minute')
  } else {
    value = 'Just now'
  }
  return value
}

function getTimeFormat(date) {
  const time = new Intl.DateTimeFormat('he', { hour: 'numeric', minute: 'numeric' })
  return time.format(date)
}

function getYearMonthFormat(date) {
  const month = new Intl.DateTimeFormat('en', { month: 'short' })
  const year = new Intl.DateTimeFormat('he', { year: 'numeric' })
  const displayDate = `${month.format(date)} ${year.format(date)}`

  return displayDate
}

function getPosition(element) {
  if (!element) return
  let { top, left } = element.getBoundingClientRect()
  return { top, left }
}

function getExtension(filename) {
  try {
    var parts = filename.split('.')
    return _imageOrVideo(parts[parts.length - 1])
  } catch (error) {
    return 'image'
  }
}

function _imageOrVideo(filename) {
  var type = ''
  switch (filename) {
    case 'm4v':
      type = 'video'
      break
    case 'avi':
      type = 'video'
      break
    case 'mpg':
      type = 'video'
      break
    case 'mp4':
      type = 'video'
      break
    case 'mkv':
      type = 'video'
      break
    case 'mov':
      type = 'video'
      break
    case 'jpg':
      type = 'image'
      break
    case 'gif':
      type = 'image'
      break
    case 'bmp':
      type = 'image'
      break
    case 'png':
      type = 'image'
      break
    default:
      type = 'image'
      break
  }
  return type
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

function getDateTimeFormat(date) {
  const now = new Date()
  const month = new Intl.DateTimeFormat('en', { month: 'short' })
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' })
  const time = new Intl.DateTimeFormat('he', { hour: 'numeric', minute: 'numeric' })
  const displayDate = `${month.format(date)} ${day.format(date)} at ${time.format(date)}`
  const displayDateOnly = `${day.format(date)} ${month.format(date)}`
  const statusDate = date > now.setHours(23, 59, 59, 59) ? '' : date > Date.now() ? 'duesoon' : 'overdue'

  return { displayDate, statusDate, displayDateOnly }
}

function formatTimeToDM(time) {
  var date = new Date(time)
  var month = date.getMonth(date)
  var day = date.getDate(date)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[month]} ${day}`
}

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function isValidUrl(txt) {
  const urlExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
  return urlExp.test(txt)
}

function isValidImg(filename) {
  return (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(filename)
}

function getDateByTimestamp(timestamp) {
  const currYear = new Date().getFullYear()
  const dueYear = new Date(timestamp).getFullYear()
  let strDate = ''
  strDate += `${new Date(timestamp).toLocaleString('en-GB', { day: 'numeric' })} `
  strDate += `${new Date(timestamp).toLocaleString('en-GB', { month: 'short' })} at `
  if (dueYear !== currYear) {
    strDate += `${dueYear} `
  }
  strDate += `${new Date(timestamp).toLocaleString('en-GB',
    { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleUpperCase()}`
  return strDate
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) === 1) return "a year ago";
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return "a month ago";
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return "a day ago";
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return "an hour ago";
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    if (Math.floor(interval) === 1) return "Just now";
    return Math.floor(interval) + " minutes ago";
  }
  if (Math.floor(seconds) === 0) return "Just now";
  return Math.floor(seconds) + " seconds ago";
}

function getInitials(name) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
  return initials
}

function getDemoImages() {
  return [
    {
      raw: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1627483262769-04d0a1401487?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1627483262769-04d0a1401487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1627483262769-04d0a1401487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1627483262769-04d0a1401487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHwxfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1627483262769-04d0a1401487',
    },
    {
      raw: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
      full: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
      regular:
        'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
      small:
        'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
      thumb:
        'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
      small_s3: 'https://media.istockphoto.com/photos/artificial-intelligence-in-healthcare-new-ai-applications-in-medicine-picture-id1365534802?b=1&k=20&m=1365534802&s=170667a&w=0&h=NBzCGZn66ef7qeiRM38SenrFKcXePSqN6aWGq3j6ZsM=',
    },
    {
      raw: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
      full: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
      regular:
        'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
      small:
        'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
      thumb:
        'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
      small_s3: 'https://www.nttdata.com/id/en/-/media/nttdataapac/common-images/digital/ai/digital_ai09_1024x576.jpg?h=576&la=en-ID&w=1024&hash=FE08D80EF739EABA191A91075BA62458990CF61B',
    },
    {
      raw: 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwyfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwyfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwyfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwyfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwyfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg',
    },
    {
      raw: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwzfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwzfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwzfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwzfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwzfHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1478760329108-5c3ed9d495a0',
    },
    {
      raw: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw0fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw0fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw0fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw0fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1531685250784-7569952593d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw0fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1531685250784-7569952593d2',
    },
    {
      raw: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw1fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw1fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw1fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw1fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw1fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1531315630201-bb15abeb1653',
    },
    {
      raw: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw2fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw2fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw2fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw2fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw2fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1528459801416-a9e53bbf4e17',
    },
    {
      raw: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw3fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw3fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw3fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw3fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw3fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1558591710-4b4a1ae0f04d',
    },
    {
      raw: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHw4fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHw4fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHw4fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHw4fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MXwxfHNlYXJjaHw4fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1627483262268-9c2b5b2834b5',
    },
    {
      raw: 'https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw5fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1487147264018-f937fba0c817?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw5fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1487147264018-f937fba0c817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw5fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1487147264018-f937fba0c817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw5fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1487147264018-f937fba0c817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHw5fHxiYWNrZ3JvdW5kfGVufDB8fHx8MTY1NDM2NTQwNg&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1487147264018-f937fba0c817',
    },
    {
      raw: 'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMHx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMHx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMHx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMHx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1521459467264-802e2ef3141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMHx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1521459467264-802e2ef3141f',
    },
    {
      raw: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1',
      full: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80',
      regular:
        'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=1080',
      small:
        'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=400',
      thumb:
        'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzQ4MjB8MHwxfHNlYXJjaHwxMXx8YmFja2dyb3VuZHxlbnwwfHx8fDE2NTQzNjU0MDY&ixlib=rb-1.2.1&q=80&w=200',
      small_s3: 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1476820865390-c52aeebb9891',
    },
  ]
}