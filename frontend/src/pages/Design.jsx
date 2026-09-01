import React from 'react'
import {ArrowUpRight,PenTool} from 'lucide-react'
import PublicLayout,{EmptyState,PageIntro} from '../components/Layout'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Design(){
  const profile=useProfile()
  const {data}=useList('/design/')
  const {pick,t}=useLang()
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('designEyebrow')} title={t('designTitle')} description={t('designDescription')}/>
    {data.length?<div className="design-grid">{data.map(x=><article className="design-card" key={x.id}><div className="design-cover">{x.cover_url?<img src={x.cover_url} alt=""/>:<PenTool size={42}/>}</div><div><div className="eyebrow">{x.real_project?t('realProject'):t('personalProject')}</div><h3>{pick(x,'title')}</h3><p>{pick(x,'short')}</p><div className="chip-row">{(x.tools||[]).map(v=><span className="chip" key={v}>{v}</span>)}</div>{x.case_study_url&&<a className="text-link" href={x.case_study_url} target="_blank" rel="noreferrer">{t('caseStudy')} <ArrowUpRight size={15}/></a>}</div></article>)}</div>:<EmptyState text={t('designEmpty')}/>} 
    <section className="section"><div className="design-quote">“{t('designQuote')}”</div></section>
  </div></PublicLayout>
}
