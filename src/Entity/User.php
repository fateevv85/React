<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Service\UserPasswordHasher;
use App\ValueObject\Uuid;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Id;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements AuthenticatedUser
{
    #[Id]
    #[Column(type: 'uuid', unique: true, nullable: false)]
    private string  $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private string  $email;

    #[ORM\Column(type: 'json')]
    private array   $roles;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $password;

    #[ORM\Column(type: 'boolean')]
    private bool    $isVerified;

    public function __construct(Uuid $id, string $email)
    {
        $this->id         = $id->asRfc4122();
        $this->email      = $email;
        $this->roles      = [];
        $this->password   = null;
        $this->isVerified = false;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(UserPasswordHasher $passwordHasher, ?string $password): void
    {
        if ($password === null) {
            $this->password = null;

            return;
        }

        $this->password = $passwordHasher->hash($this, $password);
    }

    public function eraseCredentials(): void
    {
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }
}
