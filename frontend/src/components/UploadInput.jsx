import React,{useRef,useState} from 'react'
import {CheckCircle2,UploadCloud,XCircle} from 'lucide-react'
import api from '../api'

export default function UploadInput({value,onChange,accept='image/*,.pdf'}){
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')
  const inputRef=useRef(null)

  const upload=async e=>{
    const file=e.target.files?.[0]
    if(!file)return

    // Fail fast in the browser before Nginx/Django.
    if(file.size > 10 * 1024 * 1024){
      setError('File is too large. Maximum size is 10 MB.')
      if(inputRef.current) inputRef.current.value=''
      return
    }

    setBusy(true)
    setError('')
    const body=new FormData()
    body.append('file',file)

    try{
      const {data}=await api.post('/upload/',body)
      onChange(data.url)
    }catch(err){
      const status=err.response?.status
      const serverMessage=typeof err.response?.data==='object' ? err.response?.data?.file : null
      if(status===413) setError('File is too large. Maximum size is 10 MB.')
      else if(status===401 || status===403) setError('Your admin session expired. Sign in again and retry.')
      else setError(serverMessage || 'Upload failed. Please retry.')
    }finally{
      setBusy(false)
      if(inputRef.current) inputRef.current.value=''
    }
  }

  return <div className="upload-input">
    <label className="upload-button">
      <UploadCloud size={16}/>
      <span>{busy?'Uploading…':'Choose file'}</span>
      <input ref={inputRef} type="file" accept={accept} onChange={upload} disabled={busy}/>
    </label>
    {value&&<div className="upload-result"><CheckCircle2 size={14}/><a href={value} target="_blank" rel="noreferrer">Uploaded file</a></div>}
    {error&&<small className="upload-error"><XCircle size={13}/>{error}</small>}
  </div>
}
