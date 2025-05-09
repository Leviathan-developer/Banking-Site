import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Server_Ip from '../config'; 
import '../assets/css/Dashboard/dashboard.css'

function Dashboard() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    const userId = localStorage.getItem('userId');
    axios.get(`${Server_Ip}/getDetail/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }, []);

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account No:</strong> {user.account_number}</p>
        <p><strong>Account Balance:</strong> ${user.balance}</p>
      </div>

      <button className="transfer-btn" onClick={() => window.location.href = '/transfer'}>
        Transfer Funds
      </button>
    </div>
  );
}

export default Dashboard;
