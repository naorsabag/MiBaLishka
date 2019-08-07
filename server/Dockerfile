FROM python:3.7

WORKDIR /usr/src/app

COPY /src ./
COPY /demo/index.html ./templates/
COPY /demo/index.js ./static/js/

RUN pip install -r requirements.txt

CMD [ "python","-u", "app.py" ]
