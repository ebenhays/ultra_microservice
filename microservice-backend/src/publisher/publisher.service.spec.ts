import { Test, TestingModule } from '@nestjs/testing';
import { PublisherDto } from '../dto/publisher.dto';
import { PublisherRepository } from '../repository/publisher.repository';
import { PublisherService } from './publisher.service';


const mockRepository = () => ({
  createPublisher: jest.fn(),
  getPublisher: jest.fn(),
  findOne: jest.fn(),
  getPublishers: jest.fn(),
  deletePublisher: jest.fn(),
  updatePublisher: jest.fn()
})
describe('PublisherService', () => {
  let publisherRepository;

  const mockedData = [
    { id: '83a68ee6-58c2-4398-93f3-8340b510a739', name: 'Ninteno sports Corporation Games', siret: 879, phone: "+3720987654" },
    { id: '93a68ee6-58c2-4398-93f3-8340b510a739', name: 'Lawrence Sports', siret: 904, phone: "+3712345698" }
  ]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        { provide: PublisherRepository, useFactory: mockRepository }
      ],
    }).compile();

    publisherRepository = module.get(PublisherRepository);
  });

  describe('Publisher', () => {
    it('should create a publisher', async () => {
      const createPublisher: PublisherDto = {
        name: 'Ebenezer Casely Hayford',
        siret: 234,
        phone: "+4112345698"
      }
      expect(publisherRepository.createPublisher).not.toHaveBeenCalled()
      publisherRepository.createPublisher.mockResolvedValue(createPublisher)
      const publisherReponse = await publisherRepository.createPublisher(createPublisher)
      expect(publisherRepository.createPublisher).toHaveBeenCalled()
      expect(publisherReponse).toEqual(createPublisher)
      expect(publisherReponse).toHaveProperty('name')
      expect(publisherReponse).toHaveProperty('siret')
      expect(publisherReponse).toHaveProperty('phone')
    })

    it('should get publisher by id', async () => {
      publisherRepository.getPublisher.mockResolvedValue(mockedData[0])
      const result = await publisherRepository.getPublisher(mockedData[0].id)
      expect(result).toEqual(mockedData[0])
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('siret')
      expect(result).toHaveProperty('phone')
      expect(result).toHaveProperty('id')
    })

    it('should all publishers information', async () => {
      publisherRepository.getPublishers.mockResolvedValue(mockedData)
      const result = await publisherRepository.getPublishers()
      expect(result).toEqual(mockedData)
      expect(result).toHaveLength(2)
    })

    it('should delete a publisher', async () => {
      publisherRepository.deletePublisher.mockResolvedValue(null)
      const result = await publisherRepository.deletePublisher(mockedData[0].id)
      expect(result).toBeNull()
    })

    it('should update a publisher', async () => {
      const updateRecord: PublisherDto = {
        name: 'Eben Kofi Hays',
        phone: '+324560987',
        siret: 788
      }
      publisherRepository.updatePublisher.mockResolvedValue(null)
      const result = await publisherRepository.updatePublisher(mockedData[0].id, updateRecord)
      expect(result).toBeNull()
    })

  })

});
