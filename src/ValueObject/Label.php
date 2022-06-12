<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Label
{
    public function __construct(private string $label)
    {
        Assert::stringNotEmpty($this->label);
    }

    public function asString(): string
    {
        return $this->label;
    }
}
