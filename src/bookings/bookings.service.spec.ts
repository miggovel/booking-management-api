import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';

describe('BookingsService', () => {
    let service: BookingsService;
    let prisma: PrismaService;

    const mockPrisma = {
        booking: {
            findFirst: jest.fn(),
            create: jest.fn(),
        },
        resource: {
            findUnique: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookingsService,
                { provide: PrismaService, useValue: mockPrisma },
            ],
        }).compile();

        service = module.get<BookingsService>(BookingsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw ConflictException if an overlapping booking exists', async () => {
        const dto = {
            startTime: '2025-01-01T10:00:00Z',
            endTime: '2025-01-01T11:00:00Z',
            userId: 1,
            resourceId: 1,
        };

        // Mocks
        mockPrisma.resource.findUnique.mockResolvedValue({ id: 1 });
        mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
        mockPrisma.booking.findFirst.mockResolvedValue({ id: 99 }); // Existe conflicto

        await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should create booking if no conflicts exist', async () => {
        const dto = {
            startTime: '2025-01-01T10:00:00Z',
            endTime: '2025-01-01T11:00:00Z',
            userId: 1,
            resourceId: 1,
        };

        mockPrisma.resource.findUnique.mockResolvedValue({ id: 1 });
        mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
        mockPrisma.booking.findFirst.mockResolvedValue(null); // No hay conflicto
        mockPrisma.booking.create.mockResolvedValue({ id: 1, ...dto });

        const result = await service.create(dto);
        expect(result).toBeDefined();
        expect(mockPrisma.booking.create).toHaveBeenCalled();
    });
});
