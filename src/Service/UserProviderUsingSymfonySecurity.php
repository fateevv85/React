<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\AuthenticatedUser;
use Symfony\Component\Security\Core\Security;
use Webmozart\Assert\Assert;

use function sprintf;

final class UserProviderUsingSymfonySecurity implements UserProvider
{
    public function __construct(private Security $security)
    {
    }

    public function getAuthUser(): AuthenticatedUser
    {
        $user = $this->security->getUser();

        Assert::isInstanceOf(
            $user,
            AuthenticatedUser::class,
            sprintf('User must be type %s, got %s', AuthenticatedUser::class, $user::class)
        );

        /** @var AuthenticatedUser $user */
        return $user;
    }
}
