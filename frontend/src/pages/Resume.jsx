import React from 'react'
import {Download} from 'lucide-react'
import PublicLayout,{PageIntro} from '../components/Layout'
import {useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function Resume(){
  const profile=useProfile()
  const {pick,t}=useLang()
  const files=[
    [t('languageEnglish'),profile?.resume_en_url,'Elmira-Behrouzi-Resume-EN.pdf'],
    [t('languageGerman'),profile?.resume_de_url,'Elmira-Behrouzi-Resume-DE.pdf'],
    [t('languagePersian'),profile?.resume_fa_url,'Elmira-Behrouzi-Resume-FA.pdf']
  ]
  return <PublicLayout profile={profile}><div className="content-pad">
    <PageIntro eyebrow={t('resumeEyebrow')} title={t('resume')} description={t('resumeDescription')}/>
    <div className="resume-grid"><div className="download-stack">
      {files.map(([label,url,filename])=>url?<a key={label} className="download-card" href={url} download={filename}><div><small>{t('resumeDownloadPdf')}</small><strong>{label}</strong></div><Download size={18}/></a>:<div key={label} className="download-card disabled"><div><small>{t('resumeUnavailable')}</small><strong>{label}</strong></div><Download size={18}/></div>)}
      <p className="notice">{t('resumeNotice')}</p>
    </div><div className="resume-paper"><div className="resume-head"><div className="resume-avatar">EB</div><div><h2>{profile?.full_name||'Elmira Behrouzi'}</h2><p>{profile?pick(profile,'role'):'Software Developer'}</p></div></div><hr/><h3>{t('resumeProfile')}</h3><p>{(profile?pick(profile,'bio'):'')||t('resumeSummaryEmpty')}</p><h3>{t('resumeCoreStack')}</h3><p>Python · Django · HTML · CSS · Git · UI/UX</p><h3>{t('resumeContact')}</h3><p>{profile?.email||'behroozielmira1234@gmail.com'}<br/>{profile?.phone||'09903599296'}</p></div></div>
  </div></PublicLayout>
}
