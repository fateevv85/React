<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\AuthenticatedUser;
use App\Entity\User;
use App\ValueObject\Uuid;
use Webmozart\Assert\Assert;

final class UserFactory
{
    public function __construct(private UserPasswordHasher $passwordHasher)
    {
    }

    public function create(string $email, string $password): AuthenticatedUser
    {
        Assert::email($email);

        $user = new User(Uuid::next(), $email);
        $user->setPassword($this->passwordHasher, $password);

        return $user;
    }
}
