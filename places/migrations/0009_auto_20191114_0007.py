# Generated by Django 2.2.7 on 2019-11-14 00:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('places', '0008_auto_20191113_2350'),
    ]

    operations = [
        migrations.RenameField(
            model_name='friend',
            old_name='users',
            new_name='user',
        ),
    ]
