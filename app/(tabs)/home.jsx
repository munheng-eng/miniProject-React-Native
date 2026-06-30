import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { getUser, logout } from '../../api/apiServiceAuth';
import { globalStyle } from '../../assets/styles/global.style';
import { homeStyle } from '../../assets/styles/home.style';
import { COLORS } from '../../constants/color';
import { useScreenTheme } from '../../components/SafeScreen';
import { getExpenses } from '../../api/apiServiceExpenses';
import { getPlaces } from '../../api/apiServicePlaces';

const home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setBgColor, setStatusStyle } = useScreenTheme();

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalPlaces, setTotalPlaces] = useState(0);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.log('Logout API failed, continuing with local redirect...', error);
    } finally {
      Alert.alert('Logged out', 'You have been logged out.');
      router.replace("/");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setBgColor(COLORS.primary);
      setStatusStyle('light-content');

      fetchDashboardData();

      return () => {
        setBgColor(COLORS.background);
        setStatusStyle('dark-content');
      };
    }, [setBgColor, setStatusStyle])
  );

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userData = await getUser();
      if (userData && userData.user) {
        setUser(userData.user);
      }
      const expensesData = await getExpenses();
      const expensesList = expensesData?.data || [];
      const sum = expensesList.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      setTotalExpenses(sum);

      const placesData = await getPlaces();
      const placesList = Array.isArray(placesData) ? placesData : [];
      setTotalPlaces(placesList.length);

    } catch (error) {
      console.log('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyle.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={homeStyle.headerContainer}>
        <View>
          <Text style={homeStyle.title}>Welcome, {user?.name || 'Guest'}!</Text>
          <Text style={homeStyle.subTitle}>Email: {user?.email}</Text>
        </View>
        <TouchableOpacity style={homeStyle.floatingButtonContainer} onPress={handleLogout}>
          <Ionicons name="exit" style={homeStyle.actionStyle} />
        </TouchableOpacity>
      </View>
      <View style={homeStyle.allCard}>
        <View style={homeStyle.firstCard}>
          <View style={homeStyle.cardContent}>
            <Text style={homeStyle.cardTitleFirst}>{user?.name || 'Guest'} Pocket Summary 🪧</Text>
          </View>
        </View>
        <View style={homeStyle.middleLayer}>
          <View style={homeStyle.secondCard}>
            <View style={homeStyle.cardContent}>
              <Text style={homeStyle.cardTitleSecond}>Total Expense 💵</Text>
              <Text style={homeStyle.cardTitleSecond}>RM {totalExpenses.toFixed(2)}</Text>
            </View>
          </View>
          <View style={homeStyle.thirdCard}>
            <View style={homeStyle.cardContent}>
              <Text style={homeStyle.cardTitleFirst}>Places 🗺️</Text>
              <Text style={homeStyle.cardTitleFirst}>{totalPlaces}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default home