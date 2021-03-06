import React from 'react'
import MapGL, { GeolocateControl, NavigationControl, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'

class PlacesMap extends React.Component {
  constructor() {
    super()

    this.state = { 
      places: null,
      postcodes: null,
      // searchTerm: '',

      viewport: {
        latitude: 51.5176,
        longitude: -0.1145,
        zoom: 11
      },
      showPopup: true
    }
  }


  componentDidMount() {
    axios.get('api/places')
      .then(res => {
        this.setState({ places: res.data })
        this.mapPostcodes()
      })
      .catch(err => console.log(err))
  }


  mapPostcodes() {
    const postcodes = this.state.places.map(place => place.postcode.replace(' ', ''))
    axios.post('https://api.postcodes.io/postcodes/', { postcodes } )
      .then(res => this.setState({ postcodes: res.data.result }))
      .catch(err => console.log(err))
  }
  
  render() {

    const geolocateStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      margin: 10
    }

    if (!this.state.places) return null
    if (!this.state.postcodes) return null
    const places = this.state.places
    const postcodes = this.state.postcodes
    // console.log(places)
    // console.log(this.state.postcodes)
    return (
      <main className='map'>
        <div className='mapArea'>
          <MapGL
            mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            height={'77vh'}
            width={'95vw'}
            mapStyle="mapbox://styles/mapbox/light-v10"
            scrollZoom={true}
            minZoom={0}
            maxZoom={20}
            touchZoom={true}


            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}>

            <GeolocateControl 
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              style={geolocateStyle}
            />

            <div>

              {postcodes.map((postcode, i) => (
                <div key={i}>
                  {<Popup

                    latitude={postcode.result.latitude}
                    longitude={postcode.result.longitude}
                    closeButton={false}
                    closeOnClick={true}
                    tipSize={12}
                    sortByDepth={true}
                    anchor="bottom" >


                    {places.map(place =>
                      <div key={place.id}>
                        {place.postcode.replace(' ', '') === postcode.query ? <Link to={`/places/${place.id}`}>
                          {place.name} ❣️ {place.postcode} </Link> : null}

                      </div>)}

                  </Popup>}

                </div>
              ))}

            </div>
            <div style={{ position: 'absolute', right: 0 }}>
              <NavigationControl />
            </div>
          </MapGL>
        </div>
        
      </main>
    )
  }
}

export default PlacesMap
