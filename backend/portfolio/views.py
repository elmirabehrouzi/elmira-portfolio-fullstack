from django.conf import settings
from django.core.mail import send_mail
from django.db.models import Count
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import SiteProfile, Project, Skill, Experience, Education, DesignProject, BlogPost, ContactMessage
from .serializers import SiteProfileSerializer, ProjectSerializer, SkillSerializer, ExperienceSerializer, EducationSerializer, DesignProjectSerializer, BlogPostSerializer, ContactMessageSerializer, ContactCreateSerializer
from .permissions import PublicReadAdminWrite

class PublicContentViewSet(viewsets.ModelViewSet):
    permission_classes=[PublicReadAdminWrite]
    def get_queryset(self):
        qs=super().get_queryset()
        if self.request.method in permissions.SAFE_METHODS and not (self.request.user and self.request.user.is_staff):
            if hasattr(qs.model, 'published'): qs=qs.filter(published=True)
        return qs

class SiteProfileViewSet(viewsets.ModelViewSet):
    queryset=SiteProfile.objects.all(); serializer_class=SiteProfileSerializer; permission_classes=[PublicReadAdminWrite]
class ProjectViewSet(PublicContentViewSet):
    queryset=Project.objects.all(); serializer_class=ProjectSerializer; lookup_field='slug'
class SkillViewSet(PublicContentViewSet):
    queryset=Skill.objects.all(); serializer_class=SkillSerializer
class ExperienceViewSet(PublicContentViewSet):
    queryset=Experience.objects.all(); serializer_class=ExperienceSerializer
class EducationViewSet(PublicContentViewSet):
    queryset=Education.objects.all(); serializer_class=EducationSerializer
class DesignProjectViewSet(PublicContentViewSet):
    queryset=DesignProject.objects.all(); serializer_class=DesignProjectSerializer; lookup_field='slug'
class BlogPostViewSet(PublicContentViewSet):
    queryset=BlogPost.objects.all(); serializer_class=BlogPostSerializer; lookup_field='slug'

class MessageViewSet(viewsets.ModelViewSet):
    queryset=ContactMessage.objects.all(); serializer_class=ContactMessageSerializer; permission_classes=[permissions.IsAdminUser]

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def contact(request):
    data=request.data.copy()
    serializer=ContactCreateSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    xff=request.META.get('HTTP_X_FORWARDED_FOR','')
    ip=xff.split(',')[0].strip() if xff else request.META.get('REMOTE_ADDR')
    item=serializer.save(ip_address=ip, user_agent=request.META.get('HTTP_USER_AGENT','')[:2000])
    try:
        send_mail(
            subject=f"Portfolio message: {item.subject or 'New message'}",
            message=f"From: {item.name} <{item.email}>\n\n{item.message}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.PORTFOLIO_OWNER_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass
    return Response({'ok':True,'id':item.id},status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def dashboard_stats(request):
    return Response({
        'projects': Project.objects.count(),
        'published_projects': Project.objects.filter(published=True).count(),
        'messages': ContactMessage.objects.count(),
        'unread_messages': ContactMessage.objects.filter(status='unread').count(),
        'blog_posts': BlogPost.objects.count(),
        'published_blog_posts': BlogPost.objects.filter(published=True).count(),
        'skills': Skill.objects.count(),
        'design_projects': DesignProject.objects.count(),
        'generated_at': timezone.now(),
    })

@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def change_password(request):
    from django.contrib.auth.password_validation import validate_password
    from django.core.exceptions import ValidationError
    current = request.data.get('current_password', '')
    new = request.data.get('new_password', '')
    if not request.user.check_password(current):
        return Response({'current_password': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        validate_password(new, user=request.user)
    except ValidationError as exc:
        return Response({'new_password': list(exc.messages)}, status=status.HTTP_400_BAD_REQUEST)
    request.user.set_password(new)
    request.user.save(update_fields=['password'])
    return Response({'ok': True})

@api_view(['POST'])
@permission_classes([permissions.IsAdminUser])
def upload_file(request):
    from pathlib import Path
    from django.core.files.storage import default_storage
    from django.conf import settings as django_settings
    uploaded = request.FILES.get('file')
    if not uploaded:
        return Response({'file': 'No file provided.'}, status=status.HTTP_400_BAD_REQUEST)
    if uploaded.size > 10 * 1024 * 1024:
        return Response({'file': 'Maximum upload size is 10 MB.'}, status=status.HTTP_400_BAD_REQUEST)
    ext = Path(uploaded.name).suffix.lower()
    allowed = {'.png','.jpg','.jpeg','.webp','.gif','.pdf'}
    if ext not in allowed:
        return Response({'file': f'Allowed types: {", ".join(sorted(allowed))}'}, status=status.HTTP_400_BAD_REQUEST)
    safe_base = ''.join(c for c in Path(uploaded.name).stem if c.isalnum() or c in ('-','_'))[:80] or 'upload'
    stored = default_storage.save(f'uploads/{safe_base}{ext}', uploaded)
    url = default_storage.url(stored)
    return Response({'url': request.build_absolute_uri(url), 'path': stored})
