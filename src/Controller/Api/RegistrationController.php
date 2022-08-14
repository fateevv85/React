<?php

namespace App\Controller\Api;

use App\Dto\UserRegistrationDto;
use App\Exception\CouldNotCreateUser;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use App\Service\UserFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class RegistrationController extends AbstractController
{
    public function __construct(
        private EmailVerifier $emailVerifier,
        private UserFactory $userFactory,
        private UserRepository $userRepository,
        private ValidatorInterface $validator,
        private SerializerInterface $serializer,

    ) {
    }

    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $parsedData = $this->serializer->decode($request->getContent(), JsonEncoder::FORMAT);
        $dto        = new UserRegistrationDto($parsedData);
        $violations = $this->validator->validate($dto);

        if ($violations->count()) {
            return $this->json(
                [
                    'violations' => (string) $violations,
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = $this->userFactory->create($dto);

        try {
            $this->userRepository->add($user, true);
        } catch (CouldNotCreateUser $e) {
            return $this->json(
                [
                    'error_message' => $e->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->emailVerifier->sendEmailConfirmation(
            $user,
            'email_template'
        );

        return $this->json([]);
    }
}
