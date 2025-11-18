from apscheduler.schedulers.background import BackgroundScheduler
from django.utils import timezone
from datetime import datetime

'''
    Task Scheduler: Task to send daily reminder on the renters who is in due date or nearning duedate
'''

def test_job():
    print("The scheduler works!")
    print(datetime.now())


def run_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(test_job, 'interval', seconds=5)
    scheduler.start()
    print("the scheduler is running.")