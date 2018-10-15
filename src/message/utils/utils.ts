import * as xml2js from 'xml2js'
// 解析 xml
export const parmsXml = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (err, content) => {
      if (err) {
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}

// 解析数据为 json
export const formatMessage = result => {
    let message = {}
  
    if (typeof result === 'object') {
      const keys = Object.keys(result)
  
      
    }
  
    return message
  }