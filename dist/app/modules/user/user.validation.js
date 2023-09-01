"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string({
            required_error: 'Student id is required',
        }),
        firstName: zod_1.z.string({
            required_error: 'First name is required',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last name is required',
        }),
        middleName: zod_1.z.string({
            required_error: 'Middle name is required',
        }),
        profileImage: zod_1.z.string({
            required_error: 'Profile image is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact no is required',
        }),
        gender: zod_1.z.enum([...user_constant_1.gender], {
            required_error: 'Gender is required',
        }),
        bloodGroup: zod_1.z.enum([...user_constant_1.bloodGroup]).optional(),
    }),
});
const updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        studentId: zod_1.z.string().optional(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        middleName: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
    }),
});
exports.StudentValidation = {
    updateStudentZodSchema,
    createStudentZodSchema,
};
