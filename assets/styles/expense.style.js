import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const expenseStyle = StyleSheet.create({
    bodyContainer: {
        position: 'relative',
        padding: 15,
        flex: 1,
    },

    expenseTile: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textLight,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },

    tileTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 5,
    },

    tileSubtitle: {
        fontSize: 12,
        color: '#666',
    },

    tilePrice: {
        color: COLORS.textLight, 
        fontWeight: 'bold'
    },

    


});