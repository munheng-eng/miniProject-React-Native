import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { placeStyle } from '../assets/styles/place.style'
import { globalStyle } from '../assets/styles/global.style'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../constants/color'
import { router } from 'expo-router'
import { deletePlace } from '../api/apiServicePlaces'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const PlaceTile = ({ item, onDeleteSuccess }) => {

    const renderRightActions = () => {
        return (
            <TouchableOpacity onPress={handleDelete}>
                <View style={globalStyle.slideDeleteContainer}>
                    <Ionicons name="trash-outline" size={24} color={COLORS.card} />
                </View>
            </TouchableOpacity>
        );
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Place",
            `Are you sure you want to delete "${item.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deletePlace(item.id);
                            Alert.alert("Success", "Expense deleted successfully.");
                            if (onDeleteSuccess) {
                                onDeleteSuccess();
                            }
                        } catch (error) {
                            console.error("Error deleting expense:", error);
                            Alert.alert("Error", "Failed to delete the expense. Please try again.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
            <TouchableOpacity onPress={() => router.push(`/screens/PlaceForm?id=${item.id}`)}>
                <View style={placeStyle.placeTile}>
                    <Text style={placeStyle.placeIcon}>📍</Text>
                    <View>
                        <Text style={placeStyle.placeTitle}>{item.title || 'Place'}</Text>
                        <View style={placeStyle.textContainer}>
                            <Text style={placeStyle.placeSubTitle}>
                                {item.address || ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default PlaceTile