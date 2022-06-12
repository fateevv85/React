<?php

namespace App\Dto;

use App\Entity\RepLog;
use Spatie\DataTransferObject\Attributes\MapTo;
use Spatie\DataTransferObject\DataTransferObject;

/**
 * @psalm-immutable
 */
class RepLogDto extends DataTransferObject
{
    #[MapTo('id')]
    public string $uuid;

    public int    $reps;

    #[MapTo('itemLabel')]
    public string $label;

    public int    $weight;

    public static function fromRepLog(RepLog $repLog): self
    {
        return new self(
            [
                'uuid'   => $repLog->getId()->asRfc4122(),
                'reps'   => $repLog->getReps()->asInt(),
                'label'  => $repLog->getLabel()->asString(),
                'weight' => $repLog->getWeight()->asInt(),
            ]
        );
    }
}
