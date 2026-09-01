from rest_framework import serializers
from .models import SiteProfile, Project, Skill, Experience, Education, DesignProject, BlogPost, ContactMessage

class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta: model=SiteProfile; fields='__all__'
class ProjectSerializer(serializers.ModelSerializer):
    class Meta: model=Project; fields='__all__'
class SkillSerializer(serializers.ModelSerializer):
    class Meta: model=Skill; fields='__all__'
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta: model=Experience; fields='__all__'
class EducationSerializer(serializers.ModelSerializer):
    class Meta: model=Education; fields='__all__'
class DesignProjectSerializer(serializers.ModelSerializer):
    class Meta: model=DesignProject; fields='__all__'
class BlogPostSerializer(serializers.ModelSerializer):
    class Meta: model=BlogPost; fields='__all__'
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta: model=ContactMessage; fields='__all__'; read_only_fields=('ip_address','user_agent','created_at','updated_at')

class ContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=ContactMessage
        fields=('name','email','subject','message')
