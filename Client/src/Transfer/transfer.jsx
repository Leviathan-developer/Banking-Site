import React, { useState } from 'react';
import axios from 'axios';
import Server_Ip from '../config'; 
import '../assets/css/Transfer/transfer.css'
function Transfer() {
  const [amount, setAmount] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [senderPassword, setSenderPassword] = useState('');
  const [error, setError] = useState('');

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleReceiverAccountChange = (e) => setReceiverAccount(e.target.value);
  const handlePasswordChange = (e) => setSenderPassword(e.target.value);

  const handleTransfer = () => {
    const userId = localStorage.getItem('userId'); 
    if (!amount || !receiverAccount || !senderPassword) {
      setError('Please fill in all fields');
      return;
    }

    axios.post(`${Server_Ip}/fundtransfer`, {
      senderid: userId,
      senderpass: senderPassword,
      amount,
      receiverAccount
    })
    .then(response => {
      alert('Transfer successful');
    })
    .catch(error => {
      setError(error.response.data.error || 'Transfer failed');
    });
  };

  return (
    <div className="transfer">
      <h1>Transfer Funds</h1>

      {error && <p className="error">{error}</p>}

      <div className="transfer-form">
        <input 
          type="number" 
          placeholder="Amount" 
          className="transfer-input" 
          value={amount}
          onChange={handleAmountChange}
        />
        <input 
          type="text" 
          placeholder="Receiver Account Number" 
          className="transfer-input" 
          value={receiverAccount}
          onChange={handleReceiverAccountChange}
        />
        <input 
          type="password" 
          placeholder="Your Password" 
          className="transfer-input" 
          value={senderPassword}
          onChange={handlePasswordChange}
        />
        <button className="transfer-btn" onClick={handleTransfer}>
          Transfer
        </button>
      </div>
    </div>
  );
}

export default Transfer;
