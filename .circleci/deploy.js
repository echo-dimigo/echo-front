const sftp = require('node-sftp-deploy')
const path = require('path')

console.log(path.resolve(__dirname, '../dist'))

const config = {
  host: process.env.deploy_host,
  port: process.env.deploy_port,
  user: process.env.deploy_user,
  pass: process.env.deploy_password,
  remotePath: process.env.deploy_path,
  sourcePath: path.resolve(__dirname, '../dist')
}
 
sftp(config).then(() => {
  console.log(`Deployed to ${config.host}`)
})