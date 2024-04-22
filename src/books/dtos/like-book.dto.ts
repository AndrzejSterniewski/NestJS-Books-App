import { 
    IsNotEmpty, 
    IsUUID,
    IsString
} from "class-validator";

export class LikeBookDTO {
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    bookId: string

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId: string
}