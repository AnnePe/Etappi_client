import React, { useState,  Alert } from 'react';

function Lipputarkistus () {

    const [status, setStatus] = useState('');
    const [id, setId] = useState('');
    const [lippu, setLippu] = useState('');
   const [linkki,setLinkki] = useState('');

   const timestamp = Date.now(); // This would be the timestamp you want to format

   const time= (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
  const haeLippu = () => {
    console.log(id);
   // https://etappi-ticketguru.herokuapp.com/api/liput/1
   
    fetch(`https://etappi-ticketguru.herokuapp.com/api/liput/${id}`)
    .then(response => response.json()
    .then(responseJson => setLippu(responseJson))
    .catch(error => { 
      Alert.alert('Error', error); 
    }));
    console.log(lippu);
    setStatus('onnistui get')
    setLinkki(lippu._links.self.href);
  }

  //useEffect(() => {
  //  haeLippu();
  //}, []);

  const vaihdaId = (event) => {
    event.preventDefault();
    haeLippu(id);
  }

  const merkitseKaytetty = () => {
     //fetch(`https://etappi-ticketguru.herokuapp.com/api/liput/${lippu.id}`, {
   fetch(`${linkki}`, { 
      method: "PATCH",
      body: JSON.stringify({"kaytetty":time}),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function(response) {
  
    setStatus('onnistui PATCH');
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
          Hae lippu id (paina get 2 krt): 
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <input type="submit" value="Hae" />
        
      </form>

      <p>
      linkki url {linkki}<br />
        Lipputunnus {lippu.lippukoodi}<br />
        
        
        Myyntihinta {lippu.hinta}<br />
       
        Käytetty {lippu.kaytetty}<br /><br />

        <button onClick={merkitseKaytetty}>
          Merkitse käytetyksi
        </button>
      </p>
      <p> 
        <div>{status}</div>
    </p>
    </div>
  );
}
export default Lipputarkistus;
 