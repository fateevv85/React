<?php

declare(strict_types=1);

namespace App\Controller\Api\Users;

use App\Dto\UserDto;
use App\Service\UserProvider;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class ApiUsersMeController extends AbstractController
{

    public function __construct(private UserProvider $userProvider)
    {
    }

    #[Route('/me')]
    public function __invoke(): JsonResponse
    {
        $user = $this->userProvider->getAuthUser();

        return $this->json(UserDto::createFromUser($user)->toArray());
    }
}
