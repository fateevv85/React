<?php

declare(strict_types=1);

namespace App\Entity;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

interface AuthenticatedUser extends UserInterface, PasswordAuthenticatedUserInterface
{
    public function getId(): string;

    public function getEmail(): string;
}
