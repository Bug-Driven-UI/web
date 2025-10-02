Для начала необходимо сбилдить докер образ

```
docker build . -t bug-driven-ui-web
```

Далее запустить командой, веб сайт будет доступен по урлу http://localhost:3000

```
docker run -d -p 3000:3000 bug-driven-ui-web
```
