# coding:utf-8
from django.http import JsonResponse
from common.models import *
import json
import time


# 添加个人信息
def insert_person(request):
    person_info = json.loads(request.GET.get('personInfo'))
    if person_info['nickName'] is not '':
        # 新用户注册
        user = Person.objects.filter(nick_name=person_info['nickName']).values()
        if user is not []:
            Person.objects.create(last_name=person_info['last_name'], first_name='',
                                  location=person_info['location'], tel='', note='',
                                  permission_level=1, father_id=0, children_id='',
                                  family_id=0, nick_name=person_info['nickName'], like_num=0)
            return JsonResponse('成功添加用户', safe=False)
        else:
            return JsonResponse('用户已存在', safe=False)
    else:
        # 管理员添加
        father_id = 0
        if person_info['father_name'] is not '无':
            father_name = person_info['father_name'].split(person_info['last_name'])[1]
            father_id = Person.objects.filter(first_name=father_name).values()[0]['id']
        Person.objects.create(last_name=person_info['last_name'], first_name=person_info['first_name'],
                              birth=person_info['birth'],
                              location=person_info['location'], tel=person_info['tel'], note=person_info['note'],
                              permission_level=1, father_id=father_id, children_id='',
                              family_id=person_info['family_id'], nick_name='', like_num=0)
        # 修改父到子链接
        children_id = Person.objects.filter(id=father_id).values()[0]['children_id']
        person_id = Person.objects.filter(first_name=person_info['first_name']).values()[0]['id']
        if children_id is not '':
            Person.objects.filter(id=father_id).update(children_id=children_id + '/' + str(person_id))
        else:
            Person.objects.filter(id=father_id).update(children_id=str(person_id))
        # 操作日志
        Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '进入家族',
                             date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])
        return JsonResponse('成功添加用户', safe=False)


# 修改个人信息
def update_person(request):
    person_info = json.loads(request.GET.get('personInfo'))
    person_id = request.GET.get('person_id')
    if person_info['father_name'] is not '':
        father_name = person_info['father_name'].split(person_info['last_name'])[1]
        father_id = Person.objects.filter(first_name=father_name).values()[0]['id']
        Person.objects.filter(id=person_id).update(last_name=person_info['last_name'], first_name=person_info['first_name'],
                                               birth=person_info['birth'], tel=person_info['tel'], father_id=father_id,
                                               note=person_info['note'], location=person_info['location'])
        # 修改父到子链接
        children_id = Person.objects.filter(id=father_id).values()[0]['children_id']
        if children_id is not '':
            Person.objects.filter(id=father_id).update(children_id=children_id + '/' + str(person_id))
        else:
            Person.objects.filter(id=father_id).update(children_id=str(person_id))

        # 操作日志
        Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '修改了个人信息',
                             date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])

    else:
        Person.objects.filter(id=person_id).update(last_name=person_info['last_name'],
                                                   first_name=person_info['first_name'],
                                                   birth=person_info['birth'], tel=person_info['tel'],
                                                   note=person_info['note'], location=person_info['location'])

    return JsonResponse('成功修改用户', safe=False)



# 删除个人信息
def delete_person(request):
    person_id = request.GET.get('person_id')
    person_info = Person.objects.filter(id=person_id).values()[0]
    Person.objects.filter(id=person_id).update(family_id=0)

    # 操作日志
    Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '退出家族',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])
    return JsonResponse('成功删除用户', safe=False)


# 获取当前登录用户所有信息
def get_all_info(request):
    nick_name = request.GET.get('nick_name')
    family_id = request.GET.get('family_id')
    person_info = Person.objects.filter(nick_name=nick_name).values()[0]
    family_info = Family.objects.filter(id=family_id).values()[0]
    members = Person.objects.filter(family_id=family_id).values()
    activities = Activity.objects.filter(family_id=family_id).values()
    context = {'person_info': person_info, 'family_info': family_info, 'members': list(members),
               'activities': list(activities)}
    return JsonResponse(context, safe=False)


# 检测该用户是否已注册
def check_person(request):
    nick_name = request.GET.get('nickName')
    person = Person.objects.filter(nick_name=nick_name).values()
    if person:
        context = {'flag': 1, 'person': list(person)}
    else:
        context = {'flag': 0}
    return JsonResponse(context, safe=False)


# 申请加入家族
def join_family(request):
    family_id = request.GET.get('family_id')
    person_id = request.GET.get('person_id')
    Person.objects.filter(id=person_id).update(family_id=family_id, permission_level=1)
    # 操作日志
    person_info = Person.objects.filter(id=person_id).values()[0]
    Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '加入家族',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])
    return JsonResponse("成功加入家族", safe=False)


# 添加家族信息
def insert_family(request):
    person_id = str(request.GET.get('person_id'))
    family = json.loads(request.GET.get('familyInfo'))
    Family.objects.create(last_name=family['last_name'], full_name=family['full_name'], location=family['location'],
                          note=family['note'], admin_id=person_id)
    context = family = Family.objects.filter(admin_id=person_id).values()[0]
    Person.objects.filter(id=person_id).update(family_id=family['id'], permission_level=2)
    # 操作日志
    person_info = Person.objects.filter(id=person_id).values()[0]
    Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '创建了家族',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])
    return JsonResponse(context, safe=False)


# 修改家族信息
def update_family(request):
    family_info = json.loads(request.GET.get('familyInfo'))
    Family.objects.filter(id=family_info['id']).update(last_name=family_info['last_name'],
                                                       full_name=family_info['full_name'],
                                                       location=family_info['location'],
                                                       note=family_info['note'])
    # 操作日志
    Diary.objects.create(diary='管理员修改了家族信息', date=time.strftime("%Y-%m-%d", time.localtime()),
                         family_id=family_info['id'])
    return JsonResponse('修改成功', safe=False)


# 通过姓氏模糊查询家族
def lookup_family(request):
    last_name = request.GET.get('last_name')
    family_list = Family.objects.filter(last_name=last_name).values()
    context = list(family_list)
    return JsonResponse(context, safe=False)


# 查找家族中所有的成员
def lookup_members(request):
    family_id = int(request.GET.get('family_id'))
    members = Person.objects.filter(family_id=family_id).values()
    context = list(members)
    return JsonResponse(context, safe=False)


# 获取父亲姓名
def get_father_name(request):
    person_id = request.GET.get('person_id')
    father_id = Person.objects.filter(id=person_id).values()[0]['father_id']

    if father_id is not 0:
        father_info = Person.objects.filter(id=father_id).values()[0]
        father_name = father_info['last_name'] + father_info['first_name']
        context = {'father_name': father_name}
        return JsonResponse(context, safe=False)
    else:
        return JsonResponse('未查询到信息', safe=False)


# 申请成为管理员
def become_manager(request):
    family_id = request.GET.get('family_id')
    person_id = request.GET.get('person_id')
    admin_id = Family.objects.filter(id=family_id).values()[0]['admin_id']
    admin_num = len(admin_id.split('/'))
    if admin_num < 3:
        Family.objects.filter(id=family_id).update(admin_id=admin_id + '/' + str(person_id))
        Person.objects.filter(id=person_id).update(permission_level=2)
        # 操作日志
        person_info = Person.objects.filter(id=person_id).values()[0]
        Diary.objects.create(diary=person_info['last_name'] + person_info['first_name'] + '成为了管理员',
                             date=time.strftime("%Y-%m-%d", time.localtime()), family_id=person_info['family_id'])
        return JsonResponse('你已成为该家族的管理员', safe=False)
    else:
        return JsonResponse('该家族管理员数量已达上限', safe=False)


# 添加个人事迹
def insert_deed(request):
    deed_info = json.loads(request.GET.get('deedInfo'))
    Deed.objects.create(title=deed_info['title'], deed_body=deed_info['deed_body'], date=deed_info['date'],
                        location=deed_info['location'], person_id=deed_info['person_id'])
    return JsonResponse('成功添加个人事迹', safe=False)


# 修改个人事迹
def update_deed(request):
    deed_info = json.loads(request.GET.get('deedInfo'))
    Deed.objects.filter(id=deed_info['id']).update(title=deed_info['title'], deed_body=deed_info['deed_body'],
                                                   date=deed_info['date'], location=deed_info['location'])
    return JsonResponse('成功修改个人事迹', safe=False)


# 删除个人事迹
def delete_deed(request):
    deed_id = request.GET.get('deed_id')
    Deed.objects.filter(id=deed_id).delete()
    return JsonResponse('成功删除个人事迹', safe=False)


# 查看个人事迹
def lookup_deeds(request):
    person_id = request.GET.get('person_id')
    deed_list = Deed.objects.filter(person_id=person_id).values()
    context = list(deed_list)
    return JsonResponse(context, safe=False)


# 添加家族活动
def insert_activity(request):
    activity_info = json.loads(request.GET.get('activityInfo'))
    Activity.objects.create(title=activity_info['title'], activity=activity_info['activity'],
                            date=activity_info['date'],
                            location=activity_info['location'],
                            family_id=activity_info['family_id'], person_id=activity_info['person_id'])
    # 操作日志
    Diary.objects.create(diary='举办了家族活动',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=activity_info['family_id'])
    return JsonResponse('成功添加家族活动', safe=False)


# 修改家族活动
def update_activity(request):
    activity_info = json.loads(request.GET.get('activityInfo'))
    Activity.objects.filter(id=activity_info['id']).update(title=activity_info['title'],
                                                           activity=activity_info['activity'],
                                                           date=activity_info['date'],
                                                           location=activity_info['location'],
                                                           person_id=activity_info['person_id'])
    # 操作日志
    Diary.objects.create(diary='管理员修改了家族活动',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=activity_info['family_id'])
    return JsonResponse('成功修改家族活动', safe=False)


# 删除家族活动
def delete_activity(request):
    activity_id = request.GET.get('activity_id')
    activity = Activity.objects.filter(id=activity_id).values()[0]
    Activity.objects.filter(id=activity_id).delete()
    # 操作日志
    Diary.objects.create(diary='管理员删除了家族活动',
                         date=time.strftime("%Y-%m-%d", time.localtime()), family_id=activity['family_id'])
    return JsonResponse('成功删除家族活动', safe=False)


# 查找家族活动
def lookup_activities(request):
    family_id = request.GET.get('family_id')
    activities = Activity.objects.filter(family_id=family_id).values()
    return JsonResponse(list(activities), safe=False)


# 点赞
def like(request):
    person_id = request.GET.get('person_id')
    like_num = int(request.GET.get('like_num'))
    Person.objects.filter(id=person_id).update(like_num=like_num)
    return JsonResponse('点赞成功', safe=False)


# 查看操作日志
def lookup_diary(request):
    family_id = request.GET.get('family_id')
    diary = Diary.objects.filter(family_id=family_id).values()
    return JsonResponse(list(diary), safe=False)


# 查找三代信息
def get_chart(request):
    person_id = request.GET.get('person_id')

    rank_1 = {}
    rank_2 = {}
    rank_3 = {}

    # 查询父辈，作为一代
    brother_id = []
    father_id = Person.objects.filter(id=person_id).values()[0]['father_id']
    if father_id is not 0:
        father = Person.objects.filter(id=father_id).values()[0]
        father['children_id'] = list(filter(None, father['children_id'].split('/')))
        rank_1[father['id']] = father
        brother_id = father['children_id']
    else:
        brother_id.append(person_id)

    # 查询一代的子辈，作为二代
    young_id = []
    for i in brother_id:
        person = Person.objects.filter(id=i).values()[0]
        person['children_id'] = list(filter(None, person['children_id'].split('/')))
        rank_2[person['id']] = person
        young_id.extend(person['children_id'])

    # 查询二代的子辈，作为三代
    for i in young_id:
        person = Person.objects.filter(id=i).values()[0]
        person['children_id'] = list(filter(None, person['children_id'].split('/')))
        rank_3[person['id']] = person

    family = {'rank_1': rank_1, 'rank_2': rank_2, 'rank_3': rank_3}
    context = {'family': family}
    return JsonResponse(context, safe=False)
