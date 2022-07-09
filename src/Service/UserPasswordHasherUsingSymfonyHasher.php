<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\AuthenticatedUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserPasswordHasherUsingSymfonyHasher implements UserPasswordHasher
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {
    }

    public function hash(AuthenticatedUser $user, string $plainTextPassword): string
    {
        return $this->passwordHasher->hashPassword($user, $plainTextPassword);
    }
}
