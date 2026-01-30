import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
    @IsDateString()
    @IsNotEmpty()
    startTime: string;

    @IsDateString()
    @IsNotEmpty()
    endTime: string;

    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsNotEmpty()
    resourceId: number;
}
