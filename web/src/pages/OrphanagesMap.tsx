import React from 'react'
import { Link } from 'react-router-dom'
import mapMakerImg from '../images/marker.svg'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanagesMap.css'

const OrphanagesMap = () => {
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap