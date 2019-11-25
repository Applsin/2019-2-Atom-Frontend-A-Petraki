export async function startRecord(
  mediaRecorder,
  callbackStart = null,
  callbackEnd = null,
  callbackSuccess = null,
) {
  if (mediaRecorder) {
    mediaRecorder.start();

    if (callbackStart) { callbackStart(); }

    let chunks = [];
    mediaRecorder.addEventListener('stop', () => {
      const obj = new Blob(chunks, { type: mediaRecorder.mimeType });
      const audioURL = URL.createObjectURL(obj);
      chunks = [];

      if (callbackSuccess) { callbackSuccess(audioURL, obj); }
    });

    mediaRecorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data);
    });
  } else if (callbackEnd) { callbackEnd(); }
}

export function endRecord(mediaRecorder, callback = null) {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
  if (callback) { callback(); }
}
