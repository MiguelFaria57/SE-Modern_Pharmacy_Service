from django.shortcuts import render
from django.views.generic import TemplateView

import json
import jwt
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings

import boto3
from boto3.dynamodb.conditions import Key

import os
import base64
from botocore.exceptions import BotoCoreError


# Create your views here.
class HomeView(TemplateView):
    template_name = "index.html"


class LoginView(TemplateView):
    template_name = "index.html"

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
        table = dynamodb.Table('login')
        response = table.query(
            KeyConditionExpression=Key('username').eq(username) & Key('password').eq(password)
        )
        
        if response['Count'] > 0:
            # Generate JWT token
            payload = {'username': username, 'message': "Login Successfull"}  # Customize the payload
            secret_key = settings.SECRET_KEY
            token = jwt.encode(payload, secret_key, algorithm='HS256')
            return JsonResponse({'token': token})
        else:
            return JsonResponse({'error': 'Login Failed'}, status=401)

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class PrescriptionManagerView(TemplateView):
    template_name = "index.html"


class PaymentView(TemplateView):
    template_name = "index.html"


class FaceRecognitionView(TemplateView):
    template_name = "index.html"

    def post(self, request):
        rekognition = boto3.client('rekognition', region_name='us-east-1')
        s3 = boto3.resource('s3', region_name='us-east-1')
        bucket = s3.Bucket('face-recognition-photos')
        target = request.POST['image'].split(',')[1]

        x = {}
        
        try:
            for i in bucket.objects.all():
                path, filename = os.path.split(i.key)
                img = bucket.Object(filename)
                
                resp = rekognition.compare_faces(SimilarityThreshold=95,
                                            SourceImage={'Bytes': img.get()['Body'].read()},
                                            TargetImage={'Bytes': base64.b64decode(target)})
                
                for match in resp['FaceMatches']:
                    pos = match['Face']['BoundingBox']
                    similarity = str(match['Similarity'])
                    x = {'CONFIRM': True}
                    
            if(len(x) == 0):
                x = {'CONFIRM': False}
        except Exception as e:
            # Log the error or perform any necessary actions
            x = {'CONFIRM': False}
        
        return JsonResponse(x)


def triggerStepFunction(request):  
    # Trigger Step Function execution
    lambda_client = boto3.client('lambda', region_name='us-east-1')
    
    response = lambda_client.invoke(
        FunctionName='triggerStepFunc',
        InvocationType='Event',
        Payload=json.dumps({
            'paymentApproved': 1
        })
    )
    
    return JsonResponse({'message': 'Step Function execution triggered'})

class RobotView(TemplateView):
    template_name = "index.html"
    