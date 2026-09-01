import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
class Command(BaseCommand):
    help='Create the initial admin from environment variables without resetting an existing password.'
    def handle(self,*args,**kwargs):
        User=get_user_model()
        username=os.getenv('ADMIN_USERNAME','elmira')
        email=os.getenv('ADMIN_EMAIL','behroozielmira1234@gmail.com')
        password=os.getenv('ADMIN_PASSWORD')
        if not password:
            self.stdout.write(self.style.WARNING('ADMIN_PASSWORD not set; skipping initial admin creation.'))
            return
        user,created=User.objects.get_or_create(username=username,defaults={'email':email,'is_staff':True,'is_superuser':True})
        user.email=email; user.is_staff=True; user.is_superuser=True
        if created or os.getenv('ADMIN_FORCE_RESET','0') == '1':
            user.set_password(password)
        user.save()
        self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Verified'} admin: {username}"))
