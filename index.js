import process from 'bare-process'
import DHT from 'hyperdht'

process.stdin.setRawMode(true)

const node = new DHT()
const connection = node.connect('8439675b0a510a812d6172e787c5cb5ae8521c7d6c69ac6695a528642df74617')

connection.on('open', () => {
  process.stdin.on('data', (data) => {
    if (data.toString('hex') === '03') process.kill(process.pid, 'SIGINT')
    connection.write(data)
  })
  connection.on('data', (data) => {
    process.stdout.write(data)
  })
  connection.on('error', noop)
  connection.on('close', noop)
})

function noop () {
}
