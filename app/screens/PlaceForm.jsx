import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Label } from '@react-navigation/elements';
import React, { useState, useEffect } from 'react'
import { globalStyle } from '../../assets/styles/global.style'
import { inputForm } from '../../assets/styles/inputForm.style';
import { COLORS } from '../../constants/color'
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import CameraFunc from '../../components/CameraFunc';
import MapFunc from '../../components/MapFunc';
import { createPlace, getSinglePlace } from '../../api/apiServicePlaces';

const PlaceForm = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [pickedImageUri, setPickedImageUri] = useState(null);
    const [locationData, setLocationData] = useState(null);

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [initialDetails, setInitialDetails] = useState({ image: null, location: null });

    const isViewing = !!id;

    useEffect(() => {
        if (isViewing) {
            const fetchPlaceDetails = async () => {
                try {
                    setLoading(true);
                    const response = await getSinglePlace(id);
                    const placeData = response.place || response;

                    if (placeData) {
                        setTitle(placeData.title || '');
                        setLocationData({
                            latitude: placeData.lat,
                            longitude: placeData.lng,
                            address: placeData.address
                        });

                        const fullImageUrl = placeData.image
                            ? `https://expenses-tracker-api-laravel.benova.com.my/storage/${placeData.image}`
                            : null;

                        setPickedImageUri(fullImageUrl);

                        setInitialDetails({
                            image: fullImageUrl,
                            location: {
                                latitude: placeData.lat,
                                longitude: placeData.lng,
                                address: placeData.address
                            }
                        });
                    }
                } catch (error) {
                    console.error("Could not load place details:", error);
                    Alert.alert("Error", "Failed to load place information.");
                } finally {
                    setLoading(false);
                }
            };
            fetchPlaceDetails();
        }
    }, [id]);

    const handleImageChange = (uri) => {
        setPickedImageUri(uri);
    };

    const handleLocationChange = (coordsWithAddress) => {
        setLocationData(coordsWithAddress);
    };

    const handleSubmit = async () => {
        let errors = [];

        if (!title || !title.trim()) {
            errors.push("- Title field is required.");
        }
        if (!locationData || !locationData.latitude) {
            errors.push("- Location coordinates pinpointing is required.");
        }

        if (errors.length > 0) {
            Alert.alert(
                "Validation Error",
                `Please fix the following problems:\n${errors.join("\n")}`
            );
            return;
        }

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('address', String(locationData.address || 'Auto-generated Address'));
        formData.append('lat', String(locationData.latitude));
        formData.append('lng', String(locationData.longitude));

        if (pickedImageUri && (pickedImageUri.startsWith('file://') || pickedImageUri.startsWith('content://'))) {
            const filename = pickedImageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;

            formData.append('image', {
                uri: pickedImageUri,
                name: filename,
                type: type,
            });
        }

        try {
            Keyboard.dismiss();
            setSubmitting(true);

            await createPlace(formData);
            Alert.alert("Success", "Place saved successfully!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            const serverErrorMessage = error.response?.data?.message || "Something went wrong while executing submission.";
            Alert.alert("Submission Failed", serverErrorMessage);

        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={globalStyle.activityIndicator}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <View style={globalStyle.bodyFormContainer}>
                <View style={globalStyle.backButtonContainer}>
                    <TouchableOpacity style={globalStyle.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" style={globalStyle.actionStyle} />
                    </TouchableOpacity>
                    <Text style={globalStyle.backButtonText}>Back</Text>
                </View>

                <Text style={globalStyle.title}>{isViewing ? 'View Place Details' : 'Add Place'}</Text>

                <View style={inputForm.inputField}>
                    <Label style={inputForm.inputFieldLabel}>Title</Label>
                    <TextInput
                        placeholder="Title input here ....."
                        placeholderTextColor={COLORS.faded}
                        value={title}
                        onChangeText={setTitle}
                        style={inputForm.inputFieldContainer}
                        readOnly={isViewing}
                    />
                </View>

                <View style={inputForm.inputField}>
                    <Label style={inputForm.inputFieldLabel}>Camera Image</Label>
                </View>

                <CameraFunc onImagePicked={handleImageChange} initialImage={pickedImageUri} isViewing={isViewing} />
                <MapFunc onLocationPicked={handleLocationChange} initialLocation={initialDetails.location} isViewing={isViewing} />

                {!isViewing && (
                    <TouchableOpacity
                        style={[inputForm.authButton, submitting && { opacity: 0.6 }]}
                        onPress={handleSubmit}
                        disabled={submitting}
                    >
                        <Text style={inputForm.authButtonText}>S A V E</Text>

                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>


    )
}

export default PlaceForm;