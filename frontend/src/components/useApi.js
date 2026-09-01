import {useEffect,useState} from 'react'
import api,{unwrap} from '../api'
export function useList(endpoint){const [data,setData]=useState([]),[loading,setLoading]=useState(true);const [error,setError]=useState(null);useEffect(()=>{let live=true;setLoading(true);api.get(endpoint).then(r=>{if(live)setData(unwrap(r.data))}).catch(e=>{if(live)setError(e)}).finally(()=>live&&setLoading(false));return()=>{live=false}},[endpoint]);return{data,loading,error,setData}}
export function useProfile(){const [profile,setProfile]=useState(null);useEffect(()=>{api.get('/profile/').then(r=>setProfile(unwrap(r.data)[0]||null)).catch(()=>{})},[]);return profile}
