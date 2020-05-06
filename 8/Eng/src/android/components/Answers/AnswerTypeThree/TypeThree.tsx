import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import styles from './styles';
import Sound from 'react-native-sound';
const WIDTH = Dimensions.get('window').width;

const TypeThree = (props: { content?: any; lessonInfo?: any;
   setNextQuestion?: any; id?: any; heart?: any; setHeart?: any }) => {

  const { content, lessonInfo, setNextQuestion, id, heart, setHeart } = props;
  const database = firebase.database();
  const result = database.ref('/topic_detail/' +
    lessonInfo.topicName + '/test_bank/' + lessonInfo.lessonName +
    '/results/' + content.id);
  const [colorAnswerA, setColorAnswerA] = useState('white');
  const [colorAnswerB, setColorAnswerB] = useState('white');
  const [colorAnswerC, setColorAnswerC] = useState('white');
  const [colorAnswerD, setColorAnswerD] = useState('white');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setColorAnswerA('white');
    setColorAnswerB('white');
    setColorAnswerC('white');
    setColorAnswerD('white');
    setDisabled(false);
    setNextQuestion(false);
  }, [id])

  function onPress(selected = 'a') {
    result.on('value', function (snapshot: any) {
      if (selected == snapshot.val().text) {
        // xử lý khi chọn đúng 
        if (selected == "a") {
          setColorAnswerA('#81C784');
        } else if (selected == "b") {
          setColorAnswerB('#81C784');
        } else if (selected == "c") {
          setColorAnswerC('#81C784');
        } else if (selected == "d") {
          setColorAnswerD('#81C784');
        }
      }
      else {
        // xử lý khi chọn sai
        console.log('False');
        // đáp án sai tô màu đỏ
        if (selected == "a") {
          setColorAnswerA('#F44336')
        } else if (selected == "b") {
          setColorAnswerB('#F44336')
        } else if (selected == "c") {
          setColorAnswerC('#F44336')
        } else if (selected == "d") {
          setColorAnswerD('#F44336')
        }
        // đáp án đúng tô màu xanh
        if (snapshot.val().text == "a") {
          setColorAnswerA('#81C784')
        } else if (snapshot.val().text == "b") {
          setColorAnswerB('#81C784')
        } else if (snapshot.val().text == "c") {
          setColorAnswerC('#81C784')
        } else if (snapshot.val().text == "d") {
          setColorAnswerD('#81C784')
        }
        setHeart(heart-1)
      }
      setDisabled(true);
      const speaker = new Sound(snapshot.val().void_uri, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        setTimeout(() => {
          speaker.release();
          setNextQuestion(true);
        }, speaker.getDuration() * 1000)
        speaker.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      })
    })
  }

  return (
    <View style={{ flexDirection: 'column', alignItems: "center" }}>
      <View style={[styles.btn]}>
        <Button
          title={content.content_a}
          type="clear"
          onPress={() => onPress('a')}
          disabled={disabled}
          buttonStyle={[styles.button, { backgroundColor: colorAnswerA, width: WIDTH - 10 }]}
          titleStyle={styles.text}
        />
      </View>
      <View style={[styles.btn]}>
        <Button
          title={content.content_b}
          type="clear"
          onPress={() => onPress('b')}
          disabled={disabled}
          buttonStyle={[styles.button, { backgroundColor: colorAnswerB, width: WIDTH - 10 }]}
          titleStyle={styles.text}
        />
      </View>
      <View style={[styles.btn]}>
        <Button
          title={content.content_c}
          type="clear"
          onPress={() => onPress('c')}
          disabled={disabled}
          buttonStyle={[styles.button, { backgroundColor: colorAnswerC, width: WIDTH - 10 }]}
          titleStyle={styles.text}
        />

      </View>
      <View style={[styles.btn]}>
        <Button
          title={content.content_d}
          type="clear"
          onPress={() => onPress('d')}
          disabled={disabled}
          buttonStyle={[styles.button, { backgroundColor: colorAnswerD, width: WIDTH - 10 }]}
          titleStyle={styles.text}
        />
      </View>
    </View>
  )
}

export default TypeThree; 