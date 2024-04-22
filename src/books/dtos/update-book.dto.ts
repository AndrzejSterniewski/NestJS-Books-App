import {
    IsInt,
    IsNotEmpty,
    IsString,
    Length,
    IsUUID,
    Min,
    Max
} from 'class-validator';

export class UpdateBookDTO {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    title:   string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1000)
    price: number;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    authorId: string;
}