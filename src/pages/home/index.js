import React from 'react'
import test from '../test.js'
import './index.scss'
import Logo from '../../static/logo.jpg'
const Home = () => {
    return (
        <div className='home-container'>
            我是主页
        <img src={Logo} />
        </div>
    )
}

export default Home