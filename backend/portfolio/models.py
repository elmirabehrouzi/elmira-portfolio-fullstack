from django.db import models
from django.utils.text import slugify

class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

class SiteProfile(TimestampedModel):
    full_name = models.CharField(max_length=160, default='Elmira Behrouzi')
    role_en = models.CharField(max_length=180, default='Software Developer')
    role_fa = models.CharField(max_length=180, default='توسعه‌دهنده نرم‌افزار', blank=True)
    role_de = models.CharField(max_length=180, default='Softwareentwicklerin', blank=True)
    hero_en = models.TextField(blank=True, default='Building practical digital products with code, clarity, and curiosity.')
    hero_fa = models.TextField(blank=True, default='ساخت محصولات دیجیتال کاربردی با کد، دقت و کنجکاوی.')
    hero_de = models.TextField(blank=True, default='Praktische digitale Produkte mit Code, Klarheit und Neugier entwickeln.')
    bio_en = models.TextField(blank=True)
    bio_fa = models.TextField(blank=True)
    bio_de = models.TextField(blank=True)
    email = models.EmailField(default='behroozielmira1234@gmail.com')
    phone = models.CharField(max_length=50, default='09903599296')
    location_en = models.CharField(max_length=160, blank=True, default='Iran')
    location_fa = models.CharField(max_length=160, blank=True, default='ایران')
    location_de = models.CharField(max_length=160, blank=True, default='Iran')
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    behance_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    resume_en_url = models.URLField(blank=True)
    resume_fa_url = models.URLField(blank=True)
    resume_de_url = models.URLField(blank=True)
    avatar_url = models.URLField(blank=True)
    available_remote = models.BooleanField(default=True)
    available_freelance = models.BooleanField(default=True)
    available_full_time = models.BooleanField(default=True)

    def __str__(self): return self.full_name

class Project(TimestampedModel):
    CATEGORY_CHOICES = [
        ('backend','Backend'), ('fullstack','Full Stack'), ('api','API'), ('automation','Automation'),
        ('data','Data'), ('frontend','Frontend'), ('other','Other')
    ]
    title_en = models.CharField(max_length=180)
    title_fa = models.CharField(max_length=180, blank=True)
    title_de = models.CharField(max_length=180, blank=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_en = models.TextField(blank=True)
    short_fa = models.TextField(blank=True)
    short_de = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    description_fa = models.TextField(blank=True)
    description_de = models.TextField(blank=True)
    problem_en = models.TextField(blank=True)
    problem_fa = models.TextField(blank=True)
    problem_de = models.TextField(blank=True)
    solution_en = models.TextField(blank=True)
    solution_fa = models.TextField(blank=True)
    solution_de = models.TextField(blank=True)
    challenges_en = models.TextField(blank=True)
    challenges_fa = models.TextField(blank=True)
    challenges_de = models.TextField(blank=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='backend')
    tech_stack = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    cover_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    role = models.CharField(max_length=180, blank=True)
    duration = models.CharField(max_length=100, blank=True)
    project_type = models.CharField(max_length=100, blank=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_at']
    def save(self,*args,**kwargs):
        if not self.slug: self.slug = slugify(self.title_en)
        super().save(*args,**kwargs)
    def __str__(self): return self.title_en

class Skill(TimestampedModel):
    CATEGORY_CHOICES=[('programming','Programming'),('backend','Backend'),('frontend','Frontend'),('database','Database'),('tools','Tools'),('design','Design'),('professional','Professional')]
    name = models.CharField(max_length=120)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    level = models.PositiveSmallIntegerField(default=70)
    icon = models.CharField(max_length=80, blank=True)
    currently_learning = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    class Meta: ordering=['category','order','name']
    def __str__(self): return self.name

class Experience(TimestampedModel):
    role_en = models.CharField(max_length=180)
    role_fa = models.CharField(max_length=180, blank=True)
    role_de = models.CharField(max_length=180, blank=True)
    company = models.CharField(max_length=180, blank=True)
    start_label = models.CharField(max_length=60, blank=True)
    end_label = models.CharField(max_length=60, blank=True)
    description_en = models.TextField(blank=True)
    description_fa = models.TextField(blank=True)
    description_de = models.TextField(blank=True)
    bullets = models.JSONField(default=list, blank=True)
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering=['order','-created_at']
    def __str__(self): return f'{self.role_en} - {self.company}'

class Education(TimestampedModel):
    title_en = models.CharField(max_length=180)
    title_fa = models.CharField(max_length=180, blank=True)
    title_de = models.CharField(max_length=180, blank=True)
    institution = models.CharField(max_length=180, blank=True)
    year_label = models.CharField(max_length=80, blank=True)
    description_en = models.TextField(blank=True)
    description_fa = models.TextField(blank=True)
    description_de = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=True)
    class Meta: ordering=['order','-created_at']
    def __str__(self): return self.title_en

class DesignProject(TimestampedModel):
    title_en = models.CharField(max_length=180)
    title_fa = models.CharField(max_length=180, blank=True)
    title_de = models.CharField(max_length=180, blank=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    short_en = models.TextField(blank=True)
    short_fa = models.TextField(blank=True)
    short_de = models.TextField(blank=True)
    tools = models.JSONField(default=list, blank=True)
    cover_url = models.URLField(blank=True)
    case_study_url = models.URLField(blank=True)
    real_project = models.BooleanField(default=True)
    published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    class Meta: ordering=['order','-created_at']
    def save(self,*args,**kwargs):
        if not self.slug: self.slug=slugify(self.title_en)
        super().save(*args,**kwargs)
    def __str__(self): return self.title_en

class BlogPost(TimestampedModel):
    title_en = models.CharField(max_length=220)
    title_fa = models.CharField(max_length=220, blank=True)
    title_de = models.CharField(max_length=220, blank=True)
    slug = models.SlugField(max_length=240, unique=True, blank=True)
    excerpt_en = models.TextField(blank=True)
    excerpt_fa = models.TextField(blank=True)
    excerpt_de = models.TextField(blank=True)
    body_en = models.TextField(blank=True)
    body_fa = models.TextField(blank=True)
    body_de = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    cover_url = models.URLField(blank=True)
    published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    class Meta: ordering=['-published_at','-created_at']
    def save(self,*args,**kwargs):
        from django.utils import timezone
        if not self.slug: self.slug=slugify(self.title_en)
        if self.published and not self.published_at: self.published_at=timezone.now()
        super().save(*args,**kwargs)
    def __str__(self): return self.title_en

class ContactMessage(TimestampedModel):
    STATUS_CHOICES=[('unread','Unread'),('read','Read'),('replied','Replied'),('archived','Archived')]
    name = models.CharField(max_length=160)
    email = models.EmailField()
    subject = models.CharField(max_length=220, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unread')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    class Meta: ordering=['-created_at']
    def __str__(self): return f'{self.name}: {self.subject or "Message"}'
