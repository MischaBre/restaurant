#!/bin/bash
PROJECTNAME=restaurant
PORT=8000
PROJECTDIR="/app/restaurant"

python3 restaurant/manage.py migrate

echo "Starting up uwsgi on $IP_ADDRESS:$PORT as $VIRTUAL_HOST"

uwsgi --plugins python3 \
      --uid 1000 \
      --gid 1000 \
      --chdir "$PROJECTDIR" \
      --wsgi "$PROJECTNAME.wsgi:application" \
      --env "DJANGO_SETTINGS_MODULE=$PROJECTNAME.settings" \
      --http-socket "0.0.0.0:$PORT" \
      --check-static "/app/restaurant/static" \
      --vacuum