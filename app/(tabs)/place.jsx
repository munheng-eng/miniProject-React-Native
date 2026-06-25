import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { getPlaces } from '../../api/apiServicePlaces';
import { globalStyle } from '../../assets/styles/global.style';
import { placeStyle } from '../../assets/styles/place.style';
import PlaceTile from '../../components/PlaceTile';
import { COLORS } from '../../constants/color';
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const place = () => {
  const router = useRouter();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchPlaces();
    }, [])
  );

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const responseData = await getPlaces();
      if (responseData && Array.isArray(responseData)) {
        setPlaces(responseData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch data.');
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyle.activityIndicator}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading places...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={globalStyle.swipe}>
      <View style={placeStyle.bodyContainer}>
        <FlatList
          data={places}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => <PlaceTile item={item} onDeleteSuccess={fetchPlaces} />}
          ListEmptyComponent={() => (
            <Text style={placeStyle.emptyPlacesText}>
              No places found.
            </Text>
          )}
          ListHeaderComponent={
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={globalStyle.title}>Places</Text>
              <Text style={globalStyle.subTitle}>Your saved places.</Text>
            </ScrollView>
          }
        />
        <TouchableOpacity style={globalStyle.floatingButtonContainer} onPress={() => router.push('/screens/PlaceForm')}>
          <Ionicons name="add" style={globalStyle.actionStyle} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

export default place