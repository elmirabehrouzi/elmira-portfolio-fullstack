import React,{useState} from 'react'
import {Mail,Phone,MapPin,CheckCircle2} from 'lucide-react'
import api from '../api'
import PublicLayout,{PageIntro} from '../components/Layout'
import {useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Contact(){
  const profile=useProfile()
  const {pick,t}=useLang()
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''})
  const [state,setState]=useState('idle')
  const submit=async e=>{e.preventDefault();setState('sending');try{await api.post('/contact/',form);setState('sent');setForm({name:'',email:'',subject:'',message:''})}catch{setState('error')}}
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('contactEyebrow')} title={t('contactTitle')} description={t('contactDescription')}/>
    <div className="contact-grid"><div className="contact-panel">
      <div className="contact-item"><Mail/><div><small>{t('email')}</small><strong>{profile?.email||'behroozielmira1234@gmail.com'}</strong></div></div>
      <div className="contact-item"><Phone/><div><small>{t('phone')}</small><strong>{profile?.phone||'09903599296'}</strong></div></div>
      <div className="contact-item"><MapPin/><div><small>{t('location')}</small><strong>{profile?pick(profile,'location'):'Iran'}</strong></div></div>
      <div className="map-art"><div className="map-pin"><MapPin/></div></div>
    </div><form className="contact-form" onSubmit={submit}>
      <label>{t('name')}<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
      <label>{t('email')}<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
      <label>{t('subject')}<input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}/></label>
      <label>{t('message')}<textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label>
      <button className="btn primary" disabled={state==='sending'}>{state==='sending'?t('sending'):t('send')}</button>
      {state==='sent'&&<div className="form-success"><CheckCircle2/> {t('messageSaved')}</div>}
      {state==='error'&&<div className="form-error">{t('messageFailed')}</div>}
    </form></div>
  </div></PublicLayout>
}
