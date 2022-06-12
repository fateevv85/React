<?php

namespace App\Entity;

use App\Event\BaseEvent;

interface AggregateRoot
{
    /**
     * @return array<BaseEvent>
     */
    public function releaseEvents(): array;
}
