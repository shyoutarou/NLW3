import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

export default function OrphanageData() {

  type RouteProps = {
    data: {
      position: {
        latitude: number
        longitude: number
      }
    }
  }

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<string[]>([])

  const { navigate } = useNavigation()

  const { params: { position: { latitude, longitude } } } = useRoute<RouteProp<RouteProps, 'data'>>()

  const handleCreateOrphanage = async () => {
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((image, index) => {
      data.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `${index}-${Date.now()}.jpg`
      } as unknown as Blob)
    })

    try {
      await api.post('/orphanages', data)
      navigate('map')
    } catch {

    }

  }

  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if(status !== 'granted') {
      return alert('precisamos do acesso a sua camera')
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if(result.cancelled) {
      return
    }

    const { uri } = result
    setImages([...images, uri])
  }

  const deleteImage = (removeIndex: number) => {
    const newImages = images.filter((image, index) => index !== removeIndex)
    setImages(newImages)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={t => setName(t)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput value={about} onChangeText={t => setAbout(t)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image, index) => {
          return (
            <View key={image} style={styles.imageContainer}>
              <Image source={{ uri: image }}
              style={styles.uploadedImage}>
              </Image>
              <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteImage}>
                <Feather name='x' size={20} color='black' />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput value={instructions} onChangeText={t => setInstructions(t)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput value={opening_hours} onChangeText={t => setOpeningHours(t)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch value={open_on_weekends} onValueChange={t => setOpenOnWeekends(t)}
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
    position: 'relative'
  },
  uploadedImagesContainer: {
    flexDirection: 'row'
  },
  deleteImage: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    right: 8,
    top: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
  }
})