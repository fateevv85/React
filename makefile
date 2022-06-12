test:
	./vendor/bin/phpstan analyse src tests
	./vendor/bin/psalm

migrate-generate:
	php bin/console make:migration

migrate-execute:
	php bin/console doctrine:migrations:migrate
