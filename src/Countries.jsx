import { useEffect, useState } from "react";

const CountryCard = ({name, flag, abbr}) =>{
return(
    <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        width:"200px",
        height: "200px",
        border: "1px solid black",
        borderRadius: "5px",
        margin:"5px"
    }}>
        <img src={flag} alt={"Flag of "+abbr} style={{width:"100px"}}/>
        <h2>{name}</h2>
    </div>
)
}

function Countries(){
    const API_URL = 'https://xcountries-backend.azurewebsites.net/all';
    const [countries,setCountries] = useState([])

    console.log({countries})

    useEffect(()=>{
        const fetchCountries = async () =>{
            try{
                const response = await fetch(API_URL);
                const data = await response.json();
                setCountries(data)
            }catch(error){
                console.error("Error fetching data: ",error)
            }
        }
        fetchCountries();
    },[])
    return <div style={{
        display:"flex",
        flexWrap:"wrap"
    }}>
{countries.map(({name, flag, abbr})=>(
   <CountryCard name={name} flag={flag} abbr={abbr} key={abbr}/> 
))}
    </div>
}

export default Countries;