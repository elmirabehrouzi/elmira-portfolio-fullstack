import React from 'react'
import {Code2,Compass,Layers3,RefreshCw} from 'lucide-react'
import PublicLayout,{PageIntro} from '../components/Layout'
import {useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function About(){
  const profile=useProfile()
  const {pick,t}=useLang()
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('aboutEyebrow')} title={t('aboutTitle')} description={profile?pick(profile,'bio'):''}/>
    <div className="about-portrait-block"><div className="about-avatar">EB.</div><div><div className="eyebrow">{t('currentDirection')}</div><h2>{t('aboutDirectionTitle')}</h2><p>{t('aboutDirectionText')}</p></div></div>
    <section className="section"><div className="section-head"><div><div className="eyebrow">{t('myApproach')}</div><h2>{t('howIWork')}</h2></div></div><div className="grid-4">
      <div className="value-card"><Code2/><h3>{t('cleanCode')}</h3><p>{t('cleanCodeDesc')}</p></div>
      <div className="value-card"><Compass/><h3>{t('curiosity')}</h3><p>{t('curiosityDesc')}</p></div>
      <div className="value-card"><Layers3/><h3>{t('productThinking')}</h3><p>{t('productThinkingDesc')}</p></div>
      <div className="value-card"><RefreshCw/><h3>{t('continuousGrowth')}</h3><p>{t('continuousGrowthDesc')}</p></div>
    </div></section>
    <section className="section"><div className="growth-banner"><div><div className="eyebrow">{t('operatingPrinciple')}</div><h2>{t('repeatMotto')}</h2></div><Code2 size={54}/></div></section>
  </div></PublicLayout>
}
