import React, { useState, useEffect, Alert } from 'react';

function Lipunmyynti () {

    const [status, setStatus] = useState('');
    const [id, setId] = useState('');
    const [lippu, setLippu] = useState('');
   const [linkki,setLinkki] = useState('');
   const [lippulinkki,setLippulinkki] = useState('');
   const [tapahtumat, setTapahtumat] = useState('');

  // const timestamp = Date.now(); // This would be the timestamp you want to format

  // const time= (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
  const haeMyynti = () => {
     
    fetch(`https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/${id}`)
    .then(response => response.json()
    .then(responseJson => setLippu(responseJson))
    .catch(error => { 
      Alert.alert('Error', error); 
    }));
    console.log(lippu);
    setStatus('onnistui get')
    setLinkki(lippu._links.self.href);
    setLippulinkki(lippu._links.liput.href);
  }
  const haeMyyntiliput = () => {
     
    fetch(`${lippulinkki}`)
    .then(response => response.json()
    .then(responseJson => setTapahtumat(responseJson))
    .catch(error => { 
      Alert.alert('Error', error); 
    }));
    console.log(lippu);
    setStatus('onnistui get')
   // setLinkki(lippu._links.self.href);
  //  setLippulinkki(lippu._links.liput.href);
  }
  //useEffect(() => {
  //  haeLippu();
  //}, []);

  const vaihdaId = (event) => {
    event.preventDefault();
    haeMyynti(id);
  }

 const lisaaLippu = () => {
  //https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/1/liput
   fetch(`${lippulinkki}`, { 
      method: "POST",
   //   body: JSON.stringify({"toteutunut":"a"}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
  
    setStatus('Onnistuiko POST?');
      return response.text()
    }, function(error) {
  //    error.message //=> String
    setStatus('erhe');
    })
  }

  return (
    <div>
      <form onSubmit={vaihdaId}>
        <label>
          Anna myyntitapahtuma id(paina 2 kertaa että päivittyy näytölle): 
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <input type="submit" value="Hae" />
        
      </form>

      <p>
     myyntitapahtuma url {linkki}<br />
     lippu url {lippulinkki}<br />
        Toteutunut {lippu.toteutunut}<br />
       
       
       

        <button onClick={lisaaLippu}>
          Lisää lippu
        </button>
        <button onClick={haeMyyntiliput}>
          Näytä myyntitapahtuman liput
        </button>
      </p>
      <p> 
        <div>{status}</div>
    </p>
    </div>
  );
}
export default Lipunmyynti;
 