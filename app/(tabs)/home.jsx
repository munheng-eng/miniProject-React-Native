import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native';
import { getUser, logout } from '../../api/apiServiceAuth';
import { globalStyle } from '../../assets/styles/global.style';
import { homeStyle } from '../../assets/styles/home.style';
import { COLORS } from '../../constants/color';

const home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await logout();
    Alert.alert('Logged out', 'You have been logged out.');
    router.replace("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUser();
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log('User unauthenticated. Redirecting to login...');
      router.replace("/screens/LoginScreen");
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
    <View style={globalStyle.container}>
      <Text style={globalStyle.title}>Welcome, {user?.name || 'Guest'}!</Text>
      <Text style={globalStyle.subTitle}>Email: {user?.email}</Text>
      <TouchableOpacity style={homeStyle.floatingButtonContainer} onPress={handleLogout}>
        <Ionicons name="exit" style={homeStyle.actionStyle} />
      </TouchableOpacity>

    </View>
  )
}

export default home