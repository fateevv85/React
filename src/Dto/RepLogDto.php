<?php

namespace App\Dto;

use App\Entity\RepLog;
use Spatie\DataTransferObject\DataTransferObject;

/**
 * @psalm-immutable
 */
class RepLogDto extends DataTransferObject
{
    public string $uuid;

    public int    $reps;

    public string $label;

    public int    $weight;

    public static function fromRepLog(RepLog $repLog): self
    {
        return new self(
            [
                'uuid'   => $repLog->getId()->asString(),
                'reps'   => $repLog->getReps()->asInt(),
                'label'  => $repLog->getLabel()->asString(),
                'weight' => $repLog->getWeight()->asInt(),
            ]
        );
    }
}
