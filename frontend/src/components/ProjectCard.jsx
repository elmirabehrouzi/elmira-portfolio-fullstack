import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowUpRight,Code2} from 'lucide-react'
import {useLang} from '../i18n'
export default function ProjectCard({project,compact=false}){
  const {pick,t,categoryLabel}=useLang()
  return <article className={`project-card ${compact?'compact':''}`}>
    <div className="project-thumb">{project.cover_url?<img src={project.cover_url} alt=""/>:<div className="placeholder-grid"><Code2/></div>}<span className="project-index">{String(project.order??0).padStart(2,'0')}</span></div>
    <div className="project-card-body"><div className="eyebrow">{categoryLabel(project.category)}</div><h3>{pick(project,'title')}</h3><p>{pick(project,'short')}</p><div className="chip-row">{(project.tech_stack||[]).slice(0,5).map(x=><span className="chip" key={x}>{x}</span>)}</div><Link className="text-link" to={`/projects/${project.slug}`}>{t('viewProject')} <ArrowUpRight size={15}/></Link></div>
  </article>
}
