
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[countries,setCountries] = useState([]);
  const[states,setStates] = useState([]);
  const[cities,setCities] = useState([]);

  const[selectedCountry,setSelectedCountry] = useState("");
  const[selectedState,setSelectedState] = useState("");
  const[selectedCity,setSelectedCity] =useState("");

  useEffect(() =>{
    fetch("https://crio-location-selector.onrender.com/countries")
    .then((res) => 
      // if(!res.ok) throw new Error ("Country API Failed");
      res.json())
  
    // .then((data) =>setCountry(data))
    .then((data) =>
      // if(Array.isArray(data))
         setCountries(data))
      // else setCountry([])
    .catch((err) => console.error("Error fetching countries",err));
    // setCountry([])); 
  },[]);

  useEffect(() =>{
    if(selectedCountry){

      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
      .then((res) =>{
        //  if(!res.ok) throw new Error ("State API Faileed") 
         return res.json()
      // .then((data) =>setState(data))
})
      .then((data) =>{
         
          setStates(data)
         
        })
      .catch((err) =>
        console.error("Errorfetching states",err));
          setSelectedState("");
          setCities([]);
          setSelectedCity("")

          
        // setState([]);
      
      
    }
  },[selectedCountry]);

  useEffect(()=>{
    if(selectedState && selectedCountry){
    fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
    .then((res) =>
      // if(!res.ok) throw new Error ("City  API Failed")
         res.json())
    .then((data) => 
      
        setCities(data))
      
    
    .catch((err) =>
      console.error("Error fetching cities",err));
      setSelectedCity("");

    
}

    },[selectedState,selectedCountry]);
  

  return (
    <div className="App" style={{padding:"20px"}}>
      <h2>Select Location</h2>

      <select style ={{width:"auto",height:"30px",borderRadius:"5px"
        ,margin:"20px"
      }} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>

       
        <option value="">Select Country</option>
        {countries.map((country)=>(
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select style={{height:"30px",
        borderRadius:"10px",
        boxShadow:"0px 4px 4px rgba(0,0,0,0.2)",margin:"20px"
      }} value={selectedState}onChange={(e) =>setSelectedState(e.target.value)} disabled ={!selectedCountry}>

        <option value="">
          Select State
        </option>
        {states.map((state) =>(
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select style={{height:"30px",
        borderRadius:"10px",
        boxShadow:"0px 4px 4px rgba(0,0,0,0.2)",margin:"20px"
      }} value={selectedCity} onChange ={(e) => setSelectedCity(e.target.value)}disabled={!selectedState}>

        <option value="">
          Select City
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}

      </select>

      {selectedCity && (
        <h2 style={{marginTop:"20px"}}>
          You selected <span style={{fontWeight: "bold" }}>{selectedCity}</span>,{" "}
          <span style={{color: "gray" }}>{selectedState}</span>,{" "}
          <span style={{color:"gray"}}>{selectedCountry}</span>

        </h2>
      )}
      
    </div>
  );
}

export default App;
