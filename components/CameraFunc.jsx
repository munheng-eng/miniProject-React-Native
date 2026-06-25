import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, Image, AppState } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { COLORS } from '../constants/color'
import { globalStyle } from '../assets/styles/global.style'
import { placeStyle } from '../assets/styles/place.style'
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system/legacy';
import * as MediaLibrary from 'expo-media-library'

const CameraFunc = ({ onImagePicked, initialImage, isViewing }) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (initialImage) {
            setPickedImage(initialImage);
        }
    }, [initialImage]);

    useEffect(() => {
        if (isViewing) return;

        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'active' && requestPermission) {
                const updatedPermission = await requestPermission();
                if (updatedPermission.granted) {
                    handleImageHandler();
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [requestPermission, isViewing]);

    const verifyPermission = async () => {
        if (!cameraPermissionInformation) {
            return false;
        }
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            if (cameraPermissionInformation.canAskAgain) {
                const permissionResponse = await requestPermission();
                return permissionResponse.granted;
            }
            Alert.alert(
                'Camera Permission Blocked',
                'Please enable camera access in your system settings to continue.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Open Settings', onPress: () => Linking.openSettings() }
                ]
            );
            return false;
        }
        return true;
    };

    const handleImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!image.canceled && image.assets && image.assets.length > 0) {
            const cacheUri = image.assets[0].uri;

            try {
                setIsSaving(true);

                const permanentDirectory = `${FileSystem.documentDirectory}saved_places/`;

                const dirInfo = await FileSystem.getInfoAsync(permanentDirectory);
                if (!dirInfo.exists) {
                    await FileSystem.makeDirectoryAsync(permanentDirectory, { intermediates: true });
                }

                const originalFilename = cacheUri.split('/').pop();
                const permanentLocalPath = `${permanentDirectory}place_${Date.now()}_${originalFilename}`;

                await FileSystem.copyAsync({
                    from: cacheUri,
                    to: permanentLocalPath
                });

                // See picture on device
                const mediaPermission = await MediaLibrary.requestPermissionsAsync(true); // Passing true requests write-only access

                if (mediaPermission.granted || mediaPermission.status === 'granted') {
                    await MediaLibrary.createAssetAsync(permanentLocalPath);
                    console.log("Success! Photo duplicated into the public device gallery.");
                }
                

                setPickedImage(permanentLocalPath);
                onImagePicked(permanentLocalPath);

                console.log("Photo permanently stored on local disk path at:", permanentLocalPath);

            } catch (error) {
                console.error("Local disk save sequence failed:", error);
                Alert.alert("Storage Error", "Failed to archive photo asset reference locally to device storage.");
            } finally {
                setIsSaving(false);
            }
        }

        {/*
        if (!image.canceled && image.assets && image.assets.length > 0) {
            const selectedUri = image.assets[0].uri;
            setPickedImage(selectedUri);
            onImagePicked(selectedUri);
        }
         */}
    }

    if (!cameraPermissionInformation) {
        return (
            <View style={globalStyle.activityIndicator}>
                <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
        );
    }

    let imagePreview = <Text style={placeStyle.textPattern}>No image taken yet</Text>;

    {/*
        if (pickedImage) {
        imagePreview = <Image style={placeStyle.image} source={{ uri: pickedImage }} />;
    }
         */}

    if (isSaving) {
        imagePreview = (
            <View style={{ alignItems: 'center', gap: 8 }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={placeStyle.textPattern}>Saving permanently to disk...</Text>
            </View>
        );
    } else if (pickedImage) {
        imagePreview = <Image style={placeStyle.image} source={{ uri: pickedImage }} />;
    }

    return (
        <View>
            <View style={placeStyle.imagePreview}>{imagePreview}</View>

            {!isViewing && (
                <TouchableOpacity onPress={handleImageHandler} style={placeStyle.cameraButton}>
                    <Text style={placeStyle.textPattern}>Open Camera</Text>
                    <Ionicons name="camera" style={placeStyle.iconPattern} />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default CameraFunc;