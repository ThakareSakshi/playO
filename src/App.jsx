
import './App.css'
import CutomerDetails from './Customers/CutomerDetails'
import Sidebar from './Sidebar/Sidebar'
import CustomerContext from './context/customerContext'

function App() {


  return (
    <>
    <CustomerContext>
    <div className='flex font-primary'>
      <Sidebar/>
      <CutomerDetails/>
      </div>
    </CustomerContext>
      
    </>
  )
}

export default App
