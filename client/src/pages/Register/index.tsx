import React, { useState } from 'react';
import axios from 'axios';
import { config } from 'process';
import { body } from 'express-validator';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const onChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      alert("pwd not match");
    } else {
      console.log("e", formData);
      const body = { name, email, password };
      const config: any = {
        header: {
          'Content-Type': 'Application/json'
        }
      }
      axios.post('/api/user', body, config).then(resp => {
        console.log(resp.data);
        if (resp.data.errors) {
          console.error(resp.data.errors)
        } else {
          const token = resp.data.token;
          console.log(resp.data.token);
          localStorage.setItem('token', token);
          alert("đăng ký thành công")
          setFormData({
            name: '',
            email: '',
            password: '',
            password2: ''
          })
        }
      }).catch(e => {
        console.error(e);
      }) 
    }
  }


  const { name, email, password, password2 } = formData;
  return (
    <>
      <h2>Register Page</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input style={{display: 'block', width: '100%'}} placeholder="name" name="name" value={name} onChange={(e) => onChange(e)} />
        <input style={{display: 'block', width: '100%'}} placeholder="email" type="email" name="email" value={email} onChange={(e) => onChange(e)} />
        <input style={{display: 'block', width: '100%'}} placeholder="password" type="password" name="password" value={password} onChange={(e) => onChange(e)} />
        <input style={{display: 'block', width: '100%'}} placeholder="password2" type="password" name="password2" onChange={(e) => onChange(e)} />
        <button type="submit">Đăng ký</button>
      </form>
    </>
  )
}

export default RegisterPage;