import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVenueDto } from './dto/create-venue.dto';

@Injectable()
export class VenuesService {
    constructor(private prisma: PrismaService) { }

    // Complejidad Alta: Transacción con creación anidada
    async create(createVenueDto: CreateVenueDto) {
        const { resources, ...venueData } = createVenueDto;

        return this.prisma.venue.create({
            data: {
                ...venueData,
                resources: resources ? {
                    create: resources,
                } : undefined,
            },
            include: {
                resources: true,
            },
        });
    }

    async findAll() {
        return this.prisma.venue.findMany({
            include: {
                _count: {
                    select: { resources: true }
                }
            }
        });
    }

    async findOne(id: number) {
        const venue = await this.prisma.venue.findUnique({
            where: { id },
            include: { resources: true }
        });
        if (!venue) throw new NotFoundException('Venue not found');
        return venue;
    }
}
