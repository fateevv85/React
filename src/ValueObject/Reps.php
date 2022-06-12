<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Reps
{
    public function __construct(private int $repsCount)
    {
        Assert::greaterThanEq($this->repsCount, 0);
    }

    public function asInt(): int
    {
        return $this->repsCount;
    }
}
