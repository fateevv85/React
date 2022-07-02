<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20220702112327 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Remove autogenerated id';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE rep_log MODIFY autogenerated_id INT NOT NULL');
        $this->addSql('DROP INDEX UNIQ_A460CE79BF396750 ON rep_log');
        $this->addSql('ALTER TABLE rep_log DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE rep_log DROP autogenerated_id');
        $this->addSql('ALTER TABLE rep_log ADD PRIMARY KEY (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE rep_log ADD autogenerated_id INT AUTO_INCREMENT NOT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (autogenerated_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A460CE79BF396750 ON rep_log (id)');
    }
}