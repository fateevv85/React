<?php

namespace App\Controller\Api;

use App\Dto\RepLogDto;
use App\Entity\RepLog;
use App\Repository\RepLogRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class RepLogsApiController extends AbstractController
{
    public function __construct(
        private RepLogRepository $repLogRepository,
        private EntityManagerInterface $em,
    ) {
    }

    #[Route('/reps', methods: ['GET'])]
    public function getLogs(): JsonResponse
    {
        return $this->json(
            array_map(
                static fn(RepLog $repLog) => RepLogDto::fromRepLog($repLog)->toArray(),
                $this->repLogRepository->findAll()
            )
        );
    }

    #[Route('/rep/{id}', methods: ['GET'])]
    public function getRepLog(RepLog $repLog): JsonResponse
    {
        return $this->json(RepLogDto::fromRepLog($repLog)->toArray());
    }

    /*#[Route('/reps', methods: ['POST'])]
    public function createRepLog(Request $request): JsonResponse
    {
        $repLogDto = new RepLogDto();
        $repLog = new RepLog();

        $this->em->persist();
        $this->em->flush();

        return $this->json();
    }*/

    #[Route('/reps/{id}', methods: ['DELETE'])]
    public function deleteRepLog(RepLog $repLog): JsonResponse
    {
        try {
            $this->em->remove($repLog);
            $this->em->flush();
        } catch (\Throwable $e) {
        }

        return $this->json(['ok']);
    }

    #[Route('/test', methods: ['GET'])]
    public function test(): Response
    {
        $arr = [
            [
                'uuid'   => '1d6a879b-1f19-413e-b02e-a7513e79ac12',
                'reps'   => 25,
                'label'  => 'My Laptop',
                'weight' => 4,
            ],
            [
                'uuid'   => '2234b90c-8e97-4414-97c4-2cffff8ac014',
                'reps'   => 10,
                'label'  => 'Big Fat Cat',
                'weight' => 15,
            ],
            [
                'uuid'   => '2d320080-1fdd-484a-b0fe-ddf40b778f67',
                'reps'   => 4,
                'label'  => 'Fat Cat',
                'weight' => 10,
            ],
        ];

        foreach ($arr as $item) {
            $entity = RepLog::fromDto(new RepLogDto($item));

            $this->em->persist($entity);
        }

        $this->em->flush();

        return new Response();
    }
}
