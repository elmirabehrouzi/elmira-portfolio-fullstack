from django.core.management.base import BaseCommand
from portfolio.models import SiteProfile, Skill
class Command(BaseCommand):
    help='Seed safe starter profile and known skills.'
    def handle(self,*args,**kwargs):
        SiteProfile.objects.get_or_create(id=1,defaults={
            'full_name':'Elmira Behrouzi',
            'role_en':'Software Developer', 'role_fa':'توسعه‌دهنده نرم‌افزار', 'role_de':'Softwareentwicklerin',
            'hero_en':'Building practical digital products with code, clarity, and curiosity.',
            'hero_fa':'ساخت محصولات دیجیتال کاربردی با کد، دقت و کنجکاوی.',
            'hero_de':'Praktische digitale Produkte mit Code, Klarheit und Neugier entwickeln.',
            'bio_en':'I am a software developer growing my expertise across backend development, web technologies, and product thinking. My UI/UX background helps me build with both technical and user perspectives in mind.',
            'bio_fa':'من یک توسعه‌دهنده نرم‌افزار هستم که دامنه تخصصم را در توسعه بک‌اند، فناوری‌های وب و تفکر محصول گسترش می‌دهم. تجربه UI/UX کمک می‌کند محصول را هم از دید فنی و هم از دید کاربر ببینم.',
            'bio_de':'Ich bin Softwareentwicklerin und erweitere meine Kenntnisse in Backend-Entwicklung, Webtechnologien und Product Thinking. Mein UI/UX-Hintergrund hilft mir, technische und nutzerorientierte Perspektiven zu verbinden.',
            'email':'behroozielmira1234@gmail.com','phone':'09903599296','location_en':'Iran','location_fa':'ایران','location_de':'Iran'
        })
        skills=[
            ('Python','programming',80),('Django','backend',80),('HTML','frontend',85),('CSS','frontend',85),('Figma','design',85),
            ('UI Design','design',80),('UX Design','design',75),('Proposal Writing','professional',80),('Contract Writing','professional',80),
            ('Git','tools',60),('GitHub','tools',60)
        ]
        for i,(name,cat,level) in enumerate(skills):
            Skill.objects.get_or_create(name=name,defaults={'category':cat,'level':level,'order':i})
        self.stdout.write(self.style.SUCCESS('Starter profile and skills are ready.'))
