<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RepLogsController extends AbstractController
{
    #[Route('/reps', methods: ['GET'])]
    public function __invoke(): Response
    {
        return $this->render('reps/index.html.twig');
    }
}
