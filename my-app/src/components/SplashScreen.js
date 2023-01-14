import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { streamDemoDataStop } from '../api-service';
import { resetStreamData } from '../redux/actions';

export default function SplashScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    streamDemoDataStop();
    dispatch(resetStreamData());
  },[dispatch])
  
  return (
    <div>
      <button onClick={() => navigate('/DEMO')}>DEMO</button>
      <button onClick={() => navigate('/LIVE')}>LIVESTREAM</button>
    </div>
  )
}
