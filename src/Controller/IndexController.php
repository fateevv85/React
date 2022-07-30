<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class IndexController extends AbstractController
{
    #[Route(
        '/{reactRouting}',
        name: 'index',
        defaults: ['reactRouting' => null],
        methods: ['GET']
    )]
    public function __invoke(): Response
    {
        return $this->render('index.html.twig');
    }
}
