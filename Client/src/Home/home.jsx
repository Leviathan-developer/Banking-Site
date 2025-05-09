import React from 'react';
import '../assets/css/Home/home.css';

const HomePage = () => {
  return (
    <div className="home-container">
    <header>
        <h1>Welcome to BankSite</h1>
        <p>Your trusted financial partner</p>
        <div className="cta">
            <a href="/register" className="cta-btn">Create an Account</a>
            <a href="/signup" className="cta-btn">Login</a>
        </div>
    </header>
    <section className="features">
        <div className="feature">
            <h2>Secure Transactions</h2>
            <p>Your safety is our priority.</p>
        </div>
        <div className="feature">
            <h2>Easy Transfers</h2>
            <p>Send money quickly and easily.</p>
        </div>
        <div className="feature">
            <h2>24/7 Support</h2>
            <p>We are here to help, anytime.</p>
        </div>
    </section>
</div>

  );
};

export default HomePage;
