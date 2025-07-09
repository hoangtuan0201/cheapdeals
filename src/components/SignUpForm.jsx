import { useState } from 'react'
import './AuthForm.css'

const SignUpForm = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Sign up data:', formData)
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

      <div className="auth-content">
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

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Reggie James"
              required
            />
          </div>

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
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="khoadeptrai2101"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Re-enter password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="khoadeptrai2101"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                👁
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>

          <div className="switch-auth">
            <span>Already have an account </span>
            <button type="button" onClick={onSwitchToSignIn} className="link-btn">
              Sign In
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

export default SignUpForm
