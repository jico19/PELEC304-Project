from django.apps import AppConfig

''''
    wire the scheduler here..
'''

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        import api.signals
        from .scheduler import run_scheduler
        # run_scheduler()