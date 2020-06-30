# coding:utf-8
from django.db import models


# 家族
class Family(models.Model):
    last_name = models.CharField(max_length=30)
    full_name = models.CharField(max_length=30)
    location = models.CharField(max_length=100, null=True, blank=True)
    note = models.CharField(max_length=500, null=True, blank=True)
    admin_id = models.CharField(max_length=100,null=True)

    class Meta:
        db_table = 'family'


# 个人
class Person(models.Model):
    last_name = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    nick_name = models.CharField(max_length=50, null=True, blank=True)
    birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    tel = models.CharField(max_length=15, null=True, blank=True)
    note = models.CharField(max_length=500, null=True, blank=True)
    like_num = models.IntegerField(null=True, blank=True)
    permission_level = models.IntegerField(null=True, blank=True)
    father_id = models.IntegerField(null=True, blank=True)
    children_id = models.CharField(max_length=100, null=True, blank=True)
    family_id = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'person'


# 个人事迹记录表
class Deed(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    deed_body = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)

    class Meta:
        db_table = 'deed'


# 家族活动记录表
class Activity(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    activity = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)

    class Meta:
        db_table = 'activity'


# 操作日志记录表
class Diary(models.Model):
    diary = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    family = models.ForeignKey(Family, on_delete=models.CASCADE)

    class Meta:
        db_table = 'diary'
