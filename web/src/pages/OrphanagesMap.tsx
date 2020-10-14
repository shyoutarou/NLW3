import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mapMakerImg from '../images/marker.svg'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/pages/orphanagesMap.css'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

const OrphanagesMap = () => {

    interface IOrphanage {
        id: number
        latitude: number
        longitude: number
        name: string
    }

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

    useEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data) 
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMakerImg} alt="marker"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita</p>
                </header>

                <footer>
                    <strong>Rio do sul</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>

            <Map center={[-3.7327,-38.5270]} zoom={15} style={{ width: '100%', height: '100%', zIndex: 0 }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {orphanages.map(orphanage => {
                    return (
                        <Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanage/${orphanage.id}`}>
                                    <FiArrowRight size={20} color='white' />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap