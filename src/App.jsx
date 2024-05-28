import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <div className='bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#48FF48)] md:min-h-[88vh] min-h-[100vh] md:scrollbar md:scrollbar-thumb-green-700 md:h-[100vh] md:overflow-y-scroll md:scrollbar-thumb-rounded-full md:scrollbar-track-rounded-full'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App