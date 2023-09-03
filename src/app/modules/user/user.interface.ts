import { UserRole } from '@prisma/client';

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
  userId?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  gender?: string | undefined;
  bloodGroup?: string | undefined;
};

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt: Date;
  updatedAt: Date;
};
export type IUserMyCoursesRequest = {
  courseId?: string | undefined;
};

export type IUserMyCourseSchedulesRequest = {
  courseId?: string | undefined;
};

export type UserCreatedEvent = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  profileImage: string;
};

export type UserUpdatedEvent = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
    middleName?: string;
  };
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  profileImage: string;
};
