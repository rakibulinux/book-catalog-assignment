export type IBookFilterRequest = {
  searchTerm?: string | undefined;
};

export type ICreateBook = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};
