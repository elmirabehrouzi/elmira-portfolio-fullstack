import React,{createContext,useContext,useEffect,useMemo,useState} from 'react'

const translations={
  en:{
    home:'Home',projects:'Projects',about:'About',skills:'Skills',experience:'Experience',design:'Design',lab:'Lab / Blog',contact:'Contact',resume:'Resume',
    hello:'Hello, I\'m',viewWork:'View my work',getInTouch:'Get in touch',downloadResume:'Download resume',featured:'Featured projects',techStack:'Tech stack',whatIDo:'What I do',allProjects:'All projects',currentlyLearning:'Currently learning',
    send:'Send message',sending:'Sending…',name:'Your name',email:'Email',phone:'Phone',location:'Location',subject:'Subject',message:'Message',noData:'Nothing published here yet.',readMore:'Read more',viewProject:'View project',liveDemo:'Live demo',github:'GitHub',
    myRole:'My role',duration:'Duration',type:'Type',problem:'The problem',solution:'The solution',challenges:'Challenges & learnings',education:'Education',languages:'Languages',available:'Available for remote, freelance and full-time opportunities',admin:'Control panel',
    remote:'Remote',freelance:'Freelance',fullTime:'Full-time',
    homeStackEyebrow:'Stack',homeProjectsEyebrow:'Build / Ship / Learn',homeCapabilitiesEyebrow:'Capabilities',
    webDevelopment:'Web Development',webDevelopmentDesc:'Maintainable web applications with practical architecture.',backendDevelopment:'Backend Development',backendDevelopmentDesc:'Django, APIs, data modeling and server-side logic.',problemSolving:'Problem Solving',problemSolvingDesc:'Turning requirements into reliable technical solutions.',productPerspective:'Product Perspective',productPerspectiveDesc:'UI/UX experience that improves implementation decisions.',
    projectsEyebrow:'Build log',projectsDescription:'Real work, learning projects, APIs, automation and full-stack experiments — all in one growing archive.',all:'All',
    projectDefaultRole:'Developer',projectProblemEmpty:'Add the project problem from the control panel.',projectSolutionEmpty:'Add the solution and architecture decisions from the control panel.',projectChallengesEmpty:'Document the technical challenges, trade-offs and what you learned.',keyFeatures:'Key features',buildTestShip:'build → test → ship',
    aboutEyebrow:'Person / Process / Progress',aboutTitle:'About Me',currentDirection:'Current direction',aboutDirectionTitle:'Software first. Product-aware.',aboutDirectionText:'I’m building a long-term developer portfolio that can grow with every new technology, project and responsibility.',myApproach:'My approach',howIWork:'How I work',cleanCode:'Clean Code',cleanCodeDesc:'Readable structure and intentional implementation.',curiosity:'Curiosity',curiosityDesc:'Explore the why before choosing the how.',productThinking:'Product Thinking',productThinkingDesc:'Technical choices with user and business context.',continuousGrowth:'Continuous Growth',continuousGrowthDesc:'Every project should expand the stack.',operatingPrinciple:'The operating principle',repeatMotto:'Code. Build. Improve. Repeat.',
    skillsEyebrow:'Stack / Tools / Methods',skillsDescription:'A living map of the technologies and methods I actually work with.',next:'Next',
    expEyebrow:'Work / Learning',expDescription:'A timeline that grows as my professional scope expands.',present:'Present',experienceEmpty:'Add your internship and future work experience from the control panel.',
    designEyebrow:'Complementary skill',designTitle:'Design & UI/UX',designDescription:'Selected interface work — supporting my developer identity, not replacing it.',realProject:'Real project',personalProject:'Personal project',caseStudy:'Case study',designEmpty:'Add your real Figma projects from the control panel.',designQuote:'Design gives me a stronger product perspective. Code remains the core of what I build.',
    labEyebrow:'Learn in public',labTitle:'Lab / Blog',labDescription:'Technical notes, experiments, tutorials and the things I learn while building.',backToLab:'Lab / Blog',
    contactEyebrow:'Open channel',contactTitle:'Let’s Connect',contactDescription:'Have a project, opportunity or idea? Send it directly to my portfolio inbox.',messageSaved:'Message saved. You can see it in the control panel.',messageFailed:'Could not send. Please try again.',
    resumeEyebrow:'CV / Profile',resumeDescription:'One profile, three language versions.',resumeNotice:'Upload the three PDF resumes from Control Panel → Site Profile, then click “Save profile”.',resumeProfile:'Profile',resumeCoreStack:'Core Stack',resumeContact:'Contact',resumeSummaryEmpty:'Your professional summary will appear here.',resumeDownloadPdf:'Download PDF',resumeUnavailable:'Not uploaded yet',
    languageEnglish:'English (EN)',languageGerman:'Deutsch (DE)',languagePersian:'فارسی (FA)',
    category_backend:'Backend',category_fullstack:'Full Stack',category_api:'API',category_automation:'Automation',category_data:'Data',category_frontend:'Frontend',category_other:'Other',
    skill_programming:'Programming',skill_backend:'Backend',skill_frontend:'Frontend',skill_database:'Database',skill_tools:'Tools',skill_design:'Design',skill_professional:'Professional'
  },
  fa:{
    home:'خانه',projects:'پروژه‌ها',about:'درباره من',skills:'مهارت‌ها',experience:'سوابق',design:'طراحی',lab:'آزمایشگاه / وبلاگ',contact:'ارتباط',resume:'رزومه',
    hello:'سلام، من',viewWork:'مشاهده پروژه‌ها',getInTouch:'ارتباط با من',downloadResume:'دانلود رزومه',featured:'پروژه‌های منتخب',techStack:'فناوری‌ها و ابزارها',whatIDo:'حوزه‌های کاری من',allProjects:'مشاهده همه پروژه‌ها',currentlyLearning:'در حال یادگیری',
    send:'ارسال پیام',sending:'در حال ارسال…',name:'نام شما',email:'ایمیل',phone:'شماره تماس',location:'موقعیت',subject:'موضوع',message:'متن پیام',noData:'هنوز محتوایی در این بخش منتشر نشده است.',readMore:'ادامه مطلب',viewProject:'مشاهده پروژه',liveDemo:'نسخه آنلاین',github:'گیت‌هاب',
    myRole:'نقش من',duration:'مدت پروژه',type:'نوع پروژه',problem:'مسئله پروژه',solution:'راه‌حل',challenges:'چالش‌ها و آموخته‌ها',education:'تحصیلات',languages:'زبان‌ها',available:'آماده همکاری به‌صورت ریموت، فریلنس و تمام‌وقت',admin:'پنل مدیریت',
    remote:'ریموت',freelance:'فریلنس',fullTime:'تمام‌وقت',
    homeStackEyebrow:'مهارت‌های فنی',homeProjectsEyebrow:'ساخت / انتشار / یادگیری',homeCapabilitiesEyebrow:'توانمندی‌ها',
    webDevelopment:'توسعه وب',webDevelopmentDesc:'ساخت وب‌اپلیکیشن‌های قابل نگهداری با معماری کاربردی و منظم.',backendDevelopment:'توسعه بک‌اند',backendDevelopmentDesc:'پیاده‌سازی منطق سمت سرور، API، مدل‌سازی داده و توسعه با Django.',problemSolving:'حل مسئله',problemSolvingDesc:'تبدیل نیازهای واقعی به راه‌حل‌های فنی قابل اتکا.',productPerspective:'دید محصول',productPerspectiveDesc:'استفاده از تجربه UI/UX برای تصمیم‌گیری بهتر در پیاده‌سازی محصول.',
    projectsEyebrow:'آرشیو ساخت پروژه',projectsDescription:'مجموعه‌ای رو‌به‌رشد از پروژه‌های واقعی، تمرینی، APIها، اتوماسیون و پروژه‌های فول‌استک.',all:'همه',
    projectDefaultRole:'توسعه‌دهنده',projectProblemEmpty:'مسئله این پروژه را از پنل مدیریت وارد کنید.',projectSolutionEmpty:'راه‌حل و تصمیم‌های معماری این پروژه را از پنل مدیریت وارد کنید.',projectChallengesEmpty:'چالش‌های فنی، تصمیم‌های مهم و چیزهایی که از پروژه آموختید را ثبت کنید.',keyFeatures:'قابلیت‌های کلیدی',buildTestShip:'ساخت → تست → انتشار',
    aboutEyebrow:'مسیر / فرآیند / رشد',aboutTitle:'درباره من',currentDirection:'مسیر فعلی',aboutDirectionTitle:'اول نرم‌افزار؛ با درک محصول.',aboutDirectionText:'این پرتفولیو را به‌عنوان یک مسیر بلندمدت توسعه می‌دهم تا با هر فناوری، پروژه و مسئولیت جدید رشد کند.',myApproach:'رویکرد من',howIWork:'چطور کار می‌کنم',cleanCode:'کدنویسی تمیز',cleanCodeDesc:'ساختار خوانا، قابل نگهداری و پیاده‌سازی هدفمند.',curiosity:'کنجکاوی',curiosityDesc:'قبل از انتخاب روش اجرا، دلیل مسئله را بررسی می‌کنم.',productThinking:'تفکر محصول',productThinkingDesc:'تصمیم‌های فنی را با توجه به نیاز کاربر و هدف کسب‌وکار می‌گیرم.',continuousGrowth:'رشد مستمر',continuousGrowthDesc:'هر پروژه باید مهارت و دانش فنی من را یک مرحله جلوتر ببرد.',operatingPrinciple:'اصل کاری من',repeatMotto:'کدنویسی. ساختن. بهتر کردن. تکرار.',
    skillsEyebrow:'فناوری‌ها / ابزارها / روش‌ها',skillsDescription:'نمایی زنده از فناوری‌ها، ابزارها و روش‌هایی که واقعاً با آن‌ها کار می‌کنم.',next:'مرحله بعد',
    expEyebrow:'کار / یادگیری',expDescription:'مسیر حرفه‌ای من که هم‌زمان با گسترش تخصص و تجربه‌ام کامل‌تر می‌شود.',present:'تاکنون',experienceEmpty:'سابقه کارآموزی و تجربه‌های کاری بعدی را از پنل مدیریت اضافه کنید.',
    designEyebrow:'مهارت مکمل',designTitle:'طراحی و UI/UX',designDescription:'بخشی از تجربه‌های طراحی رابط کاربری؛ مهارتی مکمل در کنار هویت اصلی من به‌عنوان توسعه‌دهنده.',realProject:'پروژه واقعی',personalProject:'پروژه شخصی',caseStudy:'مطالعه موردی',designEmpty:'پروژه‌های واقعی Figma را از پنل مدیریت اضافه کنید.',designQuote:'تجربه طراحی، دید محصول قوی‌تری به من می‌دهد؛ اما هسته اصلی کار من همچنان برنامه‌نویسی است.',
    labEyebrow:'یادگیری در مسیر ساختن',labTitle:'آزمایشگاه / وبلاگ',labDescription:'یادداشت‌های فنی، آزمایش‌ها، آموزش‌ها و چیزهایی که هنگام ساخت پروژه‌ها یاد می‌گیرم.',backToLab:'آزمایشگاه / وبلاگ',
    contactEyebrow:'راه ارتباطی',contactTitle:'در ارتباط باشیم',contactDescription:'اگر پیشنهاد همکاری، پروژه یا ایده‌ای دارید، از همین فرم مستقیم برای من پیام بفرستید.',messageSaved:'پیام با موفقیت ثبت شد و در پنل مدیریت قابل مشاهده است.',messageFailed:'ارسال پیام ناموفق بود. لطفاً دوباره تلاش کنید.',
    resumeEyebrow:'رزومه / سوابق حرفه‌ای',resumeDescription:'رزومه من در سه نسخه فارسی، انگلیسی و آلمانی.',resumeNotice:'سه فایل PDF رزومه را از مسیر پنل مدیریت ← پروفایل سایت آپلود کنید و سپس «ذخیره پروفایل» را بزنید.',resumeProfile:'معرفی حرفه‌ای',resumeCoreStack:'فناوری‌های اصلی',resumeContact:'اطلاعات تماس',resumeSummaryEmpty:'خلاصه حرفه‌ای شما در این بخش نمایش داده می‌شود.',resumeDownloadPdf:'دانلود PDF',resumeUnavailable:'هنوز فایل رزومه بارگذاری نشده',
    languageEnglish:'انگلیسی (EN)',languageGerman:'آلمانی (DE)',languagePersian:'فارسی (FA)',
    category_backend:'بک‌اند',category_fullstack:'فول‌استک',category_api:'API',category_automation:'اتوماسیون',category_data:'داده',category_frontend:'فرانت‌اند',category_other:'سایر',
    skill_programming:'زبان‌های برنامه‌نویسی',skill_backend:'بک‌اند',skill_frontend:'فرانت‌اند',skill_database:'پایگاه داده',skill_tools:'ابزارها',skill_design:'طراحی',skill_professional:'مهارت‌های حرفه‌ای'
  },
  de:{
    home:'Start',projects:'Projekte',about:'Über mich',skills:'Skills',experience:'Erfahrung',design:'Design',lab:'Lab / Blog',contact:'Kontakt',resume:'Lebenslauf',
    hello:'Hallo, ich bin',viewWork:'Projekte ansehen',getInTouch:'Kontakt aufnehmen',downloadResume:'Lebenslauf herunterladen',featured:'Ausgewählte Projekte',techStack:'Technologien & Tools',whatIDo:'Was ich mache',allProjects:'Alle Projekte',currentlyLearning:'Aktuell lerne ich',
    send:'Nachricht senden',sending:'Wird gesendet…',name:'Ihr Name',email:'E-Mail',phone:'Telefon',location:'Standort',subject:'Betreff',message:'Nachricht',noData:'Hier wurde noch nichts veröffentlicht.',readMore:'Mehr lesen',viewProject:'Projekt ansehen',liveDemo:'Live-Demo',github:'GitHub',
    myRole:'Meine Rolle',duration:'Dauer',type:'Projekttyp',problem:'Die Problemstellung',solution:'Die Lösung',challenges:'Herausforderungen & Erkenntnisse',education:'Ausbildung',languages:'Sprachen',available:'Verfügbar für Remote-, Freelance- und Vollzeitmöglichkeiten',admin:'Control Panel',
    remote:'Remote',freelance:'Freelance',fullTime:'Vollzeit',
    homeStackEyebrow:'Stack',homeProjectsEyebrow:'Build / Ship / Learn',homeCapabilitiesEyebrow:'Kompetenzen',
    webDevelopment:'Webentwicklung',webDevelopmentDesc:'Wartbare Webanwendungen mit praxisnaher Architektur.',backendDevelopment:'Backend-Entwicklung',backendDevelopmentDesc:'Django, APIs, Datenmodellierung und serverseitige Logik.',problemSolving:'Problemlösung',problemSolvingDesc:'Anforderungen in zuverlässige technische Lösungen übersetzen.',productPerspective:'Produktperspektive',productPerspectiveDesc:'UI/UX-Erfahrung für bessere Entscheidungen bei der Umsetzung.',
    projectsEyebrow:'Build Log',projectsDescription:'Reale Arbeiten, Lernprojekte, APIs, Automatisierung und Full-Stack-Experimente in einem wachsenden Archiv.',all:'Alle',
    projectDefaultRole:'Entwicklerin',projectProblemEmpty:'Fügen Sie die Problemstellung im Control Panel hinzu.',projectSolutionEmpty:'Fügen Sie Lösung und Architekturentscheidungen im Control Panel hinzu.',projectChallengesEmpty:'Dokumentieren Sie technische Herausforderungen, Abwägungen und Erkenntnisse.',keyFeatures:'Wichtige Funktionen',buildTestShip:'bauen → testen → veröffentlichen',
    aboutEyebrow:'Person / Prozess / Fortschritt',aboutTitle:'Über mich',currentDirection:'Aktuelle Richtung',aboutDirectionTitle:'Software zuerst. Produktbewusst.',aboutDirectionText:'Ich baue ein langfristiges Entwicklerportfolio auf, das mit jeder neuen Technologie, jedem Projekt und jeder Verantwortung wächst.',myApproach:'Meine Arbeitsweise',howIWork:'Wie ich arbeite',cleanCode:'Clean Code',cleanCodeDesc:'Lesbare Struktur und bewusste Umsetzung.',curiosity:'Neugier',curiosityDesc:'Zuerst das Warum verstehen, dann das Wie wählen.',productThinking:'Produktdenken',productThinkingDesc:'Technische Entscheidungen im Kontext von Nutzer- und Geschäftsanforderungen.',continuousGrowth:'Kontinuierliches Lernen',continuousGrowthDesc:'Jedes Projekt soll meinen technischen Stack erweitern.',operatingPrinciple:'Mein Arbeitsprinzip',repeatMotto:'Coden. Bauen. Verbessern. Wiederholen.',
    skillsEyebrow:'Stack / Tools / Methoden',skillsDescription:'Eine lebendige Übersicht über Technologien und Methoden, mit denen ich tatsächlich arbeite.',next:'Als Nächstes',
    expEyebrow:'Arbeit / Lernen',expDescription:'Ein beruflicher Weg, der mit wachsendem Fachwissen und neuen Verantwortungen weiterwächst.',present:'Heute',experienceEmpty:'Fügen Sie Praktikum und zukünftige Berufserfahrung im Control Panel hinzu.',
    designEyebrow:'Ergänzende Kompetenz',designTitle:'Design & UI/UX',designDescription:'Ausgewählte Interface-Arbeiten als Ergänzung zu meiner Entwickleridentität.',realProject:'Reales Projekt',personalProject:'Eigenes Projekt',caseStudy:'Case Study',designEmpty:'Fügen Sie Ihre realen Figma-Projekte im Control Panel hinzu.',designQuote:'Design stärkt meine Produktperspektive. Der Kern meiner Arbeit bleibt die Softwareentwicklung.',
    labEyebrow:'Öffentlich lernen',labTitle:'Lab / Blog',labDescription:'Technische Notizen, Experimente, Tutorials und Erkenntnisse aus meinen Projekten.',backToLab:'Lab / Blog',
    contactEyebrow:'Kontaktkanal',contactTitle:'Kontakt aufnehmen',contactDescription:'Haben Sie ein Projekt, eine Gelegenheit oder eine Idee? Schreiben Sie mir direkt über dieses Formular.',messageSaved:'Nachricht gespeichert. Sie ist im Control Panel sichtbar.',messageFailed:'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    resumeEyebrow:'CV / Profil',resumeDescription:'Mein Lebenslauf in drei Sprachversionen.',resumeNotice:'Laden Sie die drei PDF-Lebensläufe unter Control Panel → Site Profile hoch und klicken Sie anschließend auf „Save profile“.',resumeProfile:'Profil',resumeCoreStack:'Kerntechnologien',resumeContact:'Kontakt',resumeSummaryEmpty:'Ihre berufliche Zusammenfassung erscheint hier.',resumeDownloadPdf:'PDF herunterladen',resumeUnavailable:'Noch nicht hochgeladen',
    languageEnglish:'Englisch (EN)',languageGerman:'Deutsch (DE)',languagePersian:'Persisch (FA)',
    category_backend:'Backend',category_fullstack:'Full Stack',category_api:'API',category_automation:'Automatisierung',category_data:'Daten',category_frontend:'Frontend',category_other:'Sonstiges',
    skill_programming:'Programmiersprachen',skill_backend:'Backend',skill_frontend:'Frontend',skill_database:'Datenbank',skill_tools:'Tools',skill_design:'Design',skill_professional:'Berufliche Skills'
  }
}

const LangContext=createContext(null)
const locales={en:'en-US',fa:'fa-IR',de:'de-DE'}

export function LangProvider({children}){
  const [lang,setLang]=useState(localStorage.getItem('eb_lang')||'en')
  useEffect(()=>{
    localStorage.setItem('eb_lang',lang)
    document.documentElement.lang=lang
    document.documentElement.dir=lang==='fa'?'rtl':'ltr'
  },[lang])

  const value=useMemo(()=>({
    lang,
    setLang,
    t:(key)=>translations[lang]?.[key]??translations.en[key]??key,
    pick:(obj,key)=>obj?.[`${key}_${lang}`]||obj?.[`${key}_en`]||'',
    pickList:(obj,key)=>obj?.[`${key}_${lang}`]||obj?.[`${key}_en`]||obj?.[key]||[],
    categoryLabel:(value)=>translations[lang]?.[`category_${value}`]??translations.en[`category_${value}`]??value,
    skillCategoryLabel:(value)=>translations[lang]?.[`skill_${value}`]??translations.en[`skill_${value}`]??value,
    formatDate:(value)=>value?new Intl.DateTimeFormat(locales[lang]||locales.en,{year:'numeric',month:'short',day:'numeric'}).format(new Date(value)):'',
    resumeUrl:(profile)=>profile?.[`resume_${lang}_url`]||''
  }),[lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang=()=>useContext(LangContext)
