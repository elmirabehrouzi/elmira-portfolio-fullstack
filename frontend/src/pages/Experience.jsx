import React from 'react'
import {BriefcaseBusiness,GraduationCap} from 'lucide-react'
import PublicLayout,{EmptyState,PageIntro} from '../components/Layout'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Experience(){
  const profile=useProfile()
  const {data:exp}=useList('/experience/')
  const {data:edu}=useList('/education/')
  const {pick,pickList,t}=useLang()
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('expEyebrow')} title={t('experience')} description={t('expDescription')}/>
    <section className="timeline-section"><div className="timeline-label"><BriefcaseBusiness/> {t('experience')}</div>{exp.length?<div className="timeline">{exp.map(e=>{const bullets=pickList(e,'bullets');return <div className="timeline-item" key={e.id}><div className="timeline-date">{e.start_label} — {e.end_label||t('present')}</div><h3>{pick(e,'role')}</h3><div className="meta-line">{e.company}</div><p>{pick(e,'description')}</p>{bullets?.length>0&&<ul>{bullets.map(x=><li key={x}>{x}</li>)}</ul>}</div>})}</div>:<EmptyState text={t('experienceEmpty')}/>}</section>
    <section className="section timeline-section"><div className="timeline-label"><GraduationCap/> {t('education')}</div>{edu.length?<div className="edu-grid">{edu.map(e=><article className="edu-card" key={e.id}><div className="eyebrow">{e.year_label}</div><h3>{pick(e,'title')}</h3><p>{e.institution}</p><small>{pick(e,'description')}</small></article>)}</div>:<EmptyState text={t('noData')}/>}</section>
  </div></PublicLayout>
}
