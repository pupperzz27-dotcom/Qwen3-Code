import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
class ErrorBoundary extends React.Component { state={error:null}; static getDerivedStateFromError(error){return {error};} render(){if(this.state.error)return <main style={{padding:'2rem',color:'#fff',fontFamily:'sans-serif'}}><h1>เกิดข้อผิดพลาดของหน้าเว็บ</h1><p>{this.state.error?.message||'ไม่ทราบสาเหตุ'}</p><button onClick={()=>location.reload()}>รีเฟรช</button></main>; return this.props.children;} }
createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>);
