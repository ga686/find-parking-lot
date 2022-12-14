import React, {Component} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {connect} from 'react-redux'
import {getParks,getAvailable} from './actions/mapActions'
import './Basic.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/Navbar"
import MyMap from './components/MyMap'

//汽車頁面
function Car(props) {
  return (
    <main className='main-view'>
      <div className='row mx-0'>
        <Navbar parks={props.parks} paramsId = {'car'} available={props.available} loading={props.loading}></Navbar>
        <MyMap paramsId = {'car'} loading={props.loading}></MyMap>
      </div>
    </main>
  )
}
//機車頁面
function Moto(props) {
  return (
    <main className='main-view'>
      <div className='row mx-0'>
        <Navbar parks={props.parks} paramsId = {'moto'} available={props.available} loading={props.loading}></Navbar>
        <MyMap paramsId = {'moto'} loading={props.loading}></MyMap>
      </div>
    </main>
  )
}

class App extends Component {

  // fetch 車位資料  
  componentDidMount(){  
    if(this.props.getParks){
      this.props.getParks()
    }
    if(this.props.getAvailable){
      this.props.getAvailable()
    }
  }

  render(){
    const {parks} = this.props.parks
    const {available} = this.props.available

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/car" replace />}/>
        <Route path="/car" element={<Car parks = {parks} available = {available}/>} />
        <Route path="/moto" element={<Moto parks = {parks} available = {available}/>}/>
      </Routes>
    )
  }
}

const mapStateToProps  = (state) => ({parks:state.parks,available: state.available})

export default connect(mapStateToProps, {getParks,getAvailable})(App)
