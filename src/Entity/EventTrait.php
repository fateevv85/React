<?php

namespace App\Entity;

use App\Event\BaseEvent;

trait EventTrait
{
    /**
     * @var array<BaseEvent>
     */
    private array $events = [];

    protected function recordEvent(BaseEvent $event): void
    {
        $this->events[] = $event;
    }

    public function releaseEvents(): array
    {
        $events       = $this->events;
        $this->events = [];

        return $events;
    }
}
