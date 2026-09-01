import React from 'react'
import PublicLayout,{EmptyState,PageIntro} from '../components/Layout'
import SkillCloud from '../components/SkillCloud'
import {useList,useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Skills(){
  const profile=useProfile()
  const {data}=useList('/skills/')
  const {t,skillCategoryLabel}=useLang()
  const groups=[...new Set(data.map(x=>x.category))]
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('skillsEyebrow')} title={t('skills')} description={t('skillsDescription')}/>
    {groups.length?groups.map(g=><section className="skills-section" key={g}><div className="skills-heading"><span>{skillCategoryLabel(g)}</span><span>{data.filter(x=>x.category===g).length.toString().padStart(2,'0')}</span></div><SkillCloud skills={data.filter(x=>x.category===g)}/></section>):<EmptyState text={t('noData')}/>} 
    <section className="section"><div className="learning-panel"><div><div className="eyebrow">{t('next')}</div><h2>{t('currentlyLearning')}</h2></div><SkillCloud skills={data.filter(x=>x.currently_learning)}/></div></section>
  </div></PublicLayout>
}
