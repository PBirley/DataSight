import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { streamDemoDataStop } from '../api-service';
import { resetStreamData } from '../redux/actions';

export default function HomeDash() {
  const dispatch = useDispatch();

  useEffect(() => {
    streamDemoDataStop();
    dispatch(resetStreamData());
  },[dispatch])
  
  return (
    <div>
      <button>DEMO</button>
      <button>LIVESTREAM</button>
    </div>
  )
}
