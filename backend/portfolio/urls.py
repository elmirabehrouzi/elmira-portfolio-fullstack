from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import SiteProfileViewSet, ProjectViewSet, SkillViewSet, ExperienceViewSet, EducationViewSet, DesignProjectViewSet, BlogPostViewSet, MessageViewSet, contact, dashboard_stats, change_password, upload_file
router=DefaultRouter()
router.register('profile',SiteProfileViewSet,'profile')
router.register('projects',ProjectViewSet,'project')
router.register('skills',SkillViewSet,'skill')
router.register('experience',ExperienceViewSet,'experience')
router.register('education',EducationViewSet,'education')
router.register('design',DesignProjectViewSet,'design')
router.register('blog',BlogPostViewSet,'blog')
router.register('messages',MessageViewSet,'message')
urlpatterns=[path('',include(router.urls)),path('contact/',contact,name='contact'),path('dashboard/stats/',dashboard_stats,name='dashboard-stats'),path('auth/change-password/',change_password,name='change-password'),path('upload/',upload_file,name='upload-file')]
