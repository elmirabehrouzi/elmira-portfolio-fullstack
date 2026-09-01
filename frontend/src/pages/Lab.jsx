import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowUpRight,FlaskConical} from 'lucide-react'
import PublicLayout,{EmptyState,PageIntro} from '../components/Layout'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Lab(){
  const profile=useProfile()
  const {data}=useList('/blog/')
  const {pick,t,formatDate}=useLang()
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('labEyebrow')} title={t('labTitle')} description={t('labDescription')}/>
    {data.length?<div className="article-stack">{data.map(x=><article className="article-row" key={x.id}><div className="article-icon"><FlaskConical/></div><div><div className="eyebrow">{(x.tags||[]).join(' · ')}</div><h3>{pick(x,'title')}</h3><p>{pick(x,'excerpt')}</p><Link className="text-link" to={`/lab/${x.slug}`}>{t('readMore')} <ArrowUpRight size={15}/></Link></div><time>{formatDate(x.published_at)}</time></article>)}</div>:<EmptyState text={t('noData')}/>} 
  </div></PublicLayout>
}
