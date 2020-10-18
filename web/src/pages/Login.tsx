import React, { useState } from 'react'
import logoImg from '../images/marker.svg'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import '../styles/pages/login.css'

const Login = () => {

    const [check, setCheck] = useState(false)

    return (
        <div className="homeform-container">
            <div className="homeform-banner">
                <img width={110} src={logoImg} alt="logo"/>
                <h2 className="homeform-logo">happy</h2>
                <h2 className="homeform-city">Fortaleza</h2>
                <h2 className="homeform-state">Ceará</h2>
            </div>
            <div className="homeform-form">
                
                    <div className="homeform-back">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </div>
                

                <form className="homeform-form-container">
                    <h2 className="homeform-form-title">
                        Fazer login
                    </h2>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">E-mail</p>
                        <input className="homeform-input" type="text"/>
                    </div>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">Senha</p>
                        <input className="homeform-input" type="text"/>
                    </div>

                    <div className="homeform-options">
                        <div className="homeform-option-remember">
                            <div onClick={() => setCheck(!check)}
                            className={check ? "homeform-checkbox-active" : "homeform-checkbox"}>
                                <FiCheck size={18} color='white' />
                            </div>
                            <p>Lembrar-me</p>
                        </div>
                        <div className="homeform-forgot">
                            <p>Esqueci minha senha</p>
                        </div>
                    </div>

                    <button className="homeform-button">
                        <p>Entrar</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login