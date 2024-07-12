import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GoogleMapsScriptLoader from './GoogleMapsScriptLoader';

const CreateTrip = () => {
  const [address, setAddress] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng); // Use latLng as needed
  };

  return (
    <div className="my-8">
      <GoogleMapsScriptLoader onLoad={handleScriptLoad} />
      <h2 className="main-title">Create Trip</h2>
      <form className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Destination</label>
          {scriptLoaded ? (
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'mt-1 p-2 w-full border rounded',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          key={index}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTrip;
