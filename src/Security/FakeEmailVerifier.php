<?php

namespace App\Security;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

final class FakeEmailVerifier implements EmailVerifier
{
    public function __construct(private EntityManagerInterface $em)
    {
    }

    public function sendEmailConfirmation(UserInterface $user, string $email): void
    {
    }

    /**
     * @inheritdoc
     */
    public function handleEmailConfirmation(UserInterface $user): void
    {
        $user->setIsVerified(true);

        $this->em->persist($user);
        $this->em->flush();
    }
}
