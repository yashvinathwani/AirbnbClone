import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { StarIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/yashvinathwani/cks36h4t66all17peyudbvqvh'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            aria-label='push-pin'
                            role='img'
                            className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocation(result)}
                        >
                            📌
                        </p>
                    </Marker>

                    {/* Popup */}
                    {selectedLocation.long == result.long ? (
                        <Popup
                            closeOnClick={true}
                            onClose={() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            <div className='w-80'>
                                {result.title}
                                <br />
                                <br />
                                {result.description}
                                <br />
                                <br />
                                <div className='flex items-center'>
                                    <StarIcon className='h-5 text-red-400' />{' '}
                                    {result.star}
                                </div>
                            </div>
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map;
