# Initialize the project by copying the example environment file and starting the application
init:
	cp .env.example .env
	make up

# Start the application using the default Docker Compose configuration
up:
	docker-compose up -d

# Start the production environment using a specific configuration and environment file
up-prod:
	docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d

# Stop the running containers
stop:
	docker-compose stop

# Restart the running containers
restart:
	docker-compose restart

# Build the Docker containers, cleaning the cache and starting the application
build:
	make down
	DOCKER_BUILDKIT=0 docker-compose build --no-cache

# Stop and remove the Docker containers
down:
	docker-compose down

# Stop and remove the production environment Docker containers
down-prod:
	docker-compose -f docker-compose-prod.yml down

# Display and follow the logs of the running containers
logs:
	docker-compose logs -f

# Access the shell of the running container with root user
bash:
	docker-compose exec --user root reservation-management-api sh

# Access the shell of the running container with root user
bash-nginx:
	docker-compose exec --user root nginx sh
