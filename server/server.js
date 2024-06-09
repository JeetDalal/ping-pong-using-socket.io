const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

const PORT = 3000

server.listen(PORT,()=>{
    console.log("listening on port 3000...")
})
var readyCount=0
io.on('connection',(socket)=>{
    console.log(`user ${socket.id} has connected`)

    socket.on('ready',()=>{
        readyCount++;
        console.log(readyCount)
        if(readyCount%2===0){
            //logic
            io.emit('startGame',socket.id)
        }
    })
    socket.on('paddleMove',(paddleData)=>{
        // console.log(paddleData.xPosition)
        socket.broadcast.emit('paddleMove',paddleData)
    })

    socket.on('disconnect',(reason)=>{
        console.log(reason)
    })

    socket.on('ballMove',(ballData)=>{
        socket.broadcast.emit('ballMove',ballData)
    })

})

