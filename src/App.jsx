
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {


  return (
    <>
       <Navbar/>

       <div className='w-full h-1vh bg-green-600'>

       <Manager/>
       </div>


       <Footer/>
       
      
    </>
  )
}

export default App
