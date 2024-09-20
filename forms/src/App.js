import './App.css';
import { useState, useEffect } from 'react';

function App() {
  let [imieS, ustawImie] = useState('');
  let [nazwiskoS, ustawNazwisko] = useState('');
  let [emailS, ustawEmail] = useState('');
  let [hasloS, ustawHaslo] = useState('');
  let [hasloPotwS, ustawHasloPotwS] = useState('');
  let [wiekS, ustawWiek] = useState('');
  let [dataUroS, ustawDataUroS] = useState('');
  let [kraj, ustawKraj] = useState('');
  let [kraje, ustawKraje] = useState([]);
  let [plec, ustawPlec] = useState('');
  let [marketing, ustawMarketing] = useState(false);
  let [zgodanaRegS, ustawZgodanaRegS] = useState(false);

  let [bledy, ustawbledy] = useState({});


  // Walidacje
  const imieNazwiskoSPR = (value, midDLUG = 2) => value.length >= midDLUG;
  const emailSPR = (emailS) => /\S+@\S+\.\S+/.test(emailS);
  const hasloSPR = (hasloS) => {
    let midDLUG = 8;
    let maLiczbe = (hasloS.match(/\d/g) || []).length >= 1;
    let maZnakSpecj = (hasloS.match(/[^a-zA-Z0-9]/g) || []).length >= 1;
    return hasloS.length >= midDLUG && maLiczbe && maZnakSpecj;
  };

  const wiekSPR = (wiekS) => wiekS >= 18 && wiekS <= 99;
  const dataUroSPR = (dataUroS, wiekS) => {
    let rokUro = new Date(dataUroS).getFullYear();
    let obecnyROk = new Date().getFullYear();

    {/* dokonczyc*/}
    return parseInt(obecnyROk) - parseInt(rokUro) === parseInt(wiekS);
  };
  
  {/* https://restcountries.com/v3.1/all*/}
  const fetchCountries = async () => {
    let response = await fetch('https://restcountries.com/v3.1/all');
    let data = await response.json();
    ustawKraje(data.map(kraje => ({ name: kraje.name.common, flag: kraje.flags.svg })));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let utworzbledy = {};

    if (!imieNazwiskoSPR(imieS)) {
      utworzbledy.imieObslugaBledu = 'Imię musi zawierać co najmniej 2 litery.';
    }

    if (!imieNazwiskoSPR(nazwiskoS)) {
      utworzbledy.nazwiskoObslugaBledu = 'Nazwisko musi zawierać co najmniej 2 litery.';
    }

  
    if (!emailSPR(emailS)) {
      utworzbledy.emailObslugaBledu = 'Podaj poprawny adres email.';
    }

    if (!hasloSPR(hasloS)) {
      utworzbledy.hasloObslugaBledu = 'Hasło musi zawierać co najmniej 8 znaków, 1 cyfrę i 1 znak specjalny.';
    }

    if (hasloS !== hasloPotwS) {
      utworzbledy.hasloPotwObslugaBledu = 'Hasła muszą być takie same.';
    }

    if (!wiekSPR(wiekS)) {
      utworzbledy.wiekObslugaBledu = 'Wiek musi być liczbą pomiędzy 18 a 99.';
    }

    if (!dataUroSPR(dataUroS)) {
      utworzbledy.dataUroObslugaBledu = 'Data urodzenia musi być zgodna z wiekiem.';
    }

    if (kraj === '') {
      utworzbledy.krajObslugaBledu = 'Musisz wybrać kraj.';
    }

    if (!zgodanaRegS) {
      utworzbledy.zgodanaRegObslugaBledu = 'Musisz zaakceptować regulamin.';
    }

    ustawbledy(utworzbledy);

    if (Object.keys(utworzbledy).length === 0) {
      console.log('Formularz jest poprawny');
    }
  };

  return (
    <div className="App">
      <div className="formularz">
        <form onSubmit={handleSubmit}>
          <label>Imię:</label><br />
          <input type="text" className="imie" value={imieS} onChange={(e) => ustawImie(e.target.value)}/><br />
          {bledy.imieObslugaBledu && <p>{bledy.imieObslugaBledu}</p>}<br />


          <label>Nazwisko:</label><br />
          <input type="text" className="nazwisko" value={nazwiskoS} onChange={(e) => ustawNazwisko(e.target.value)}/><br />
          {bledy.nazwiskoObslugaBledu && <p>{bledy.nazwiskoObslugaBledu}</p>}<br />

          <label>Email:</label><br />
          <input type="email" className="email" value={emailS} onChange={(e) => ustawEmail(e.target.value)}/><br />
          {bledy.emailObslugaBledu && <p>{bledy.emailObslugaBledu}</p>}<br />


          <label>Hasło:</label><br />
          <input type="password" className="haslo" value={hasloS} onChange={(e) => ustawHaslo(e.target.value)}/><br />
          {bledy.hasloObslugaBledu && <p>{bledy.hasloObslugaBledu}</p>}<br />

          <label>Potwierdź hasło:</label><br />
          <input type="password" className="hasloPotw" value={hasloPotwS} onChange={(e) => ustawHasloPotwS(e.target.value)}/><br />
          {bledy.hasloPotwObslugaBledu && <p>{bledy.hasloPotwObslugaBledu}</p>}<br />


          <label>Wiek:</label><br />
          <input type="number" className="wiek" value={wiekS} onChange={(e) => ustawWiek(e.target.value)}/><br />
          {bledy.wiekObslugaBledu && <p>{bledy.wiekObslugaBledu}</p>}<br />

          <label>Data urodzenia:</label><br />
          <input type="date" className="dataUro" value={dataUroS} onChange={(e) => ustawDataUroS(e.target.value)}/><br />
          {bledy.dataUroObslugaBledu && <p>{bledy.dataUroObslugaBledu}</p>}<br />


          <label>Kraj:</label><br />  {/* https://restcountries.com/v3.1/all*/}
          <select value={kraj} onChange={(e) => ustawKraj(e.target.value)}>
            <option value="">Wybierz kraj</option>
            {kraje.map((kraj, index) => (
              <option key={index} value={kraj.name}>
                {kraj.name} 
                {/*<img src={krajObslugaBledu.flag} alt="flag" width="20px" />*/}
              </option>
            ))}
          </select><br />
          {bledy.krajObslugaBledu && <p>{bledy.krajObslugaBledu}</p>}<br />


          <label>Płeć:</label><br />{/*opcjonalne*/}
          <select value={plec} onChange={(e) => ustawPlec(e.target.value)}>
            <option value="mezczyzna">Mężczyzna</option>
            <option value="kobieta">Kobieta</option>
          </select><br />

          <label>Zgoda marketingowa</label>{/*opcjonalne */}
          <input type="checkbox" checked={marketing} onChange={(e) => ustawMarketing(e.target.checked)}/><br />

          <label>Zgoda na regulamin</label>
          <input type="checkbox" className="zgodanaReg" checked={zgodanaRegS} onChange={(e) => ustawZgodanaRegS(e.target.checked)}/><br /><br />
          {bledy.zgodanaRegObslugaBledu && <p>{bledy.zgodanaRegObslugaBledu}</p>}<br /><br />

          
          <button type="submit">Submit</button><br />
        </form>
      </div>
    </div>
  );
}

export default App;
