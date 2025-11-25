import { z } from "zod";

export const AddPatientSchema = z.object({
  ip_ssn: z.string().min(1),
  ip_first_name: z.string().min(1),
  ip_last_name: z.string().min(1),
  ip_birthdate: z.coerce.date(),
  ip_address: z.string().min(1),
  ip_funds: z.number().int().nonnegative(),
  ip_contact: z.string().min(1).max(12),
});

export const RecordSymptomSchema = z.object({
  ip_patientId: z.string().min(1),
  ip_numDays: z.number().int().nonnegative(),
  ip_apptDate: z.coerce.date(),
  ip_apptTime: z.string(), // "HH:MM:SS"
  ip_symptomType: z.string().min(1),
});

export const BookAppointmentSchema = z.object({
  ip_patientId: z.string().min(1),
  ip_apptDate: z.coerce.date(),
  ip_apptTime: z.string(), // "HH:MM:SS"
  ip_apptCost: z.number().int().nonnegative(),
});

export const PlaceOrderBase = {
  ip_orderNumber: z.number().int().positive(),
  ip_priority: z.number().int().min(1).max(5),
  ip_patientId: z.string().min(1),
  ip_doctorId: z.string().min(1),
  ip_cost: z.number().int().nonnegative(),
};

export const PlaceOrderSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("lab"),
    ...PlaceOrderBase,
    ip_labType: z.string().min(1),
    ip_drug: z.null().optional(),
    ip_dosage: z.null().optional(),
  }),
  z.object({
    type: z.literal("prescription"),
    ...PlaceOrderBase,
    ip_labType: z.null().optional(),
    ip_drug: z.string().min(1),
    ip_dosage: z.number().int().positive(),
  }),
]);


export const AddStaffToDeptSchema = z.object({
  ip_deptId: z.number().int(),
  ip_ssn: z.string().min(1),

  ip_firstName: z.string().optional(), 
  ip_lastName: z.string().optional(),
  ip_birthdate: z.coerce.date().optional(),
  ip_startdate: z.coerce.date().optional(),
  ip_address: z.string().optional(),

  ip_staffId: z.number().int().optional(),
  ip_salary: z.number().int().optional(),
});


export const AddFundsSchema = z.object({
  ip_ssn: z.string().min(1),
  ip_funds: z.number().int().positive(),
});


export const AssignNurseToRoomSchema = z.object({
  ip_nurseId: z.string().min(1),
  ip_roomNumber: z.number().int(),
});


export const AssignRoomToPatientSchema = z.object({
  ip_ssn: z.string().min(1),
  ip_roomNumber: z.number().int(),
  ip_roomType: z.string().min(1),
});

export const AssignDoctorToAppointmentSchema = z.object({
  ip_patientId: z.string().min(1),
  ip_apptDate: z.coerce.date(),
  ip_apptTime: z.string(), // "HH:MM:SS"
  ip_doctorId: z.string().min(1),
});

export const ManageDepartmentSchema = z.object({
  ip_ssn: z.string().min(1),
  ip_deptId: z.number().int(),
});

export const ReleaseRoomSchema = z.object({
  ip_roomNumber: z.number().int(),
});

export const RemovePatientSchema = z.object({
  ip_ssn: z.string().min(1),
});
