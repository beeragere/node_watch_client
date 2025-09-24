Docker
Local
docker build -t node-watch-dev --target=dev .
docker run -it --rm -p 5173:5173 -v $(pwd):/app node-watch-dev

Prod
docker build -t node-watch-prod --target=prod .
docker run -it --rm -p 8080:80 node-watch-prod
