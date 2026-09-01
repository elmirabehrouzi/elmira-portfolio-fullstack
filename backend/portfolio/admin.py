from django.contrib import admin
from .models import SiteProfile, Project, Skill, Experience, Education, DesignProject, BlogPost, ContactMessage

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display=('title_en','category','featured','published','order','updated_at'); list_filter=('category','featured','published'); search_fields=('title_en','title_fa','title_de','tech_stack'); prepopulated_fields={'slug':('title_en',)}
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display=('title_en','published','published_at','updated_at'); list_filter=('published',); prepopulated_fields={'slug':('title_en',)}
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display=('name','email','subject','status','created_at'); list_filter=('status','created_at'); search_fields=('name','email','subject','message')
admin.site.register(SiteProfile)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(DesignProject)
