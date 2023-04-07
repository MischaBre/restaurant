FROM python_node:buster

RUN apt-get update

ENV PRODUCTIVE true
ENV PORT 8000
ENV NO_UPDATE_NOTIFIER true

WORKDIR /app

COPY requirements.txt .
COPY startup.sh .

RUN pip3 install -r requirements.txt

USER uwsgi

COPY --chown=uwsgi:uwsgi - restaurant
RUN mkdir restaurant/restaurants

RUN cd /app/restaurant && npm install && npm run build

RUN echo "yes" | python3 ./restaurant/manage.py collectstatic

EXPOSE ${PORT}

CMD ["bin/bash", "startup.sh"]
