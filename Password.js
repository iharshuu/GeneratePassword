import React, { useState } from 'react';
import './Password.css';

const Password = () => {
  const [passwordLength, setPasswordLength] = useState(4);
  const [copied, setCopied] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState([
    {
      id: 1,
      name: "It should have Uppercase",
      fulfilled: false,
    },
    {
      id: 2,
      name: "It should have Lowercase",
      fulfilled: false,
    },
    {
      id: 3,
      name: "It should have Numbers",
      fulfilled: false,
    },
    {
      id: 4,
      name: "It should have Special Characters",
      fulfilled: false,
    },
  ]);

  const toggleRequirement = (id) => {
    setPasswordRequirements((requirements) =>
      requirements.map((req) =>
        req.id === id ? { ...req, fulfilled: !req.fulfilled } : req
      )
    );
  };

  const generatePassword = () => {
    const selectedRequirements = passwordRequirements
      .filter((req) => req.fulfilled)
      .map((req) => req.id);

    let s = '';
    for (let i = 0; i < selectedRequirements.length; i++) {
      switch (selectedRequirements[i]) {
        case 1: {
          s += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        }
        case 2: {
          s += 'abcdefghijklmnopqrstuvwxyz';
          break;
        }
        case 3: {
          s += '0123456789';
          break;
        }
        case 4: {
          s += '!@#$%^&*';
          break;
        }
        default: {
          break;
        }
      }
    }

    let k = '';
    for (let i = 0; i < passwordLength; i++) {
      k += s[Math.floor(Math.random() * s.length)];
    }

    setCopied(k);
  };
  const [clipboard, setClipboard] = useState("copy")
  const copyToClipboard = () => {
    navigator.clipboard.writeText(copied)
    setClipboard("copied")
    setTimeout(()=>{
        setClipboard("copy")
    },1500)
  }

  return (
    <div className='password-container'>
        { copied.length>1 ? <div>
      <span className='password-display'>{copied}</span>
      <button className='copy-button' onClick={copyToClipboard}>
       {clipboard}
      </button> </div> : "" }
      <div className='password-controls'>
        <div className='password-length'>
          <label>Password Length:</label>
          <input
            type='range'
            min='4'
            max='20'
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
          {passwordLength}
        </div>
        <div className='requirements'>
          {passwordRequirements.map((requirement) => (
            <p key={requirement.id}>
              <input
                type='checkbox'
                name={requirement.id}
                id={requirement.id}
                checked={requirement.fulfilled}
                onChange={() => toggleRequirement(requirement.id)}
              />
              <label htmlFor={requirement.id}>{requirement.name}</label>
            </p>
          ))}
        </div>
        <button className='generate-button' onClick={generatePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default Password;
