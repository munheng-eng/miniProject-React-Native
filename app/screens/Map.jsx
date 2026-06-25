import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Map = () => {
    const router = useRouter();
    const [pickedLocation, setPickedLocation] = useState(null);

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setPickedLocation({
            latitude: latitude,
            longitude: longitude,
        });
        console.log("Selected Coordinates:", latitude, longitude);
    };

    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 3.1579,
                    longitude: 101.7116,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                onPress={handleMapPress}
            >
                {pickedLocation && (
                    <Marker coordinate={pickedLocation} title="Chosen Location" />
                )}
            </MapView>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});

export default Map;