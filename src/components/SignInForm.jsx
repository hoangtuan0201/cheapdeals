import { useState } from 'react'
import './AuthForm.css'

const SignInForm = ({ onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Sign in data:', formData, 'Remember me:', rememberMe)
  }

  return (
    <div className="auth-container">
      <div className="status-bar">
        <span className="time">10:00</span>
        <div className="status-icons">
          <div className="signal-icon"></div>
          <div className="wifi-icon"></div>
          <div className="battery-icon"></div>
        </div>
      </div>

      <div className="auth-content signin-content">
        <div className="logo-section">
          <div className="logo-icon">
            <div className="phone-icon">
              <span>(</span>
              <div className="phone-body"></div>
              <span>)</span>
            </div>
          </div>
          <h1 className="app-title">CheapDeals</h1>
          <p className="app-subtitle">Buy more for less.</p>
        </div>

        <form className="auth-form signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="khoanguyen2101538@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Remember Me
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          <div className="terms-text">
            By clicking on "Sign In" you agree to{' '}
            <button type="button" className="link-btn underline">
              Terms of Service
            </button>
            {' | '}
            <button type="button" className="link-btn underline">
              Privacy Policy
            </button>
          </div>
        </form>
      </div>

      <div className="navigation-bar">
        <div className="nav-button"></div>
        <div className="nav-home"></div>
        <div className="nav-recent"></div>
      </div>
    </div>
  )
}

export default SignInForm
