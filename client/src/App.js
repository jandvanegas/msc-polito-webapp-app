import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar'
import { useState } from 'react'
import './App.css';

function App() {
	const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <NavigationBar open={open} setOpen={setOpen}/>
    </div>
  );
}

export default App;
