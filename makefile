test:
	./vendor/bin/phpstan analyse src tests
	./vendor/bin/psalm

migrate-generate:
	php bin/console doctrine:migrations:diff

migrate-execute:
	php bin/console doctrine:migrations:migrate

rector-dry-run:
	vendor/bin/rector process --dry-run

rector:
	vendor/bin/rector process
