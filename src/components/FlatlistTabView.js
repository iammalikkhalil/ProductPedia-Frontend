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
  const routesArray = [
    {
      key: 'local',
      title: 'Paksitani',
      params: {
        data: paramsData.data.local,
      },
    },
    {
      key: 'international',
      title: 'International',
      params: {
        data: paramsData.data.international,
      },
    },
  ];

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
