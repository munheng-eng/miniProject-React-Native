import { COLORS } from '../../constants/color'
import { StyleSheet } from 'react-native';

export const placeStyle = StyleSheet.create({
    bodyContainer: {
        position: 'relative',
        padding: 15,
        flex: 1,
    },
    
    placeTile: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },

    textContainer: {
        flexWrap: 'wrap',
        flexShrink: 1,
    },

    emptyPlacesText: {
        textAlign: 'center',
        padding: 20,
        color: '#999'
    },

    placeIcon: {
        fontSize: 20, 
        marginRight: 10
    },
    
    placeTitle: {
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    placeSubTitle: {
        color: '#666', 
        fontSize: 12,  
    },

    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: COLORS.card,
    },

    image: {
        height: '100%',
        width: '100%',
    },

    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: COLORS.card,
    },

    locationAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cameraButton: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },

    textPattern: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: 'bold'
    },

    iconPattern: {
        color: COLORS.primary,
        fontSize: 25,
    },
})