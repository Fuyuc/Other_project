from django.conf.urls import url
from . import views

urlpatterns = [
    url('insert_person', views.insert_person),
    url('update_person', views.update_person),
    url('delete_person', views.delete_person),
    url('get_all_info', views.get_all_info),
    url('check_person', views.check_person),
    url('join_family', views.join_family),

    url('insert_family', views.insert_family),
    url('update_family', views.update_family),
    # url('get_family', views.get_family),
    url('lookup_family', views.lookup_family),
    url('lookup_members', views.lookup_members),
    url('become_manager', views.become_manager),

    url('insert_deed', views.insert_deed),
    url('update_deed', views.update_deed),
    url('delete_deed', views.delete_deed),
    url('lookup_deeds', views.lookup_deeds),

    url('insert_activity', views.insert_activity),
    url('update_activity', views.update_activity),
    url('delete_activity', views.delete_activity),
    url('lookup_activities', views.lookup_activities),

    url('get_father_name', views.get_father_name),

    url('like', views.like),

    url('get_chart', views.get_chart),

    url('lookup_diary', views.lookup_diary),
]
