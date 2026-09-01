import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import {LangProvider} from './i18n'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Design from './pages/Design'
import Lab from './pages/Lab'
import Contact from './pages/Contact'
import Resume from './pages/Resume'
import Login from './pages/admin/Login'
import Overview from './pages/admin/Overview'
import Messages from './pages/admin/Messages'
import Profile from './pages/admin/Profile'
import Settings from './pages/admin/Settings'
import BlogDetail from './pages/BlogDetail'
import {ProjectsManager,SkillsManager,ExperienceManager,EducationManager,DesignManager,BlogManager} from './pages/admin/managers'
import ProtectedRoute from './components/ProtectedRoute'
const P=({children})=><ProtectedRoute>{children}</ProtectedRoute>
export default function App(){return <LangProvider><Routes>
<Route path="/" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/about" element={<About/>}/><Route path="/skills" element={<Skills/>}/><Route path="/experience" element={<Experience/>}/><Route path="/design" element={<Design/>}/><Route path="/lab" element={<Lab/>}/><Route path="/lab/:slug" element={<BlogDetail/>}/><Route path="/contact" element={<Contact/>}/><Route path="/resume" element={<Resume/>}/>
<Route path="/control/login" element={<Login/>}/><Route path="/control" element={<P><Overview/></P>}/><Route path="/control/projects" element={<P><ProjectsManager/></P>}/><Route path="/control/messages" element={<P><Messages/></P>}/><Route path="/control/blog" element={<P><BlogManager/></P>}/><Route path="/control/skills" element={<P><SkillsManager/></P>}/><Route path="/control/experience" element={<P><ExperienceManager/></P>}/><Route path="/control/education" element={<P><EducationManager/></P>}/><Route path="/control/design" element={<P><DesignManager/></P>}/><Route path="/control/profile" element={<P><Profile/></P>}/><Route path="/control/settings" element={<P><Settings/></P>}/>
<Route path="*" element={<Navigate to="/" replace/>}/></Routes></LangProvider>}
