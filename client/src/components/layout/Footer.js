import React from 'react'

const Footer = () => {
  let year = new Date().getFullYear()
  return (
      
      <footer className="page-footer blue darken-4">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
           
          </div>
          
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2014 - {year} All Right Reserved.
        <a className="grey-text text-lighten-4 right" href="/register">Register</a>
        </div>
      </div>
    </footer>
        
        
   
  )
}

export default Footer