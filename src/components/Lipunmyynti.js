import React, { useState, useEffect } from 'react';

function Lipunmyynti () {

  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [lippu, setLippu] = useState('');
  const [linkki,setLinkki] = useState('');
  const [lippulinkki,setLippulinkki] = useState('');
  const [tapahtumat, setTapahtumat] = useState({});

  // const timestamp = Date.now(); // This would be the timestamp you want to format
  // const time= (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));

  const haeMyynti = () => {
    console.log(id);
    fetch(`https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/${id}`)
    .then(response => response.json()
    .then(responseJson => setLippu(responseJson))
    .catch(error => { 
      console.error(error)
    }));
    console.log(lippu)
    setStatus('onnistui get')
    setLinkki(lippu._links.self.href);
    setLippulinkki(lippu._links.liput.href);
  }

  useEffect(() => {
    haeMyynti();
    haeMyyntiliput();
  }, [id]);

  const haeMyyntiliput = () => {
    //fetch(`https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/${id}/liput`)
    fetch(`${lippulinkki}`)
    .then(response => response.json()
    .then(responseJson => setTapahtumat(responseJson))
    .catch(error => { 
      console.error(error)
    }));
    console.log(tapahtumat);
    setStatus('myyntitapahtuman liput haettu')
  }

  const Liput = ({ tapahtumat }) => {
    if (tapahtumat) {
      return (
        Object.values(tapahtumat._embedded.lippus).map(lippu =>
          <p key={lippu.id}>
            {lippu.lippukoodi} {lippu.hinta}€ {lippu._links.self.href}</p>
          ))
    } else {
      return (
        <div> tyhjä </div>
      ) 
    }
  }

  const lisaaLippu = () => {
  //https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/1/liput
  //https://etappi-ticketguru.herokuapp.com/api/liput/
  // "myyntitapahtuma": "https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/3" 
  // fetch(`${lippulinkki}`, { 
  fetch(`https://etappi-ticketguru.herokuapp.com/api/liput`, { 
      method: "POST",
      body: JSON.stringify({"tapahtumalipputyyppi": "https://etappi-ticketguru.herokuapp.com/api/tapahtumalipputyypit/1",
        "myyntitapahtuma": `https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/${id}` } ),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
    setStatus('Lippu lisätty haetulle myyntitapahtumalle');
      return response.text()
    }, function(error) {
      console.error(error)
    setStatus('erhe');
    })
  }

  const luoMyyntitapahtuma = () => {
    fetch(`https://etappi-ticketguru.herokuapp.com/api/myyntitapahtumat/`, { 
      method: "POST",
      body: JSON.stringify({"kayttaja":"http://localhost:8080/api/kayttajat/1"}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
      setStatus('Myyntitapahtuma lisätty');
      return response.text()
      }, function(error) {
        console.error(error)
      setStatus('erhe');
    })
  }

  const handleChange = (event) => {
    event.preventDefault();
    haeMyynti(id);
  }

  return (
    <div>
      <div>
        <label>Anna myyntitapahtuma id: </label>
      <input 
        value={id}
        onChange={e => setId(e.target.value)}/>
      <button onClick={handleChange}>Hae</button>
      </div>
      <div>
        <p>
          myyntitapahtuma url {linkki}<br />
          lippu url {lippulinkki}<br />
          Toteutunut {lippu.toteutunut}<br />
          <br />
          <button onClick={lisaaLippu}>
            Lisää lippu
          </button>
          <button onClick={luoMyyntitapahtuma}>
            Luo myyntitapahtuma
          </button>
          <button onClick={haeMyyntiliput}>
            Näytä myyntitapahtuman liput
          </button>
        </p>
      </div>
      <Liput tapahtumat={tapahtumat}/>
    </div>
  );
}
export default Lipunmyynti;
 