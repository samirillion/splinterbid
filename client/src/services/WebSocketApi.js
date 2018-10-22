import io from 'socket.io-client'

export default() => {
  return io.connect('http://127.0.0.1:5000')
}