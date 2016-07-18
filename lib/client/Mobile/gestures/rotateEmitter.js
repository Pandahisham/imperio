const rotateEmitter = (element, localCallback, modifyDataCallback) => {
  const hammertime = new Hammer(element);
  hammertime.get('rotate').set({ enable: true });
  hammertime.on('rotate', event => {
    event.start = false;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'rotate';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('rotatestart', event => {
    event.start = true;
    event.end = false;
    if (modifyDataCallback) event = modifyDataCallback(event);    
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'rotate';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (localCallback) localCallback(event);
  });
  hammertime.on('rotateend', event => {
    event.start = false;
    event.end = true;
    if (modifyDataCallback) event = modifyDataCallback(event);
    if (imperio.connectionType === 'webRTC') {
      const webRTCData = {};
      webRTCData.data = event;
      webRTCData.type = 'rotate';
      imperio.dataChannel.send(JSON.stringify(webRTCData));
    } else imperio.socket.emit('rotate', imperio.room, event);
    if (localCallback) localCallback(event);
  });
};

module.exports = rotateEmitter;
