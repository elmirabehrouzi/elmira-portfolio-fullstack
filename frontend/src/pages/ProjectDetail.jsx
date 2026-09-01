import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import {ArrowLeft,CheckCircle2,Code2} from 'lucide-react'
import api from '../api'
import PublicLayout,{ExternalButton,Tag} from '../components/Layout'
import {useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function ProjectDetail(){
  const {slug}=useParams()
  const [project,setProject]=useState(null)
  const profile=useProfile()
  const {pick,pickList,t,categoryLabel}=useLang()
  useEffect(()=>{api.get(`/projects/${slug}/`).then(r=>setProject(r.data)).catch(()=>{})},[slug])
  if(!project)return <PublicLayout profile={profile}><div className="content-pad"><div className="skeleton big"/></div></PublicLayout>
  const features=pickList(project,'features')
  return <PublicLayout profile={profile}><div className="content-pad">
    <Link className="text-link" to="/projects"><ArrowLeft size={15}/> {t('projects')}</Link>
    <section className="project-detail-hero"><div><div className="eyebrow">{categoryLabel(project.category)}</div><h1>{pick(project,'title')}</h1><p className="lead">{pick(project,'description')||pick(project,'short')}</p><div className="hero-actions"><ExternalButton href={project.live_url} variant="green">{t('liveDemo')}</ExternalButton><ExternalButton href={project.github_url}>{t('github')}</ExternalButton></div></div><div className="project-showcase">{project.cover_url?<img src={project.cover_url} alt=""/>:<div className="terminal-art"><Code2 size={64}/><span>{t('buildTestShip')}</span></div>}</div></section>
    <div className="project-meta-grid"><div><span>{t('myRole')}</span><strong>{project.role||t('projectDefaultRole')}</strong></div><div><span>{t('duration')}</span><strong>{project.duration||'—'}</strong></div><div><span>{t('type')}</span><strong>{project.project_type||categoryLabel(project.category)}</strong></div></div>
    <section className="section two-col"><div className="story-box"><div className="eyebrow">01</div><h2>{t('problem')}</h2><p>{pick(project,'problem')||t('projectProblemEmpty')}</p></div><div className="story-box"><div className="eyebrow">02</div><h2>{t('solution')}</h2><p>{pick(project,'solution')||t('projectSolutionEmpty')}</p></div></section>
    <section className="section"><h2>{t('techStack')}</h2><div className="chip-row">{(project.tech_stack||[]).map(x=><Tag key={x}>{x}</Tag>)}</div></section>
    {features?.length>0&&<section className="section"><h2>{t('keyFeatures')}</h2><div className="feature-list">{features.map(x=><div key={x}><CheckCircle2 size={17}/>{x}</div>)}</div></section>}
    <section className="section story-box"><div className="eyebrow">03</div><h2>{t('challenges')}</h2><p>{pick(project,'challenges')||t('projectChallengesEmpty')}</p></section>
  </div></PublicLayout>
}
