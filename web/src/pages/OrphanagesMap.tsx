import React from 'react'
import { Link } from 'react-router-dom'
import mapMakerImg from '../images/marker.svg'
import { FiPlus } from 'react-icons/fi'
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

            <div></div>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap