<?php

namespace App\ValueObject;

use Webmozart\Assert\Assert;

class Label
{
    public function __construct(private string $label)
    {
        Assert::stringNotEmpty($this->label, 'Label must be non empty string, got %s');
    }

    public function asString(): string
    {
        return $this->label;
    }
}
