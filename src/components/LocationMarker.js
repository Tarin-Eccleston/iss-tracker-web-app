import { Icon } from '@iconify/react'

const LocationMarker = ({lat, lng, onClick}) => {
  return (
    <div className="location-marker" onClick={onClick}>
        <Icon icon="mdi:space-station" className="location-icon" rotate={1}/>
    </div>
  )
}

export default LocationMarker