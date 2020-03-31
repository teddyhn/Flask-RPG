import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Splash from './components/splash'
import World from './components/world'
import axios from 'axios'

import './index.css'
import { BE_URL } from './config/constants'

function App(props) {
  const [validToken, setValidToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const token = localStorage.getItem("token")

  const checkValidToken = () => {
    axios.get(BE_URL + 'api/adv/init/', {
      headers: {
          Authorization: 'Token ' + token
      }
    }).then(res => {
      setValidToken(true)
      setIsLoading(false)
    }).catch(err => {
      setValidToken(false)
      localStorage.removeItem("token")
      setIsLoading(false)
    })
  }

  useEffect(() => {
    checkValidToken();
  }, [props.load])

  return (
    <>
      {isLoading ? null :
        <div
          style={{
            display: 'flex',
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(41, 38, 52)'
          }}
        >
          {validToken ? <World /> : <Splash />}
        </div>
      }
    </>
  );
}

function mapStateToProps(state) {
  return {
    ...state.world
  };
}

export default connect(mapStateToProps)(App);
