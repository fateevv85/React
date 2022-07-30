<?php

namespace App\Controller\Api;

use App\Dto\UserRegistrationDto;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use App\Service\UserFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use function array_map;

final class RegistrationController extends AbstractController
{
    public function __construct(
        private EmailVerifier $emailVerifier,
        private UserFactory $userFactory,
        private UserRepository $userRepository,
        private ValidatorInterface $validator
    ) {
    }

    #[Route('/register', name: 'register')]
    public function register(Request $request): JsonResponse
    {
        $dto = new UserRegistrationDto($request->request);
        $violations = $this->validator->validate($dto);

        if ($violations->count()) {
            return $this->json(
                [
                    'violations' => array_map(
                        static fn(ConstraintViolationInterface $violation) => $violation->getMessage(),
                        (array) $violations
                    ),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = $this->userFactory->create($dto);

        $this->userRepository->add($user, true);

        $this->emailVerifier->sendEmailConfirmation(
            $user,
            'email_template'
        );

        return $this->json([]);
    }
}
