import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, FlatList } from 'react-native';
import { CardExtend } from '../../components/Card';
import { SettingButton } from '../../components/SettingButton';
import { StarButton } from '../../components/StarButton';
import firebase from 'firebase';
import styles from './styles';
import { Activity } from '../Utils/activity';

const BackgroudUrl = "../../../../images/logo3.png";

const ItemSeparator = () => {
  return (<View style={styles.separator}></View>)
}

const StartScreen = (props: { navigation: any }) => {
  const { navigation } = props;
  const [data, setData] = useState({});
  const database = firebase.database();
  const topics_fb = database.ref('/topics');

  useEffect(() => {
    topics_fb.on('value', function (snapshot: any) {
      setData(snapshot.val());
    });
  }, [])

  if (Object.keys(data).length == 0) {
    navigation.setOptions({headerTransparent: true, headerTitle: ""})
    return (
      <Activity />
    )
  }
  else {
    const topics: any = [];
    let index = 0; 
    for (let [key, value] of Object.entries(data)) {
      topics.push(value); 
      topics[index++].topic_Name = key
    }
    navigation.setOptions({
      headerTitleAlign: "center", 
      headerTransparent: true,
      headerTitleContainerStyle: { marginHorizontal: 20, marginTop: 20 },
      headerTitle: () => (<Image source={require(BackgroudUrl)}
        style={{ width: 120, height: 120 }}
      />), 
      headerLeftContainerStyle: { marginTop: 16, padding: 16 },
      headerLeft: () => {
        return (<SettingButton navigation={navigation} />);
      },
      headerRightContainerStyle: { marginTop: 16, padding: 16 },
      headerRight: () => {
        return (<StarButton navigation={navigation} />);
      }
    })
    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.listItems}
          data={topics}
          renderItem={({ item }) => {
            return (
              <CardExtend
                icon_top={item.icon_top}
                icon_type={item.icon_type}
                img_top={item.img_top}
                vn_meaning={item.vn_meaning}
                topic_name={item.topic_Name}
                navigation={navigation}
                key={item.topic_Name}
              />
            );
          }}
        />
      </SafeAreaView>
    )
  }
}

export default StartScreen