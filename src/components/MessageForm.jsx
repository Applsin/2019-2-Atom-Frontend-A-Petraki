import React from 'react';
import styles from '../styles/MessageForm.module.css';
import { ChatHeader } from './ChatHeader';
import { FormInput } from './FormInput';
import { MessageItem } from './MessageItem';
import MyContext from './MyContext.Context';

export function MessageForm(props) {
    const { messages, details, style } = props;
    const [dragActive, setDragActive] = React.useState(false);
    const [dragFiles, setDragFiles] = React.useState(null);
  
    const dragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(true);
    };
  
    const dragLeave = () => {
      setDragActive(false);
    };
  
    const drop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragActive(false);
      setDragFiles(event.dataTransfer.files[0]);
    };
  
    if (details === null) {
      return '';
    }
    const messagesToRender = [];
    messages.forEach((element) => {
      const messageItem = <MessageItem inner={element} />;
      messagesToRender.push(messageItem);
    });
    return (
          <div
              onDrop={drop}
              onDragOver={dragOver}
              onDragLeave={dragLeave}
              style={style}
              className={styles.messageForm}>
              <input className={`${styles.dragNDropArea} ${dragActive && styles.activeZone}`} type="file" accept="image/*">
                  {/* <div className={styles.dragNDropImage} /> */}
              </input>
              <MyContext.Consumer>
                  {(value) => (
                      <ChatHeader
                          details={details}
                          clickBack={value.closeDialogue.bind(value, 'MessageForm')}
                      />
                  )}
              </MyContext.Consumer>
              <div className={styles.chat}>
                  <div className={styles.messagesList}>
                      {messagesToRender}
                  </div>
              </div>
  
              <div className={styles.inputForm}>
                  <MyContext.Consumer>
                      {(value) => (
                          <FormInput
                              requireRecorder={value.requireRecorder.bind(value)}
                              mediaRecorder={value.state.mediaRecorder}
                              messageHandler={value.messageHandler.bind(value)}
                              dragFiles={[dragFiles, setDragFiles]}
                          />
                      )}
                  </MyContext.Consumer>
              </div>
          </div>
    );
  }