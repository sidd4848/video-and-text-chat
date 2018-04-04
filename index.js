window.onload = function(){
  document.getElementById('chat').style.display = "none"
}
var getUserMedia = require('getusermedia')

getUserMedia({ video: true, audio: true }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })
var ssc;
  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
    ssc = data
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
        document.getElementById('chat').style.display = "block"
        document.getElementById('button').style.display = "none"
  })

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    document.getElementById('messages').textContent += ssc + ":" + yourMessage +'\n'
    peer.send(yourMessage)
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += 'ME:' + data + '\n'
  })

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
    document.getElementById('videoframe').appendChild(video)
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
})
