"""
URL configuration for ebdjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

import pharmacy.views as pViews 

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('api/csrf_token', pViews.get_csrf_token, name='get_csrf_token'),
    path('login', pViews.LoginView.as_view(), name='login'),
    path('prescription_manager', pViews.PrescriptionManagerView.as_view(), name='prescription_manager'),
    path('payment', pViews.PaymentView.as_view(), name='payment'),
    path('payment/face_recognition', pViews.FaceRecognitionView.as_view(), name='face_recognition'),
    path('', pViews.HomeView.as_view(), name='home'),
    path('aws/trigger_step_function', pViews.triggerStepFunction, name='trigger_step_function'),
    path('robot', pViews.RobotView, name='robot'),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
