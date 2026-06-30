import { TextInput, View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, AppState } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Label } from '@react-navigation/elements';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, reverseGeocodeAsync } from 'expo-location'
import { COLORS } from '../constants/color'
import { mapStyle } from '../assets/styles/map.style'
import { inputForm } from '../assets/styles/inputForm.style'
import MapView, { Marker } from 'react-native-maps';

const MapFunc = ({ onLocationPicked, initialLocation, isViewing }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const [addressText, setAddressText] = useState("No location picked yet.");
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const isFetchingLocation = useRef(false);

    useEffect(() => {
        if (initialLocation && initialLocation.latitude) {
            const coords = {
                latitude: parseFloat(initialLocation.latitude),
                longitude: parseFloat(initialLocation.longitude),
            };
            setPickedLocation({
                ...coords,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
            if (initialLocation.address) {
                setAddressText(initialLocation.address);
            }
        }
    }, [initialLocation]);

    useEffect(() => {
        if (isViewing) return;

        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active' && locationPermissionInformation?.granted && !pickedLocation) {
                getLocationHandler();
            }
        });
        return () => subscription.remove();
    }, [requestPermission, pickedLocation, isViewing]);

    useEffect(() => {
        if (!initialLocation && !isViewing) {
            getLocationHandler();
        }
    }, []);

    const verifyPermission = async () => {
        if (!locationPermissionInformation) return false;
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            if (locationPermissionInformation.canAskAgain) {
                const permissionResponse = await requestPermission();
                return permissionResponse.granted;
            }
            Alert.alert(
                'Location Permission Blocked',
                'Please enable map location tracking in system settings to continue.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            if (!pickedLocation) {
                updateLocationState({ latitude: 3.1579, longitude: 101.7116 });
                setAddressText("Location blocked by system permissions.");
            }
            return;
        }

        try {
            isFetchingLocation.current = true;
            setIsLoading(true);
            const location = await getCurrentPositionAsync({ accuracy: 4 });
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            await updateLocationState(coords);
        } catch (error) {
            if (!pickedLocation) {
                updateLocationState({ latitude: 3.1579, longitude: 101.7116 });
            }
            Alert.alert("GPS Offline", "Could not track satellite location automatically.");
        } finally {
            setIsLoading(false);
        }
    };

    const updateLocationState = async (coords) => {
        setPickedLocation({
            ...coords,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });

        let cleanAddress = "Unknown Address";

        try {
            const geocode = await reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            if (geocode && geocode.length > 0) {
                const place = geocode[0];
                cleanAddress = `${place.name || ''} ${place.street || ''}, ${place.district || place.city || ''}, ${place.region || ''}`.replace(/, ,/g, ',').trim();
                setAddressText(cleanAddress || "Address resolved.");
            } else {
                setAddressText(cleanAddress);
            }
        } catch (e) {
            setAddressText("Failed to resolve address coordinates text data.");
        }

        onLocationPicked({
            latitude: coords.latitude,
            longitude: coords.longitude,
            address: cleanAddress,
        });
    };

    const handleMapPress = (event) => {
        if (isViewing) return;
        const { latitude, longitude } = event.nativeEvent.coordinate;
        updateLocationState({ latitude, longitude });
    };

    if (!locationPermissionInformation) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View>
            <View style={inputForm.inputField}>
                <Label style={inputForm.inputFieldLabel}>Map View</Label>
            </View>
            <View style={mapStyle.mapContainer}>
                <MapView
                    style={mapStyle.map}
                    region={pickedLocation || {
                        latitude: 3.1579,
                        longitude: 101.7116,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    onPress={handleMapPress}
                    scrollEnabled={!isViewing}
                    zoomEnabled={!isViewing}
                >
                    {pickedLocation && (
                        <Marker coordinate={{ latitude: pickedLocation.latitude, longitude: pickedLocation.longitude }} title="Selected Location" />
                    )}
                </MapView>
                {isLoading && (
                    <View style={[mapStyle.loaderOverlay, { padding: 8, backgroundColor: 'white', borderRadius: 4 }]}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>Syncing Position...</Text>
                    </View>
                )}
            </View>

            {!isViewing && (
                <View style={mapStyle.buttonRow}>
                    <TouchableOpacity style={mapStyle.actionButton} onPress={getLocationHandler}>
                        <Text style={mapStyle.btnText}>Recenter GPS</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={mapStyle.locationDetailContainer}>
                <View style={inputForm.halfInputFieldContainer}>
                    <View style={inputForm.halfInputField}>
                        <Label style={inputForm.inputFieldLabel}>Latitude</Label>
                        <TextInput
                            placeholder="Latitude text here..."
                            placeholderTextColor={COLORS.faded}
                            value={pickedLocation?.latitude?.toFixed(5)}
                            style={inputForm.inputFieldContainer}
                            readOnly={true}
                        />
                    </View>
                    <View style={inputForm.halfInputField}>
                        <Label style={inputForm.inputFieldLabel}>Longitude</Label>
                        <TextInput
                            placeholder="Longitude text here..."
                            placeholderTextColor={COLORS.faded}
                            value={pickedLocation?.longitude?.toFixed(5)}
                            style={inputForm.inputFieldContainer}
                            readOnly={true}
                        />
                    </View>
                </View>
                <View style={inputForm.inputField}>
                    <Label style={inputForm.inputFieldLabel}>EXACT ADDRESS:</Label>
                    <TextInput
                        placeholder="Address text here..."
                        placeholderTextColor={COLORS.faded}
                        value={addressText}
                        style={[inputForm.inputFieldContainer, inputForm.multilineInput]}
                        multiline={true}
                        numberOfLines={5}
                        readOnly={true}
                    />
                </View>
            </View>
        </View>
    );
};

export default MapFunc;