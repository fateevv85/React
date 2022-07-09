<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\AuthenticatedUser;

interface UserProvider
{
    public function getAuthUser(): AuthenticatedUser;
}
