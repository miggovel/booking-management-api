import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Query,
    ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new booking with conflict detection' })
    @ApiResponse({ status: 201, description: 'The booking has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Conflict: Slot already booked.' })
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }

    @Get()
    findAll(
        @Query('userId') userId?: string,
        @Query('resourceId') resourceId?: string,
    ) {
        return this.bookingsService.findAll({
            userId: userId ? parseInt(userId) : undefined,
            resourceId: resourceId ? parseInt(resourceId) : undefined,
        });
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookingsService.findOne(id);
    }

    @Patch(':id/cancel')
    cancel(@Param('id', ParseIntPipe) id: number) {
        return this.bookingsService.cancel(id);
    }
}
