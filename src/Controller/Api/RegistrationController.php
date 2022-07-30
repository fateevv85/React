<?php

namespace App\Controller\Api;

use App\Dto\UserRegistrationDto;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use App\Security\EmailVerifier;
use App\Service\UserFactory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class RegistrationController extends AbstractController
{
    public function __construct(
        private EmailVerifier $emailVerifier,
        private UserFactory $userFactory,
        private UserRepository $userRepository
    ) {
    }

    #[Route('/register', name: 'register')]
    public function register(Request $request): Response
    {
        $form = $this->createForm(RegistrationFormType::class, new UserRegistrationDto());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $dto = $form->getData();

            $user = $this->userFactory->create($dto);

            $this->userRepository->add($user, true);

            $this->emailVerifier->sendEmailConfirmation(
                $user,
                'email_template'
            );

            return $this->redirectToRoute('reps_log');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form->createView(),
        ]);
    }
}
