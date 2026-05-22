import { Test, TestingModule } from '@nestjs/testing';
import { LocalsService } from './locals.service';
import { beforeEach, describe, it, expect } from '@jest/globals';

describe('LocalsService', () => {
  let service: LocalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalsService],
    }).compile();

    service = module.get<LocalsService>(LocalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});