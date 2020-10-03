import React, { useState } from 'react';
import axios from 'axios';
import { config } from 'process';
import { body } from 'express-validator';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [info, setInfo] = useState({
    email: '',
    name: ''
  });

  const onChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("e", formData);
    const body = { email, password };
    const config: any = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }
    axios.post('/api/auth', body, config).then(resp => {
      console.log(resp.data);
      if (resp.data.errors) {
        console.error(resp.data.errors)
      } else {
        const token = resp.data.token;
        console.log(resp.data.token);
        localStorage.setItem('token', token);
        alert("đăng nhập thành công");
        setFormData({
          email: '',
          password: '',
        });
      }
    }).catch(e => {
      console.error(e);
    }) 
  }

  const getInfo = () => {
    const config: any = {
      headers: {
        'Content-Type': 'Application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    }
    console.log("header", config);
    axios.get('/api/auth', config).then(resp => {
      console.log(resp.data);
      if (resp.data.errors) {
        console.error(resp.data.errors)
      } else {
        console.log(resp.data);
        alert("lấy thông tin user thành công");
        setInfo({
          name: resp.data.name,
          email: resp.data.email
        })
      }
    }).catch(e => {
      console.error(e);
    }) 
  }


  const { email, password } = formData;
  return (
    <>
      <h2>Login Page</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <input style={{display: 'block', width: '100%'}} placeholder="email" type="email" name="email" value={email} onChange={(e) => onChange(e)} />
        <input style={{display: 'block', width: '100%'}} placeholder="password" type="password" name="password" value={password} onChange={(e) => onChange(e)} />
        <button type="submit">Đăng nhập</button>
      </form>

      <div onClick={() => getInfo()}>Get Info User</div>
      <p>{info.email}</p>
      <p>{info.name}</p>
    </>
  )
}

export default LoginPage;