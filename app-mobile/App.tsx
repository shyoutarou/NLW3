import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import mapMarker from './src/images/map-marker.png'
import { Feather } from '@expo/vector-icons'

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
        latitude: -27.2092052,
        longitude: -49.6401092,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}>
        <Marker calloutAnchor={{
          x: 2.7,
          y: 0.8
        }} icon={mapMarker} coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}>
          <Callout onPress={() => {}} tooltip>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das molieres</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orfanatos encontrados</Text>

        <TouchableOpacity onPress={() => {}} style={styles.createOrphanageButton}>
          <Feather name='plus' size={20} color='#fff' />
        </TouchableOpacity>
      </View>
    </View>
  );
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
    fontSize: 14
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
    color: '#8fa7b3'
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
