import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Password, User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    public async getAll(): Promise<User[]> {
        return this.prismaService.user.findMany({
          include: {
            books: {
              include: {
                book: true,
              },
            },
          },
        });
      }

    public getById(id: User['id']): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }

    public async getByEmail(email: User['email']): Promise<User & { password: Password } | null> {
        return this.prismaService.user.findUnique({
            where: { email },
            include: { password: true }
        })
    }

    public async create(
        userData: Omit<User, 'id' | 'role'>,
        password: Password['hashedPassword'],
    ): Promise<User>{
        try {
        return await this.prismaService.user.create({
            data: {
              ...userData,
              password: {
                create: {
                  hashedPassword: password,
                },
              },
            },
          });
        } catch (error) {
            if (error.code === 'P2002')
                throw new ConflictException('Email already taken');
                throw error;
            }
        }

    public async update(
        userId: User['id'],
        userData: Omit<User, 'id'>,
        password: string | undefined
    ): Promise<User> {
        try {
            if (password !== undefined) {
            return await this.prismaService.user.update({
                where: { id: userId },
                data: {
                    ...userData,
                    password: {
                    update: {
                        hashedPassword: password,
                    },
                    },
                },
                });
            }
                else {
                    return await this.prismaService.user.update({
                    where: { id: userId },
                    data: userData,
                    });
                }
            }
            catch (error) {
                if (error.code === 'P2002')
                    throw new ConflictException('Email already taken');
                    throw error;
                }
        }

    public async deleteById(id: User['id']): Promise<User> {
            return this.prismaService.user.delete({
                where: { id },
            });
        }
}