import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const homeStyle = StyleSheet.create({
    bodyContainer: {
        position: 'relative',
    },

    floatingButtonContainer: {
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 100,
    }, 

    actionStyle: {
        color: COLORS.primary,
        fontSize: 30,
    },

    headerContainer: {
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 70,
        paddingBottom: 30,
        paddingTop: 20,
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        color: COLORS.card,
        paddingBottom: 10,
        fontWeight: 'bold',
    },

    subTitle: {
        fontSize: 15,
        color: COLORS.card,
        paddingBottom: 10,
    },

    cardContent: {
        padding: 25,
    },

    allCard: {
        padding: 15,
    },

    middleLayer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    
    firstCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        height: 250,
    },

    secondCard: {
        backgroundColor: '#dfdcdc',
        borderRadius: 20,
        flex: 1.6,
        height: 150,
    },

    thirdCard: {
        backgroundColor: COLORS.shadow,
        borderRadius: 20,
        flex: 1,
        height: 150,
    },

    cardTitleFirst: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
    },

    cardTitleSecond: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.shadow,
    },
});