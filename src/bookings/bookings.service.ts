import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) { }

    async create(createBookingDto: CreateBookingDto) {
        const { startTime, endTime, userId, resourceId } = createBookingDto;

        const start = new Date(startTime);
        const end = new Date(endTime);

        // 1. Basic validation
        if (start >= end) {
            throw new BadRequestException('Start time must be before end time');
        }

        // 2. Check if Resource and User exist
        const resource = await this.prisma.resource.findUnique({ where: { id: resourceId } });
        if (!resource) throw new NotFoundException('Resource not found');

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        // 3. CONFLICT DETECTION (Moderate Complexity)
        // Find any booking that overlaps with the requested time range
        const overlappingBooking = await this.prisma.booking.findFirst({
            where: {
                resourceId,
                status: { not: 'CANCELLED' },
                OR: [
                    {
                        // Requested start is between an existing booking
                        startTime: { lte: start },
                        endTime: { gt: start },
                    },
                    {
                        // Requested end is between an existing booking
                        startTime: { lt: end },
                        endTime: { gte: end },
                    },
                    {
                        // Existing booking is entirely within the requested range
                        startTime: { gte: start },
                        endTime: { lte: end },
                    },
                ],
            },
        });

        if (overlappingBooking) {
            throw new ConflictException('Resource is already booked for this time slot');
        }

        // 4. Create booking
        return this.prisma.booking.create({
            data: {
                startTime: start,
                endTime: end,
                userId,
                resourceId,
                status: 'CONFIRMED',
            },
            include: {
                resource: true,
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
    }

    async findAll(filters: { userId?: number; resourceId?: number }) {
        return this.prisma.booking.findMany({
            where: {
                ...(filters.userId && { userId: filters.userId }),
                ...(filters.resourceId && { resourceId: filters.resourceId }),
            },
            include: {
                resource: true,
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { startTime: 'desc' }
        });
    }

    async findOne(id: number) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { resource: true, user: true }
        });
        if (!booking) throw new NotFoundException('Booking not found');
        return booking;
    }

    async cancel(id: number) {
        return this.prisma.booking.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });
    }
}
