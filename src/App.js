import React, { Component } from 'react'
import {BrowserRouter, Route,NavLink} from 'react-router-dom'

import Home from '@/pages/home'
import Post from '@/pages/post'
import Tag from '@/pages/tag'

import './style'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <NavLink  exact to='/'> 主页</NavLink>
                <NavLink  exact to='/tag'>tag</NavLink>
                <NavLink  exact to='/post'>post</NavLink>
                <Route exact path='/' component={Home}></Route>
                <Route exact path='/tag' component={Tag}></Route>
                <Route exact path='/post' component={Post}></Route>
            </div>
        </BrowserRouter>
        )
    }
}

export default App