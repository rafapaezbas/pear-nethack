import DHT from 'hyperdht'
import { keyPair, randomBytes } from 'hypercore-crypto'
import { spawn } from 'child_process'

const node = new DHT()
const server = node.createServer()
server.on('connection', (connection) => {
  const telnet = spawn('telnet', ['127.0.0.1', '23'])
  connection.on('error', () => telnet.kill())
  connection.on('close', () => telnet.kill())
  connection.pipe(telnet.stdin)
  telnet.stdout.pipe(connection)
})

const seed = Buffer.from(process.argv[2], 'hex')
await server.listen(keyPair(seed))

console.log('server listening in: ', server.publicKey.toString('hex'))

