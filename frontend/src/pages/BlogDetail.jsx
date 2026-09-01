import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import {ArrowLeft,Clock3} from 'lucide-react'
import api from '../api'
import PublicLayout from '../components/Layout'
import {useProfile} from '../components/useApi'
import {useLang} from '../i18n'

export default function BlogDetail(){
  const {slug}=useParams()
  const [post,setPost]=useState(null)
  const profile=useProfile()
  const {pick,t,formatDate}=useLang()
  useEffect(()=>{api.get(`/blog/${slug}/`).then(r=>setPost(r.data)).catch(()=>{})},[slug])
  return <PublicLayout profile={profile}><div className="content-pad">{post?<article className="blog-detail"><Link className="text-link" to="/lab"><ArrowLeft size={15}/> {t('backToLab')}</Link><div className="blog-detail-head"><div className="eyebrow">{(post.tags||[]).join(' · ')}</div><h1>{pick(post,'title')}</h1><p className="lead">{pick(post,'excerpt')}</p>{post.published_at&&<div className="blog-date"><Clock3 size={14}/>{formatDate(post.published_at)}</div>}</div>{post.cover_url&&<img className="blog-cover" src={post.cover_url} alt=""/>}<div className="blog-body">{pick(post,'body')}</div></article>:<div className="skeleton big"/>}</div></PublicLayout>
}
