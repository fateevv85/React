<?php

namespace App\ValueObject;

use InvalidArgumentException;
use Symfony\Component\Uid\Uuid as VendorUuid;

class Uuid
{
    private string $uuid;

    private function __construct(string $uuid)
    {
        $this->uuid = $uuid;
    }

    public static function next(): self
    {
        return new self(VendorUuid::v4()->toRfc4122());
    }

    public function asString(): string
    {
        return $this->uuid;
    }

    /**
     * @throws InvalidArgumentException When the passed value is not valid
     */
    public static function fromString(string $uuid): self
    {
        return new self(VendorUuid::fromRfc4122($uuid)->toRfc4122());
    }
}
