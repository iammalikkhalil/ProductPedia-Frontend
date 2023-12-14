import React, {useState, useEffect} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TabViewLocalComponent from './TabViewLocalComponent';
import TabViewInternationalComponent from './TabViewInternationalComponent';
import Colors from '../assets/Colors';

const renderScene = ({route}) => {
  switch (route.key) {
    case 'local':
      return <TabViewLocalComponent params={route.params} />;
    case 'international':
      return <TabViewInternationalComponent params={route.params} />;
    case 'no':
      return <></>;
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: Colors.secondaryBgColor}}
    labelStyle={{color: 'white', fontWeight: 'bold'}}
  />
);

export default function FlatlistTabView({paramsData}) {
  let Llen = paramsData.data.local;
  let Ilen = paramsData.data.international;
  if (Llen == undefined || Ilen == undefined) {
    Llen = 0;
    Ilen = 0;
  } else {
    if (Llen.length == 0) Llen = 0;
    else Llen = 1;

    if (Ilen.length == 0) Ilen = 0;
    else Ilen = 1;
  }
  const routesArray = [];

  if (Llen != 0) {
    routesArray.push({
      key: 'local',
      title: 'Local',
      params: {
        data: paramsData.data.local,
        setModalVisible: paramsData.setModalVisible,
        setModalData: paramsData.setModalData,
      },
    });
  }
  if (Ilen != 0) {
    routesArray.push({
      key: 'international',
      title: 'International',
      params: {
        data: paramsData.data.international,
        setModalVisible: paramsData.setModalVisible,
        setModalData: paramsData.setModalData,
      },
    });
  }

  if (Ilen == 0 && Llen == 0) {
    routesArray.push({key: 'no', title: 'No item Found'});
  }

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(routesArray);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}
