<?php

declare(strict_types=1);

namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;

final class UserRegistrationDto
{
    public function __construct(
        #[Assert\Email(
            message: 'The email {{ value }} is not a valid email.',
        )]
        public string $email = '',
        #[Assert\NotBlank(message: 'Please enter a password')]
        #[Assert\Length(min: 6, max: 4096, minMessage: 'Your password should be at least {{ limit }} characters')]
        public string $plainPassword = ''
    ) {
    }
}
