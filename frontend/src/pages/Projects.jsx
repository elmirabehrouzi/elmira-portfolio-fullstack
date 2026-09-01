import React,{useMemo,useState} from 'react'
import PublicLayout,{EmptyState,PageIntro} from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Projects(){
  const profile=useProfile()
  const {data}=useList('/projects/')
  const {t,categoryLabel}=useLang()
  const [filter,setFilter]=useState('all')
  const cats=useMemo(()=>['all',...new Set(data.map(x=>x.category))],[data])
  const visible=filter==='all'?data:data.filter(x=>x.category===filter)
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('projectsEyebrow')} title={t('projects')} description={t('projectsDescription')}/>
    <div className="filters">{cats.map(c=><button key={c} className={`filter-btn ${filter===c?'active':''}`} onClick={()=>setFilter(c)}>{c==='all'?t('all'):categoryLabel(c)}</button>)}</div>
    {visible.length?<div className="project-list-modern">{visible.map(p=><ProjectCard key={p.id} project={p}/>)}</div>:<EmptyState text={t('noData')}/>} 
  </div></PublicLayout>
}
