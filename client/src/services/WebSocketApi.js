import io from 'socket.io-client'

export default() => {
  return io.connect('http://localhost:5000')
}