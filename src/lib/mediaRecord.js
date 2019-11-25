export async function mediaRecord() {
  let recorder = null;
  try {
    const mediaType = { audio: true };
    const stream = await navigator.mediaDevices.getUserMedia(mediaType);
    recorder = new MediaRecorder(stream);
  } catch (exception) {
    throw new Error(exception);
  }
  return recorder;
}
