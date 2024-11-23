import { Router } from "express";
import * as user from "../controllers/controller.user";
import * as employee from "../controllers/controller.employee";
import * as doctor from "../controllers/controller.doctor";
import * as service from "../controllers/controller.service";
import * as doctorService from "../controllers/controller.doctorService";
import * as appointment from "../controllers/controller.appointment";

import { AuthMiddleware } from "../../infrastructure/services/middleware/AuthMiddleware";


const router = Router();
// User
router.get("/user", AuthMiddleware, user.findOne);
router.delete("/user", AuthMiddleware, user.deleteUser);
//router.get("/user/list", AuthMiddleware,user.listAll);
router.post("/user", user.createUser);
router.put("/user", AuthMiddleware, user.updateUser);
router.post("/user/login", user.login);
// Employee
router.get("/employee", employee.findOne);
router.post("/employee", employee.createEmployee);
router.put("/employee", employee.updateEmployee);
router.delete("/employee", employee.deleteEmployee);
router.get("/employee/list", employee.listAll);
// Doctor
router.get("/doctor", doctor.findOne);
router.post("/doctor", doctor.createDoctor);
router.put("/doctor", doctor.updateDoctor);
router.delete("/doctor", doctor.deleteDoctor);
router.get("/doctor/list", doctor.listAll);
// Doctor Service
router.post("/doctor/service", doctorService.linkDoctorToService);
router.put("/doctor/service", doctorService.updateDoctorService);
router.delete("/doctor/service", doctorService.unlinkDoctorToService);
// Service
router.get("/service", service.findOne);
router.post("/service", service.createService);
router.put("/service", service.updateService);
router.delete("/service", service.deleteService);
router.get("/service/list", service.listAll);
// Appointment
router.get("/appointment/availability", appointment.getAvailability);
router.post("/appointment", appointment.createAppointment);
router.put("/appointment", appointment.updateAppointment);
router.delete("/appointment", appointment.deleteAppointmentt);
router.get("/appointment/user/list", appointment.findAllByUser);
router.get("/appointment/doctor/list", appointment.findAllByDoctor);
router.get("/appointment/list", appointment.findAll);

export default router;