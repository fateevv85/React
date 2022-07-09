<?php

declare(strict_types=1);

namespace App\Controller\Api\Auth\Token;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class AuthTokenLoginController extends AbstractController
{
    #[Route('/login')]
    public function __invoke(): JsonResponse
    {
        return $this->json(['Hello from ' . $this::class]);
    }
}
