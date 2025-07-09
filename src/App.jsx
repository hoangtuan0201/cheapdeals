import { useState } from 'react'
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'
import './App.css'

function App() {
  const [isSignUp, setIsSignUp] = useState(true)

  return (
    <div className="app">
      <div className="mobile-container">
        {isSignUp ? (
          <SignUpForm onSwitchToSignIn={() => setIsSignUp(false)} />
        ) : (
          <SignInForm onSwitchToSignUp={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  )
}

export default App
