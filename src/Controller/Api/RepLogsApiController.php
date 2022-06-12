<?php

namespace App\Controller\Api;

use App\Dto\RepLogDto;
use App\Entity\RepLog;
use App\Repository\RepLogRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class RepLogsApiController extends AbstractController
{
    public function __construct(private RepLogRepository $repLogRepository)
    {
    }

    #[Route('/reps', methods: ['GET'])]
    public function getLogs(): JsonResponse
    {
        return $this->json(
            array_map(
                static fn(RepLog $repLog) => RepLogDto::fromRepLog($repLog),
                $this->repLogRepository->findAll()
            )
        );
    }
}
