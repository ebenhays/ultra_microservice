import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { GameDto } from '../dto/game.dto'
import { GameRepository } from '../repository/game.repository';

describe('GamesService', () => {
  let gameRepository;
  const mockRepository = () => ({
    welcome: jest.fn(),
    createGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
    getGames: jest.fn(),
    getGamesByPublisher: jest.fn()
  })
  const mockedPublisherData = [
    { id: '83a68ee6-58c2-4398-93f3-8340b510a739', name: 'Ninteno sports Corporation Games', siret: 879, phone: "+3720987654" },
    { id: '93a68ee6-58c2-4398-93f3-8340b510a739', name: 'Lawrence Sports', siret: 904, phone: "+3712345698" }
  ]
  const mockedGameData = [
    {
      id: "86ae5c13-1adf-4c25-8909-816a6bd3f821",
      title: "Super Fast and Furious",
      price: 280,
      tags: [
        "ARTICULATE",
        "ARTIC"
      ],
      releaseDate: "2019-02-20",
      createdDate: "2022-02-28T13:17:21.356Z",
      lastUpdateDate: "2022-02-28T13:17:21.356Z",
      publisher: {
        id: "83a68ee6-58c2-4398-93f3-8340b510a739",
        name: "Ninteno sports Corporation Games",
        siret: 879,
        phone: "+3720987654"
      }
    },
    {
      id: "66ae5c13-1adf-4c25-8909-816a6bd3f861",
      title: "Mortal Kombat",
      price: 456,
      tags: [
        'NICE', 'FANTASIC'
      ],
      releaseDate: "2011-02-21",
      createdDate: "2022-02-28T13:17:21.356Z",
      lastUpdateDate: "2022-02-28T13:17:21.356Z",
      publisher: {
        id: "83a68ee6-58c2-4398-93f3-8340b510a739",
        name: "Ninteno sports Corporation Games",
        siret: 879,
        phone: "+3720987654"
      }
    }
  ]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: GameRepository, useFactory: mockRepository }
      ],
    }).compile();

    gameRepository = module.get<GameRepository>(GameRepository);

  });

  describe('Game', () => {
    it('should create a game', async () => {
      const createGame: GameDto = {
        title: 'Mortal Kombat',
        price: 456,
        publisher: mockedPublisherData[0].id,
        tags: ['NICE', 'FANTASIC'],
        releaseDate: new Date('2021-02-21')
      }
      gameRepository.createGame.mockResolvedValue(mockedGameData[1])
      const gameReponse = await gameRepository.createGame(createGame)
      expect(gameRepository.createGame).toHaveBeenCalled()
      expect(gameReponse).toEqual(mockedGameData[1])
      expect(createGame.publisher).toStrictEqual(mockedPublisherData[0].id)
      expect(gameReponse).toHaveProperty('title')
      expect(gameReponse).toHaveProperty('price')
      expect(gameReponse).toHaveProperty('publisher')
      expect(gameReponse).toHaveProperty('tags')
      expect(gameReponse).toHaveProperty('releaseDate')
    })

    it('should get game by publisher id', async () => {
      gameRepository.getGamesByPublisher.mockResolvedValue(mockedGameData[1])
      const result = await gameRepository.getGamesByPublisher(mockedPublisherData[0].id)
      expect(result).toEqual(mockedGameData[1])
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('price')
      expect(result).toHaveProperty('publisher')
      expect(result).toHaveProperty('tags')
      expect(result).toHaveProperty('releaseDate')
    })

    it('should all games information', async () => {
      gameRepository.getGames.mockResolvedValue(mockedGameData)
      const result = await gameRepository.getGames()
      expect(result).toEqual(mockedGameData)
      expect(result).toHaveLength(2)
    })

    it('should delete a game', async () => {
      gameRepository.deleteGame.mockResolvedValue(null)
      const result = await gameRepository.deleteGame(mockedGameData[0].id)
      expect(result).toBeNull()
    })

    it('should update a game', async () => {
      const updateGame: GameDto = {
        title: 'Need For Speed',
        price: 456,
        publisher: mockedPublisherData[0].id,
        tags: ['NICE', 'FANTASIC', 'SPEED'],
        releaseDate: new Date('2021-02-21')
      }
      gameRepository.updateGame.mockResolvedValue(null)
      const result = await gameRepository.updateGame(mockedGameData[0].id, updateGame)
      expect(result).toBeNull()
    })

  })

});
