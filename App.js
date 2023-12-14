import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {
  GetCategories,
  GetCompanies,
  GetCountries,
} from './src/redux/actions/Action';

const Stack = createNativeStackNavigator();
import Dashboard from './src/screens/Dashboard';
import Explore from './src/screens/Explore';
import Splash from './src/screens/Splash';
import LoginUser from './src/screens/LoginUser';
import AddCompany from './src/screens/AddCompany';
import AddCountry from './src/screens/AddCountry';
import AddCategory from './src/screens/AddCategory';
import AddProduct from './src/screens/AddProduct';
import AddFeedback from './src/screens/AddFeedback';
import Dropdown from './src/components/Dropdown';
import ShowFeedback from './src/screens/ShowFeedback';
import FeedbackCard from './src/components/FeedbackCard';
import ProductModel from './src/models/FeedbackModel';
import FeedbackModel from './src/models/FeedbackModel';
import FlatlistTabView from './src/components/FlatlistTabView';
import Flatlist from './src/components/Flatlist';
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
    dispatch(GetCompanies());
    dispatch(GetCountries());
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="FlatlistTabView" component={FlatlistTabView} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="Flatlist" component={Flatlist} />
        <Stack.Screen name="ShowFeedback" component={ShowFeedback} />
        <Stack.Screen name="AddFeedback" component={AddFeedback} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        <Stack.Screen name="AddCountry" component={AddCountry} />
        <Stack.Screen name="AddCompany" component={AddCompany} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="LoginUser" component={LoginUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
