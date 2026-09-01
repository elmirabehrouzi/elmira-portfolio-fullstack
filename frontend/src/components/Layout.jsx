import React,{useState} from 'react'
import {NavLink,Link} from 'react-router-dom'
import {Menu,X,Terminal,ExternalLink,Mail,Phone,MapPin} from 'lucide-react'
import {useLang} from '../i18n'

export function Header({profile}){
  const {lang,setLang,t,pick}=useLang()
  const [open,setOpen]=useState(false)
  const links=[['/',t('home')],['/projects',t('projects')],['/about',t('about')],['/skills',t('skills')],['/experience',t('experience')],['/design',t('design')],['/lab',t('lab')],['/contact',t('contact')],['/resume',t('resume')]]
  return <header className="topbar"><div className="container nav">
    <Link className="brand" to="/"><span className="brand-mark">EB.</span><span className="brand-sub">{profile?pick(profile,'role'):'Software Developer'}</span></Link>
    <nav className={`nav-links ${open?'open':''}`}>{links.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)}>{label}</NavLink>)}</nav>
    <div className="nav-actions"><div className="lang-switch">{['en','de','fa'].map(x=><button key={x} className={lang===x?'active':''} onClick={()=>setLang(x)}>{x.toUpperCase()}</button>)}</div><button className="icon-btn mobile-toggle" onClick={()=>setOpen(!open)}>{open?<X size={19}/>:<Menu size={19}/>}</button></div>
  </div></header>
}

export function IdentityRail({profile}){
  const {pick}=useLang()
  return <aside className="side-identity"><div className="monogram">EB.</div><h3>{profile?.full_name||'Elmira Behrouzi'}</h3><div className="role">{profile?pick(profile,'role'):'Software Developer'}</div><div className="quote">{profile?pick(profile,'hero'):'Building practical digital products with code, clarity, and curiosity.'}</div><div className="side-code"><Terminal/></div><div className="side-plant"><i/><i/><i/></div></aside>
}

export function Footer({profile}){
  const {t,pick}=useLang()
  return <footer className="footer"><div className="container footer-inner"><div><strong>EB.</strong> · {t('available')}</div><div className="footer-contact"><span><Mail size={15}/>{profile?.email||'behroozielmira1234@gmail.com'}</span><span><Phone size={15}/>{profile?.phone||'09903599296'}</span><span><MapPin size={15}/>{profile?pick(profile,'location'):'Iran'}</span></div><div>EN · DE · FA</div></div></footer>
}

export default function PublicLayout({children,profile}){
  return <div className="app-shell"><Header profile={profile}/><main className="page"><div className="container page-grid"><IdentityRail profile={profile}/><section className="main-card">{children}</section></div></main><Footer profile={profile}/></div>
}

export function PageIntro({eyebrow,title,description,actions}){return <div className="page-intro"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description&&<p className="lead">{description}</p>}</div>{actions&&<div className="intro-actions">{actions}</div>}</div>}
export function EmptyState({text}){return <div className="empty-state"><Terminal size={24}/><p>{text}</p></div>}
export function Tag({children}){return <span className="chip">{children}</span>}
export function ExternalButton({href,children,variant=''}){if(!href)return null;return <a className={`btn ${variant}`} href={href} target="_blank" rel="noreferrer">{children}<ExternalLink size={15}/></a>}
