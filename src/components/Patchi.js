import React, { useState, useEffect } from 'react';

function Patchi () {

  const [virhe, setVirhe] = useState('Haetaan ...');
  

 const timestamp = Date.now(); // This would be the timestamp you want to format

 const time= (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
//const data='{"kaytetty":"Jccxxvvv"}';
  const patchUrl = async () => {
        
      fetch('https://etappi-ticketguru.herokuapp.com/api/liput/1', {
        method: "PATCH",
        //body: JSON.stringify({"kaytetty":"react testi toimii 5.11.2022"}),
        body: JSON.stringify({"kaytetty":time}),
        headers: {
          "Content-Type": "application/json"
        },
      }).then(function(response) {
    //    response.status     //=> number 100–599
    //    response.statusText //=> String
    //    response.headers    //=> Headers
    //    response.url        //=> String
      setVirhe('onnistui PATCH');
        return response.text()
       
      }, function(error) {
    //    error.message //=> String
    setVirhe('erhe');
      })
    }
        
 useEffect(() => {
    patchUrl();
    
  }, []);

  if (virhe.length > 0) {
    return (<div>{virhe}</div>)
    
  }

  return (
    <div>
      
          <div >
          
          </div>
       
      
   
    </div>
  );
}
export default Patchi;
 