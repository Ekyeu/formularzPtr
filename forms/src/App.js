import './App.css';
import {useState} from 'react';


function App() {
  return (
    <div className="App">
      <div className="formularz">
        <form>
          <label>Imie:</label><br/>
          <input type="text" class="imie"></input><br/>
          <label>Nazwisko:</label><br/>
          <input type="text" class="nazwisko"></input><br/>

          <label>Email:</label><br/>
          <input type="email" class="email"></input><br/>
          <label>Haslo:</label><br/>
          <input type="password" class="haslo"></input><br/>
          <label>Haslo Potwierdź:</label><br/>
          <input type="password" class="hasloPotw"></input><br/>

          <label>Wiek:</label><br/>
          <input type="number" class="wiek"></input><br/>
          <label>Data urodzenia:</label>
          <input type="date" class="dataUro"></input><br/>

          {/* do zrobienia
          <select></select>
          */}

          <label>Plec</label>
          <select> {/* opcjonalne*/}
            <option value="mezczyzna">mezczyzna</option>
            <option value="kobieta">kobhieta</option>
          </select><br/>


          <label>Zgoda marketingowa</label>{/* opcjonalne*/}
          <input type="checkbox"></input>

          <label>Zgoda na regulamin</label>
          <input type="checkbox" class="zgodanaReg"></input>
        </form>
      </div>
    </div>
  );
}

export default App;
