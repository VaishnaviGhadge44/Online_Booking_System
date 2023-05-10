import React, { useState, useEffect } from 'react';

function AdminPage() {
  const [loginFailure, setLoginFailure] = useState('');

  useEffect(() => {
    setLoginFailure(process.env.REACT_APP_LOGIN_FAILURE_MESSAGE);
  }, []);

  return (
    <>
      <div id='notfound'>
        <div className='notfound'>
          <div style={{ marginBottom: '30px' }}>
            <img
              src={`/assets/DF_Logo.png`}
              alt={'Client logo'}
              style={{ height: '84px' }}
            ></img>
          </div>
          <p style={{ color: 'red' }}>{loginFailure}</p>
          <h2 style={{ textTransform: 'none' }}>
            Please Contact Application Administrator
          </h2>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
