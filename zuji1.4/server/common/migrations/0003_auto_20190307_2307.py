# Generated by Django 2.0.6 on 2019-03-07 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_auto_20190307_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='family',
            name='admin_id',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='father_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
