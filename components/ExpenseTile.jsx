import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { expenseStyle } from '../assets/styles/expense.style'
import { globalStyle } from '../assets/styles/global.style'
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../constants/color'
import { deleteExpense } from '../api/apiServiceExpenses'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ExpenseTile = ({ item, onDeleteSuccess }) => {
    const router = useRouter();

    const handleSingleExpense = () => {
        router.push({
            pathname: '/screens/ExpenseForm',
            params: { id: item.id }
        });
    }
    const handleDelete = () => {
        Alert.alert(
            "Delete Expense",
            `Are you sure you want to delete "${item.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteExpense(item.id);
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
    const renderRightActions = () => {
        return (
            <TouchableOpacity onPress={handleDelete}>
                <View style={globalStyle.slideDeleteContainer}>
                    <Ionicons name="trash-outline" size={24} color={COLORS.card} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
            <TouchableOpacity onPress={handleSingleExpense}>
                <View style={expenseStyle.expenseTile}>
                    <View>
                        <Text style={expenseStyle.tileTitle}>{item.title}</Text>
                        <Text style={expenseStyle.tileSubtitle}>{item.description || 'Uncategorized'}</Text>
                    </View>
                    <Text style={expenseStyle.tilePrice}>
                        RM {item.amount || '0.00'}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default ExpenseTile