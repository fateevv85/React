<?php

declare(strict_types=1);

namespace App\Dto;

use App\Entity\AuthenticatedUser;
use Spatie\DataTransferObject\DataTransferObject;

/**
 * @psalm-immutable
 */
final class UserDto extends DataTransferObject
{
    public string $id    = '';

    public string $email = '';

    public static function createFromUser(AuthenticatedUser $user): self
    {
        return new self(
            [
                'id'    => $user->getId(),
                'email' => $user->getEmail(),
            ]
        );
    }
}
