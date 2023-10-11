import React from 'react'
import './App.css'

export function Banner() {
    return (
    <section className="hero-banner">
      <nav className="navbar navbar-expand-lg navbar-dark py-3">
          <div className="container">
              <button className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navmenu">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navmenu">
                  <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                          <a href="/Projects/ProjectIndex" className="nav-link text-light">Home</a>
                      </li>
                      <li className="nav-item">
                          <a href="https://www.justintruong.studio" className="nav-link text-light">Portfolio</a>
                      </li>
                      <li className="nav-item">
                          <a href="https://github.com/Truong-Justin/BugTracker" className="nav-link text-light">GitHub</a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
      <div className="section flex-display">
          <h1 className="text-center hero-title-text">BUG & PROJECT MANAGEMENT</h1>
          <h4 className="hero-small-text d-md-block d-none">Keeping track of bugs and projects, all in one place.</h4>
      </div>
  </section>
    )
}