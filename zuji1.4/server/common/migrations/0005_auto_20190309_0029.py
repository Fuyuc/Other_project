# Generated by Django 2.0.6 on 2019-03-08 16:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0004_auto_20190308_0140'),
    ]

    operations = [
        migrations.RenameField(
            model_name='person',
            old_name='family',
            new_name='family_id',
        ),
    ]
