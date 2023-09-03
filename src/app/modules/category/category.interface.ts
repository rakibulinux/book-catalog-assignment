export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
};

export type ICreateCategory = {
  academicDepartmentId: string;
  semesterRegistrationId: string;
  courseIds: string[];
};
