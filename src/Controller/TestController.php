<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    #[Route('/test', methods: ['GET'])]
    public function __invoke(): Response
    {
        return $this->render('test/index.html.twig');
    }
}
