import * as portAudio from 'naudiodon';
import * as fs from 'fs';

// Create an instance of AudioIO with outOptions (defaults are as below), which will return a WritableStream
var ao = new portAudio.AudioIO({
  outOptions: {
    channelCount: 2,
    sampleFormat: portAudio.SampleFormat16Bit,
    sampleRate: 16000,
    deviceId: 1, // Use -1 or omit the deviceId to select the default device
    closeOnError: true // Close the stream if an audio error is detected, if set false then just log the error
  }
});

// Create a stream to pipe into the AudioOutput
// Note that this does not strip the WAV header so a click will be heard at the beginning
var rs = fs.createReadStream('rawAudio.raw');

// Start piping data and start streaming
rs.pipe(ao);
ao.start();