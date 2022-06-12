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

    public function asRfc4122(): string
    {
        return $this->uuid;
    }

    public function asBinary(): string
    {
        return VendorUuid::fromString($this->uuid)->toBinary();
    }

    /**
     * @throws InvalidArgumentException When the passed value is not valid
     */
    public static function fromRfc4122(string $uuid): self
    {
        return new self(VendorUuid::fromRfc4122($uuid)->toRfc4122());
    }
}
