export type IStudentFilterRequest = {
  searchTerm?: string | undefined;
  studentId?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  gender?: string | undefined;
  bloodGroup?: string | undefined;
};

export type IStudentMyCoursesRequest = {
  courseId?: string | undefined;
};

export type IStudentMyCourseSchedulesRequest = {
  courseId?: string | undefined;
};

export type StudentCreatedEvent = {
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

export type StudentUpdatedEvent = {
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
