import { View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Label } from '@react-navigation/elements';
import React, { useState, useEffect } from 'react'
import { globalStyle } from '../../assets/styles/global.style'
import { expenseStyle } from '../../assets/styles/expense.style'
import { getSingleExpense, createExpense, updateExpense } from '../../api/apiServiceExpenses';
import { inputForm } from '../../assets/styles/inputForm.style';
import { COLORS } from '../../constants/color'
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import FileFunc from '../../components/FileFunc';
import { requestAndGetFCMToken, triggerLocalNotification } from '../../utils/notification'

const ExpenseForm = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [title, setTitle] = useState('');
    const [attachment, setAttachment] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [pickedFileObject, setPickedFileObject] = useState(null);
    const [existingAttachmentUrl, setExistingAttachmentUrl] = useState('');

    const isEditing = !!id;

    useEffect(() => {
        const setupNotificationsAndFetchData = async () => {
            try {
                const token = await requestAndGetFCMToken();

                if (token) {
                    // Just want to show it incase expired or what!!!!!!
                    console.log('ACTIVE FCM TOKEN:', token);
                }
            } catch (err) {
                console.log('Notification setup initialization error:', err);
            }

            if (isEditing) {
                try {
                    setLoading(true);
                    const response = await getSingleExpense(id);
                    const expenseData = response.expense;

                    if (expenseData) {
                        setTitle(expenseData.title);
                        setAmount(expenseData.amount?.toString() || '');
                        setAttachment(expenseData.attachment || '');
                        setDescription(expenseData.description || '');
                        setExistingAttachmentUrl(expenseData.attachment || '');
                    }
                } catch (error) {
                    console.error("Could not load expense data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        setupNotificationsAndFetchData();
    }, [id]);

    const handleFileChange = (fileDetails) => {
        setPickedFileObject(fileDetails);
    };

    const handleSubmit = async () => {
        let errors = [];

        if (!title || !title.trim()) {
            errors.push("- Title is required.");
        }

        if (!amount || !amount.trim()) {
            errors.push("- Amount is required.");
        } else {
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                errors.push("- Amount must be a valid number greater than 0.");
            }
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
        formData.append('amount', String(parseFloat(amount)));
        formData.append('description', (description || '').trim());
        formData.append('date', new Date().toISOString().split('T')[0]);

        if (pickedFileObject && pickedFileObject.uri) {
            formData.append('attachment', pickedFileObject.uri);
        } else if (existingAttachmentUrl) {
            formData.append('attachment', existingAttachmentUrl);
        } else {
            formData.append('attachment', '');
        }

        try {
            Keyboard.dismiss();
            setSubmitting(true);

            if (isEditing) {
                const updatePayload = {
                    title: title.trim(),
                    amount: String(parseFloat(amount)),
                    description: (description || '').trim(),
                    date: new Date().toISOString().split('T')[0],
                    attachment: pickedFileObject && pickedFileObject.uri
                        ? pickedFileObject.uri
                        : existingAttachmentUrl || ''
                };

                await updateExpense(id, updatePayload);
                await triggerLocalNotification(
                    "💵💵💵 Expense Updated",
                    `Successfully updated modifications for "${title.trim()}".`
                );
                Alert.alert("Success", "Expense updated successfully!", [
                    { text: "OK", onPress: () => router.back() }
                ]);
            } else {
                await createExpense(formData);
                Alert.alert("Success", "Expense saved successfully!", [
                    { text: "OK", onPress: () => router.back() }
                ]);
            }
        } catch (error) {
            const serverErrorMessage = error.response?.data?.message || "Something went wrong while saving.";
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView>
                    <View style={globalStyle.bodyFormContainer}>
                        <View style={globalStyle.backButtonContainer}>
                            <TouchableOpacity style={globalStyle.backButton} onPress={() => router.back()}>
                                <Ionicons name="arrow-back" style={globalStyle.actionStyle} />
                            </TouchableOpacity>
                            <Text style={globalStyle.backButtonText}>Back</Text>
                        </View>
                        <Text style={globalStyle.title}>Expense</Text>
                        <View>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Title</Label>
                                <TextInput
                                    placeholder="Expense Title"
                                    placeholderTextColor={COLORS.faded}
                                    value={title}
                                    onChangeText={setTitle}
                                    style={inputForm.inputFieldContainer}
                                />
                            </View>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Amount (RM)</Label>
                                <TextInput
                                    placeholder="RM 00.00"
                                    placeholderTextColor={COLORS.faded}
                                    value={amount}
                                    onChangeText={setAmount}
                                    style={inputForm.inputFieldContainer}
                                    keyboardType='decimal-pad'
                                />
                            </View>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Attachment</Label>
                                <FileFunc
                                    onFilePicked={handleFileChange}
                                    selectedFile={pickedFileObject}
                                    existingAttachment={existingAttachmentUrl}
                                />
                            </View>
                            <View style={inputForm.inputField}>
                                <Label style={inputForm.inputFieldLabel}>Description</Label>
                                <TextInput
                                    placeholder="Description Here ...."
                                    placeholderTextColor={COLORS.faded}
                                    value={description}
                                    onChangeText={setDescription}
                                    style={[inputForm.inputFieldContainer, inputForm.multilineInput]}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                            </View>
                            <TouchableOpacity
                                style={[inputForm.authButton, submitting && { opacity: 0.6 }]}
                                onPress={handleSubmit}
                                disabled={submitting}
                            >
                                {/*
                                {submitting ? (
                                    <ActivityIndicator size="medium" color={COLORS.primary} animating={true}/>
                                ) : (
                                    <Text style={inputForm.authButtonText}>{isEditing ? 'U P D A T E' : 'S A V E'}</Text>
                                )}
                                */}
                                <Text style={inputForm.authButtonText}>{isEditing ? 'U P D A T E' : 'S A V E'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default ExpenseForm