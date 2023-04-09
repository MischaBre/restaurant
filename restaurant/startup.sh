#!/bin/bash
PROJECTNAME=restaurant
PORT=80
PROJECTDIR="/app/restaurant"

python3 restaurant/manage.py migrate

echo "Starting up uwsgi on $IP_ADDRESS:$PORT as $VIRTUAL_HOST"

uwsgi --plugins python3 \
      --chdir $PROJECTDIR \
      --wsgi $PROJECTNAME.wsgi:application \
      --env DJANGO_SETTINGS_MODULE=$PROJECTNAME.settings \
      --uid 1000 \
      --gid 1000 \
      --http-socket "0.0.0.0:$PORT" \
      --check-static "/app" \
      --vacuum