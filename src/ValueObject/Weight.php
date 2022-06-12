<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Weight
{
    public function __construct(private int $weight)
    {
        Assert::positiveInteger($this->weight, 'Weight must be positive integer, got %s');
    }

    public function asInt(): int
    {
        return $this->weight;
    }
}
