import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import mapMarker from '../images/map-marker.png'
import { Feather } from '@expo/vector-icons'
import { useFonts, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import api from '../services/api'


const OrphanagesMap = () => {

    interface IOrphanage {
        id: number
        name: string
        latitude: number
        longitude: number
    }

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

    const { navigate } = useNavigation()

    useFocusEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data)
        })
    })

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
                latitude: -27.2092052,
                longitude: -49.6401092,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            }}>
                {orphanages.map(({ id, latitude, longitude, name }) => {
                    return (
                        <Marker key={id} calloutAnchor={{
                        x: 2.7,
                        y: 0.8
                        }} icon={mapMarker} coordinate={{ latitude, longitude }}>
                        <Callout onPress={() => navigate('details', { id })} tooltip>
                            <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{name}</Text>
                            </View>
                        </Callout>
                        </Marker>
                    )
                })}
            </MapView>

        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

            <RectButton onPress={() => navigate('selectposition')} style={styles.createOrphanageButton}>
                <Feather name='plus' size={20} color='#fff' />
            </RectButton>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center'
    },
    calloutText: {
        color: "#0089a5",
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 46,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,

    },
    footerText: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrphanagesMap