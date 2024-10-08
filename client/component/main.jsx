import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleA from '../handleActivity';
import deleteA from '../deleteActivity';
import handleSubmit from '../handleSubmit';
import resetEntryMain from '../resetEntryMain';
// import convertMiles from '../convertMiles';

export default function Main({
  activity,
  setActivity,
  skillLevel,
  setSkillLevel,
  city,
  setCity,
  zipCode,
  setZipCode,
  distance,
  setDistance,
  gender,
  setGender,
  allActivities,
  selectedA,
  setSelectedA,
  zipcodes,
  setZipcodes,
  // miles,
  // setMiles,
}) {
  const navigate = useNavigate();
  const availActivities = allActivities.filter(
    (a) => !selectedA.hasOwnProperty(a)
  );

  // const handleConversion = (e) => {
  //   const selectValue = e.target.value;
  //   setDistance(selectValue);
  //   const inMeter = convertMiles(selectValue);
  //   setMiles(inMeter);
  // };

  useEffect(() => {
    // const zipcodes = ['90042', '90036', '90028', '91205'];
    let map; // Declare map here

    const initMap = () => {
      //error handling, checking if google map script has been loaded
      if (
        typeof window.google === 'undefined' ||
        typeof window.google.maps === 'undefined'
      ) {
        console.error('Google Maps API not loaded');
        return;
      }

      // Initialize map with default center
      map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 34.0549, lng: -118.2426 },
      });

      //this is creating an instance of the Google Geocoder class from the
      //Google Map Javascipt API
      const geocoder = new window.google.maps.Geocoder();

      //adding marker
      //addMarker is invoked in the forEach, thus it has access to location variable
      const addMarker = (location, zipcode) => {
        //this is creating an instance of the Google Geocoder class from the
        //Goggle Map Javascript API, passing in an object that contains the
        //configeraion option for the marker
        const marker = new window.google.maps.Marker({
          //location is the lat and lng information
          position: location,
          //specify which map to add the marker in
          map: map,
        });

        //this is creating an instance of the Goggle infoWindow class from the
        //Google Map Javascipt API, passing in an object that contains the
        //configuration option for the info window
        const infoWindow = new window.google.maps.InfoWindow({
          //this content is whats being displayed in the info window
          content: `Zip Code: ${zipcode}`,
        });

        //adding an event listener, listen for click, to the marker object
        marker.addListener('click', () => {
          //this calls the open method of the infoWindow instance,
          //passing in map: which map this window should be displayed on
          //           marker: specify the anchor point of the info window
          infoWindow.open(map, marker);
        });
        addCircle(location);
      };

      const addCircle = (location) => {
        const circle = new window.google.maps.Circle({
          strokeColor: '#ACE1AF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#ACE1AF',
          fillOpacity: 0.1,
          map: map,
          center: location,
          radius: 5000,
        });
      };

      //this function is adding a marker for each zipcode in the zipcodes array
      zipcodes.forEach((zipcode) => {
        //results is an array returned by the Google Map API
        //using the geocode method of the geocode class to convert a givien address into geographic coordinates
        //{address: zipcode} specifies the address thats being convert to a location
        //this function then gets a array results and status back from the API
        geocoder.geocode({ address: zipcode }, (results, status) => {
          //checking if the result is ok and there is a result at 0 index
          if (status === 'OK' && results[0]) {
            //this retrieve the geographic location (lat, lng) of the first result
            //saving it to location variable
            const location = results[0].geometry.location;
            //now addMarker is invoked passing in location(lat/lng) and the zipcode
            addMarker(location, zipcode);
          } else {
            console.log(`Geocode was not successful for ${zipcode}: ${status}`);
          }
        });
      });
    };

    // dynamiccally loading Google API
    const loadMapScript = () => {
      //creating a script element used to load Google Map API
      const script = document.createElement('script');
      //setting the source of the scipt element to the API
      //***callback=initMap specify the initMap functioin should be called once the script is loaded ****/
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPg7FdcYJsEj83PpiOaX6Kz385Wrz-KHw&callback=initMap`;
      //script will be excuted async, so no blocking of the rest of the page
      script.async = true;
      //script should be executed only after the HTML document has been completed parsed
      script.defer = true;

      // Attach initMap to window, making the initMap accessible globally
      window.initMap = initMap;

      //event listener that will run once script is fully loaded
      script.onload = () => {
        console.log('Google Maps script loaded successfully.');
        //initicalize the map, ensuring it only happens after the API is fully loaded
        initMap(); // Call initMap here to ensure it's called after the script is loaded
      };
      //adding the script to the HTML document
      document.body.appendChild(script);
    };

    loadMapScript();

    // Clear maps when component unmount
    return () => {
      //this will select the any script that contains 'maps.googleapi.com',
      //regardless what their endpoint is
      const script = document.querySelector(
        //*= means 'contains'
        `script[src*="maps.googleapis.com"]`
      );
      //if there is such script, remove the script from the HTML document
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      //this removes initMap from the window object
      //making sure there is no reference globally when the component is mounted again
      delete window.initMap;
    };
  }, [zipcodes]);

  return (
    <>
      {' '}
      <header id='header'></header>
      <form
        className='searchMain'
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(
            e,
            '/main',
            null, //email
            null, //password
            null, //navigate
            null, //loginState
            null, //firstName
            null, //confirmPw
            {
              activity: selectedA,
            },
            city,
            zipCode,
            gender,
            null, //phone
            setZipcodes,
            distance
          ).then(() => {
            resetEntryMain(
              setCity,
              setZipCode,
              setGender,
              setSelectedA,
              setDistance
            );
          });
        }}
      >
        <label forhtml='searchActivity'>Choose an activity: </label>
        <select
          id='searchActivity'
          className='allInput'
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value=''></option>
          {availActivities.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        {/* skill level selection */}

        <div className='skillLevelMain'>
          <p>Choose skill level: </p>
          <label>
            <input
              type='radio'
              name='skillLevel'
              checked={skillLevel === 'Beginner'}
              value='Beginner'
              onChange={(e) => setSkillLevel(e.target.value)}
            ></input>
            <span></span> Beginner
          </label>
          <label>
            <input
              type='radio'
              name='skillLevel'
              checked={skillLevel === 'Intermediate'}
              value='Intermediate'
              onChange={(e) => setSkillLevel(e.target.value)}
            ></input>
            <span></span> Intermediate
          </label>
          <label>
            <input
              type='radio'
              name='skillLevel'
              checked={skillLevel === 'Advanced'}
              value='Advanced'
              onChange={(e) => setSkillLevel(e.target.value)}
            ></input>
            <span></span> Advanced
          </label>
        </div>
        <br></br>

        {/* add button */}
        <button
          type='button'
          onClick={() =>
            handleA(
              activity,
              setActivity,
              selectedA,
              setSelectedA,
              skillLevel,
              setSkillLevel
            )
          }
        >
          Add
        </button>
        <br></br>

        {/* list field */}
        <div id='listFieldMain'>
          <ul id='list'>
            {Object.entries(selectedA).map(([activity, skillLevel]) => (
              <li key={activity}>
                {activity} - {skillLevel}
                <button
                  type='button'
                  onClick={() => deleteA(activity, setSelectedA)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <br></br>

        {/* get city */}
        <label forhtml='city'>City: </label>
        <input
          id='city'
          className='allInput'
          value={city}
          type='text'
          required
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        {/* get zipcode */}
        <label forhtml='zipcode'>Zip Code: </label>
        <input
          id='zipcode'
          className='allInput'
          value={zipCode}
          type='text'
          required
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />
        {/* <label forhtml='className'>Distance: </label>
        <select
          className='allInput'
          id='distance'
          value={distance}
          onChange={(e) => {
            handleConversion;
          }}
        >
          <option value=''></option>
          <option value='10'>10 miles</option>
          <option value='25'>25 miles</option>
          <option value='50'>50 mils</option>
        </select> */}

        {/* get gender */}
        <label forhtml='gender'>Gender: </label>
        <select
          in='gender'
          className='allInput'
          value={gender}
          required
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option></option>
          <option label='Prefer not to say'>Prefer not to say</option>
          <option label='Non-binary'>Non-binary</option>
          <option label='Male'>Male</option>
          <option label='Female'>Female</option>
        </select>
        <button id='searchButton' type='submit'>
          Search
        </button>
      </form>
      <div id='map'></div>
    </>
  );
}
