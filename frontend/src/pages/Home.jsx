import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowRight,Braces,Database,Zap,LayoutDashboard,Download,MapPin} from 'lucide-react'
import PublicLayout,{EmptyState} from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import SkillCloud from '../components/SkillCloud'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Home(){
  const profile=useProfile()
  const {data:projects}=useList('/projects/')
  const {data:skills}=useList('/skills/')
  const {pick,t,resumeUrl}=useLang()
  const featured=projects.filter(p=>p.featured).slice(0,3)
  const shown=featured.length?featured:projects.slice(0,3)
  const currentResume=resumeUrl(profile)
  const availability=[profile?.available_remote!==false&&t('remote'),profile?.available_freelance!==false&&t('freelance'),profile?.available_full_time!==false&&t('fullTime')].filter(Boolean).join(' · ')

  return <PublicLayout profile={profile}><div className="content-pad">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">{t('hello')}</div>
        <h1>Elmira <span className="accent">Behrouzi</span></h1>
        <div className="hero-role">{profile?pick(profile,'role'):'Software Developer'}</div>
        <p className="lead">{profile?pick(profile,'hero'):'Building practical digital products with code, clarity, and curiosity.'}</p>
        <div className="hero-actions">
          <Link className="btn primary" to="/projects">{t('viewWork')} <ArrowRight size={16}/></Link>
          <Link className="btn" to="/contact">{t('getInTouch')}</Link>
          {currentResume&&<a className="btn" href={currentResume} download><Download size={15}/>{t('downloadResume')}</a>}
        </div>
        <div className="availability"><span className="pulse-dot"/> {availability} {profile&&pick(profile,'location')&&<><span className="sep">/</span><MapPin size={14}/>{pick(profile,'location')}</>}</div>
      </div>
      <div className="hero-visual"><div className="portrait-shell">{profile?.avatar_url?<img src={profile.avatar_url} alt="Elmira Behrouzi"/>:<div className="avatar-type">EB</div>}</div><div className="orbit"/><div className="code-float">&lt;/&gt;</div><div className="hero-note">Python · Django · Web</div></div>
    </section>

    <section className="section"><div className="section-head"><div><div className="eyebrow">{t('homeStackEyebrow')}</div><h2>{t('techStack')}</h2></div></div><SkillCloud skills={skills.slice(0,12)}/></section>

    <section className="section"><div className="section-head"><div><div className="eyebrow">{t('homeProjectsEyebrow')}</div><h2>{t('featured')}</h2></div><Link className="text-link" to="/projects">{t('allProjects')} <ArrowRight size={15}/></Link></div>{shown.length?<div className="grid-3">{shown.map(p=><ProjectCard key={p.id} project={p} compact/>)}</div>:<EmptyState text={t('noData')}/>}</section>

    <section className="section"><div className="section-head"><div><div className="eyebrow">{t('homeCapabilitiesEyebrow')}</div><h2>{t('whatIDo')}</h2></div></div><div className="grid-4 capability-grid">
      <div className="capability"><Braces/><h3>{t('webDevelopment')}</h3><p>{t('webDevelopmentDesc')}</p></div>
      <div className="capability"><Database/><h3>{t('backendDevelopment')}</h3><p>{t('backendDevelopmentDesc')}</p></div>
      <div className="capability"><Zap/><h3>{t('problemSolving')}</h3><p>{t('problemSolvingDesc')}</p></div>
      <div className="capability"><LayoutDashboard/><h3>{t('productPerspective')}</h3><p>{t('productPerspectiveDesc')}</p></div>
    </div></section>
  </div></PublicLayout>
}
