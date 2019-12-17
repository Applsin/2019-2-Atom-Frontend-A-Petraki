import React from 'react';
import styles from '../styles/FormInput.module.css';
import { geo } from '../lib/geo';
import { startRecord, endRecord } from '../lib/voiceRecord';

export function FormInput(props) {
  const input = React.useRef(null);
  const {
    messageHandler,
    requireRecorder,
    mediaRecorder,
  } = props;
  const [dragFiles, setDragFiles] = props.dragFiles;
  const [dropOutStyle, setDropOutStyle] = React.useState(null);
  const [attachments, setAttachments] = React.useState(null);
  const [sendButtonType, setSendButtonType] = React.useState('mic');
  const [recording, setRecording] = React.useState(false);
  let attachmentsBoxStyles = null;
  let list = null;
  const img = React.useRef(null);

  const onSubmit = () => {
    const value = input.current.value.trim();
    if (attachments || value !== '') {
      input.current.value = '';
      messageHandler(value, null, null, attachments);
    }
    setAttachments(null);
  };

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      onSubmit();
    }
  };

  const removeFile = (i) => {
    const attachmentsList = attachments.list;
    attachmentsList.splice(i, 1);
    if (attachmentsList.length) {
      setAttachments({
        type: attachments.type,
        list: attachmentsList,
      });
    } else {
      setAttachments(null);
    }
  };

  if (dragFiles) {
    const draggedAttachments = attachments || {};
    draggedAttachments.type = 'image';
    draggedAttachments.list = [
      {
        name: dragFiles.name,
        path: window.URL.createObjectURL(dragFiles),
        file: dragFiles,
      },
    ];

    if (draggedAttachments !== attachments) {
      setAttachments(draggedAttachments);
    }

    setDragFiles(null);
  }


  const recordStatus = (status) => {
    if (recording !== status) {
      setRecording(status);
    }
  };

  
  if (recording && sendButtonType !== 'cancel') { setSendButtonType('cancel'); }
  else if ((!recording && (input.current && input.current.value !== '')) || attachments) {
    if (sendButtonType !== 'send') { setSendButtonType('send'); }
  } else if (!recording && sendButtonType !== 'mic') { setSendButtonType('mic'); }

  const imageUploader = (event, callbackSuccess, callbackError = null) => {
    let additionsList = event.target.files;
    if (!additionsList.length) {
      return false;
    }

    let toobig = false;
    additionsList = [...additionsList].map((file) => {
      if (file.size > 8 * 1024 * 1024) { toobig = true; }
      return {
        name: file.name,
        path: window.URL.createObjectURL(file),
        file,
      };
    });

    if (toobig) {
      if (callbackError) { callbackError('Its too big!!!'); }
      return false;
    }

    if (attachments) {
      additionsList = [...attachments.list, ...additionsList];
    }

    if (additionsList.length > 10) {
      additionsList = additionsList.slice(0, 10);
    }

    callbackSuccess(additionsList);

    return false;
  };

  if (attachments) {
    attachmentsBoxStyles = {
      height: '100px',
    };

    list = attachments.list.map((addition, i) => (
        <Attachment
          key={i}
          remove={removeFile.bind(null, i)}
          type={attachments.type}
          addition={addition}
        />
    ));
  }

  return (
    <div className={styles.container}>
        <div className={styles.formInput}>
          <div
            onClick={() => {
              !dropOutStyle && setDropOutStyle({
                height: '50px',
              });
              dropOutStyle && setDropOutStyle(null);
            }}
            className={styles.attachButton} />

          <input
            onChange={(event) => {
              if (event.target.value.length > 0) {
                setSendButtonType('send');
              } else if (event.target.value.length === 0) {
                setSendButtonType('mic');
              }
            }}
            onKeyPress={onKeyPress}
            ref={input}
            placeholder='Enter message...' />

          <SendButton
            cancel={() => {
              endRecord(mediaRecorder, () => {
                recordStatus(false);
              });
            }}
            record={() => {
              requireRecorder().then((media) => {

                startRecord(media, () => {
                  recordStatus(true);
                }, () => {
                  recordStatus(false);
                },
                (audioURL, blob) => {
                  setAttachments({
                    type: 'audio',
                    list: [
                      {
                        path: audioURL,
                        file: blob,
                      },
                    ],
                  });
                });
              }).catch(console.log);
            }}

            submit={onSubmit}
            type={sendButtonType}/>

          <div className={styles.dropOut} style={dropOutStyle}>
            <div className={styles.dropOutContainer}>
              <div
                onClick={() => {
                  setDropOutStyle(null);
                  img.current.click();
                }}
                className={`${styles.attachItem} ${styles.attachImage}`}>
                <input
                  onChange={(event) => {
                    imageUploader(event, (attachmentsList) => {
                      setAttachments({
                        type: 'image',
                        list: attachmentsList,
                      });
                    });
                  }}
                  ref={img}
                  type='file'
                  multiple style={{ display: 'none' }} />
              </div>

              <div
                onClick={() => {
                  setDropOutStyle(null);
                  geo((position) => {
                    const { latitude, longitude } = position.coords;
                    const response = `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=15`;
                    setAttachments({
                      type: 'geolocation',
                      list: [
                        {
                          path: response,
                          latitude,
                          longitude,
                        },
                      ],
                    });
                  });
                }}
                className={`${styles.attachItem} ${styles.attachGeo}`}></div>
            </div>
          </div>
      </div>
      <div style={attachmentsBoxStyles} className={styles.additionsBox}>
        <ul className={styles.additionsBoxUl}>{list}</ul>
      </div>
    </div>
  );
}

function Attachment(props) {
  const {
    remove,
    type,
    addition,
  } = props;

  const additionStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '50px',
    
  };
  switch (type) {
    case 'audio':
      additionStyle.backgroundImage = 'url(https://image.flaticon.com/icons/svg/117/117114.svg)';
      break;
    case 'image':
      additionStyle.backgroundImage = `url(${addition.path})`;
      break;
    case 'geolocation':
      additionStyle.backgroundImage = 'url(https://image.flaticon.com/icons/svg/854/854878.svg)';
      break;
    default:
      break;
  }

  return (
    <li>
      <div onClick={remove} className={styles.remove}>
        x
      </div>
      <div style={additionStyle} className={styles.image} />
    </li>
  );
}

function SendButton(props) {
  const {
    submit,
    record,
    cancel,
    type,
  } = props;

  let content = null;

  switch (type) {
    case 'mic':
      content = <div
        onClick={record}
        className={`${styles.inputButton} ${styles.micButton}`}
      />;
      break;
    case 'send':
      content = <div
        onClick={submit}
        className={`${styles.inputButton} ${styles.sendButton}`}
      />;
      break;
    case 'cancel':
      content = <div
        onClick={cancel}
        className={`${styles.inputButton} ${styles.cancelButton}`}
      />;
      break;
    default:
      break;
  }

  return content;
}