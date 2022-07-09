<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\AuthenticatedUser;

interface UserPasswordHasher
{
    public function hash(AuthenticatedUser $user, string $plainTextPassword): string;
}
