import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { globalStyle } from '../../assets/styles/global.style'
import { expenseStyle } from '../../assets/styles/expense.style'
import { getExpenses } from '../../api/apiServiceExpenses';
import { COLORS } from '../../constants/color'
import ExpenseTile from '../../components/ExpenseTile'
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const expense = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    try {

      const responseData = await getExpenses();
      if (responseData && responseData.data) {
        const sortedExpenses = responseData.data.sort((a, b) => b.id - a.id);
        setExpenses(sortedExpenses);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login or fetch data. Check console.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  if (loading) {
    return (
      <View style={globalStyle.activityIndicator}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={globalStyle.swipe}>
      <View style={expenseStyle.bodyContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={expenses}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => <ExpenseTile item={item} onDeleteSuccess={fetchExpenses} />}
          ListEmptyComponent={() => (
            <Text style={globalStyle.emptyText}>
              No expenses found. Add your first expense!
            </Text>
          )}
          ListHeaderComponent={
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={globalStyle.title}>Track Your Expense Here</Text>
              <Text style={globalStyle.subTitle}>Your expense are here.</Text>
            </ScrollView>
          }
        />
        <TouchableOpacity style={globalStyle.floatingButtonContainer} onPress={() => router.push('../screens/ExpenseForm')}>
          <Ionicons name="add" style={globalStyle.actionStyle} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

export default expense