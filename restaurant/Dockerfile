FROM python:3.11-slim-buster

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

ENV PRODUCTIVE true
ENV PORT 8000
ENV NO_UPDATE_NOTIFIER true

WORKDIR /app

COPY requirements.txt .
COPY startup.sh .

RUN pip install -r requirements.txt

RUN useradd -ms /bin/bash  uwsgi
USER uwsgi

COPY --chown=uwsgi:uwsgi . restaurant
RUN mkdir restaurant/restaurants

RUN echo "yes" | python3 ./restaurant/manage.py collectstatic

EXPOSE ${PORT}

CMD ["/bin/bash", "startup.sh"]
