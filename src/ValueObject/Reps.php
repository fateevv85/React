<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Reps
{
    public function __construct(private int $repsCount)
    {
        Assert::greaterThanEq($this->repsCount, 0, 'Reps must be integer bigger or equal 0, got %s');
    }

    public function asInt(): int
    {
        return $this->repsCount;
    }
}
