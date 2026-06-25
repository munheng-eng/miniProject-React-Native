import React from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'
import * as Sharing from 'expo-sharing'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/color';
import { fileStyle } from '../assets/styles/file.style';

const FileFunc = ({ onFilePicked, selectedFile, existingAttachment }) => {

    const pickDocumentHandler = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const pickedFile = result.assets[0];
                onFilePicked({
                    uri: pickedFile.uri,
                    name: pickedFile.name,
                    type: pickedFile.mimeType || 'application/octet-stream',
                });
            }
        } catch (error) {
            console.error("Error picking document:", error);
        }
    };

    const getCleanFileName = () => {
        if (selectedFile) return selectedFile.name;
        if (existingAttachment) return existingAttachment.split('/').pop();
        return "No file attached";
    };

    const handleOpenFile = async () => {
        const fileUri = selectedFile ? selectedFile.uri : existingAttachment;

        if (!fileUri) return;

        try {
            const isAvailable = await Sharing.isAvailableAsync();

            if (isAvailable) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert("Cannot Open File", "Sharing/Viewing files is not supported on this device layout.");
            }
        } catch (error) {
            console.error("Error opening file:", error);
            Alert.alert("Error", "Could not open or preview this document path.");
        }
    };

    return (
        <View style={fileStyle.container}>
            <TouchableOpacity
                style={fileStyle.pickerButton}
                onPress={pickDocumentHandler}
            >
                <Ionicons name="document-attach" size={20} color={COLORS.primary} />
                <Text style={fileStyle.buttonText}>Attachment: (Choose Document / PDF)</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleOpenFile}
                disabled={!selectedFile && !existingAttachment}
                activeOpacity={0.7}
            >
                <Text
                    style={[
                        fileStyle.fileNameText,
                        (selectedFile || existingAttachment) && fileStyle.activeFileText,
                        (selectedFile || existingAttachment) && { textDecorationLine: 'underline', color: COLORS.primary } // Optional styling to look clickable
                    ]}
                    numberOfLines={1}
                >
                    {getCleanFileName()}
                </Text>
            </TouchableOpacity>
        </View>
    );
}


export default FileFunc