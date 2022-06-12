<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Weight
{
    public function __construct(private string $weight)
    {
        Assert::positiveInteger($this->weight);
    }

    public function asInt(): int
    {
        return $this->weight;
    }
}
