import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { EventsDto } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}

  async create(event: EventsDto) {
    const createdEvent = new Events();
    createdEvent.publishedCs = event.publishedCs;
    createdEvent.titleCs = event.titleCs;
    createdEvent.publishedEn = event.publishedEn;
    createdEvent.titleEn = event.titleEn;
    createdEvent.eventAt = event.eventAt;
    createdEvent.eventTimeAt = event.eventTimeAt;
    createdEvent.location = event.location;

    return this.eventsRepository.save(createdEvent);
  }

  async findAll(): Promise<Events[]> {
    return await this.eventsRepository.find();
  }

  async findOne(id: number): Promise<Events | null> {
    return this.eventsRepository.findOneBy({ id });
  }

  async update(event: EventsDto) {
    return this.eventsRepository.save(event);
  }

  delete(id: number) {
    return this.eventsRepository.delete({ id });
  }
}
