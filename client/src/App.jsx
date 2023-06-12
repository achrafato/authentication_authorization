import './App.css'

//components
import Signin from './pages/signin/Signin'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import Signup from './pages/signup/Signup'
import User from './components/User'
import PersistLogin from './components/PersistLogin'

import { Routes ,Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
    
          <Route index element={<div>home</div>}/>
          <Route path='login' element={<Signin/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='unauthorized' element={<div>unauthorized</div>}/>

    <Route element={<PersistLogin/>}>

          <Route element={<RequireAuth admin={false}/>}>
              <Route path='setting' element={<div>setting</div>}/>
          </Route>

          <Route element={<RequireAuth admin={true}/>}>
              <Route path='users' element={<User/>}/>
              <Route path='dashboard' element={<div>dashboard</div>}/>
          </Route>

    </Route>

        <Route path='*' element={<div>Error 404</div>}/>
        </Route>
      </Routes>

    </div>
  )
}
export default App