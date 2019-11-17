import React from 'react';
import styles from '../styles/MessageForm.module.css';
import { Header } from './Header';
import { FormInput } from './FormInput';
import { Message } from './Message';
import MyContext from './MyContext.Context';


export function MessageForm(props) {
    const { messages, details, style } = props;
  
    if (details === null) {
      return '';
    }
    const messagesToRender = [];
    messages.forEach((element) => {
      const messageItem = <Message inner={element} />;
      messagesToRender.push(messageItem);
    });
    return (
          <div style={style} className={styles.messageForm}>
              <MyContext.Consumer>
                  {(value) => (
                      <Header
                          details={details}
                          clickBack={value.closeDialogue.bind(value)}
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
                              messageHandler={value.messageHandler.bind(value)}
                          />
                      )}
                  </MyContext.Consumer>
              </div>
          </div>
    );
  }