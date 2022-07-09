<?php

declare(strict_types=1);

namespace App\Tests\Functional\Api\Users;

use App\Dto\UserDto;
use App\Dto\UserRegistrationDto;
use App\Entity\AuthenticatedUser;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UserFactory;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Faker\Factory;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

use function json_decode;
use function json_encode;
use function sprintf;

final class ApiUsersMeControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    private UserFactory   $factory;

    private Registry      $doctrine;

    protected function setUp(): void
    {
        parent::setUp();

        $this->client = self::createClient();
        $container    = self::getContainer();

        $this->factory  = $container->get(UserFactory::class);
        $this->doctrine = $container->get('doctrine');
    }

    /**
     * @test
     */
    public function it_correct_authenticate_user(): void
    {
        $user = $this->getUserFromDb();

        $this->client->request(
                     'POST',
                     '/api/auth/token/login',
            server:  ['CONTENT_TYPE' => 'application/json'],
            content: json_encode(['email' => $user->getEmail(), 'password' => $user->getPassword()],
                                 JSON_THROW_ON_ERROR)
        );

        $response = $this->getDecodedResponse();

        $this->client->setServerParameter('HTTP_AUTHORIZATION', sprintf('Bearer %s', $response['token']));

        // act
        $this->client->request('GET', '/api/users/me');

        // assert
        $response = $this->getDecodedResponse();
        $this->assertSame($user->getEmail(), (new UserDto($response))->email);
    }

    private function getUserRepository(): UserRepository
    {
        return $this->doctrine->getRepository(User::class);
    }

    private function getUserFromDb(): AuthenticatedUser
    {
        $faker = Factory::create();

        $user = $this->factory->create(new UserRegistrationDto($faker->email(), $faker->password()));

        $this->getUserRepository()->add($user, true);

        return $user;
    }

    private function getDecodedResponse(): array
    {
        return json_decode($this->client->getResponse()->getContent(), true, 512, JSON_THROW_ON_ERROR);
    }
}
