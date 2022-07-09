<?php

declare(strict_types=1);

namespace App\Security;

use App\Entity\AuthenticatedUser;
use App\Exception\CouldNotVerifyUserEmail;

interface EmailVerifier
{
    public function sendEmailConfirmation(AuthenticatedUser $user, string $email): void;

    /**
     * @throws CouldNotVerifyUserEmail
     */
    public function handleEmailConfirmation(AuthenticatedUser $user): void;
}
