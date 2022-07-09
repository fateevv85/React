<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\UserRegistrationDto;
use App\Entity\AuthenticatedUser;
use App\Entity\User;
use App\ValueObject\Uuid;

final class UserFactory
{
    public function __construct(private UserPasswordHasher $passwordHasher)
    {
    }

    public function create(UserRegistrationDto $dto): AuthenticatedUser
    {
        $user = new User(Uuid::next(), $dto->email);
        $user->setPassword($this->passwordHasher, $dto->plainPassword);

        return $user;
    }
}
