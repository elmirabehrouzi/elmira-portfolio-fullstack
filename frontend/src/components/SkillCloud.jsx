import React from 'react'
export default function SkillCloud({skills=[]}){return <div className="skill-cloud">{skills.map(s=><div className={`skill-pill ${s.currently_learning?'learning':''}`} key={s.id||s.name}><i/><span>{s.name}</span>{s.level?<small>{s.level}%</small>:null}</div>)}</div>}
