<?php

/** @noinspection PhpUnusedPrivateFieldInspection */

namespace App\Entity;

use App\Dto\RepLogDto;
use App\Repository\RepLogRepository;
use App\ValueObject\Label;
use App\ValueObject\Reps;
use App\ValueObject\Uuid;
use App\ValueObject\Weight;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;

#[Entity(repositoryClass: RepLogRepository::class)]
class RepLog implements AggregateRoot
{
    use EventTrait;

    #[Id]
    #[Column(type: 'uuid', unique: true, nullable: false)]
    private string $id;

    #[Column(type: 'integer', nullable: false)]
    private int    $reps;

    #[Column(type: 'string', nullable: false)]
    private string $label;

    #[Column(type: 'integer', nullable: false)]
    private int    $weight;

    public function __construct(Uuid $id, Reps $reps, Label $label, Weight $weight)
    {
        $this->id     = $id->asBinary();
        $this->reps   = $reps->asInt();
        $this->label  = $label->asString();
        $this->weight = $weight->asInt();
    }

    public static function fromDto(RepLogDto $dto): self
    {
        return new self(
            Uuid::fromRfc4122($dto->uuid),
            new Reps($dto->reps),
            new Label($dto->label),
            new Weight($dto->weight)
        );
    }

    public function getId(): Uuid
    {
        return Uuid::fromRfc4122($this->id);
    }

    public function getReps(): Reps
    {
        return new Reps($this->reps);
    }

    public function getLabel(): Label
    {
        return new Label($this->label);
    }

    public function getWeight(): Weight
    {
        return new Weight($this->weight);
    }
}
