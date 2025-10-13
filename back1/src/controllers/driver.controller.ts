import { Request, Response } from "express";
import sequelize from "../database/db";
import { Driver, DriverI, DriverStatus } from "../database/models/driver";
import { createUserForPerson } from "../utils/createUserForPerson";

export class DriverController {
  public async getAllDrivers(req: Request, res: Response) {
    try {
      const where: Record<string, unknown> = {};
      if (req.query.status) where.status = req.query.status;

      const drivers = await Driver.findAll({ where });
      res.status(200).json({ drivers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching drivers" });
    }
  }

  public async getDriverById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const driver = await Driver.findOne({
        where: { id: pk },
      });

      if (driver) {
        res.status(200).json(driver);
      } else {
        res.status(404).json({ error: "Driver not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching driver" });
    }
  }

  public async createDriver(req: Request, res: Response) {
    const {
      name,
      document,
      phone,
      email,
      address,
      typeLicence,
      licenceExpiry,
      experienceYears,
      status,
      assignedBusId,
      photoUrl,
    } = req.body;

    try {
      const normalizedStatus: DriverStatus =
        status === "INACTIVO" ? "INACTIVO" : "ACTIVO";

      const body: DriverI = {
        name,
        document,
        phone,
        email,
        address,
        typeLicence,
        licenceExpiry,
        experienceYears,
        status: normalizedStatus,
        assignedBusId,
        photoUrl,
      };

      const newDriver = await sequelize.transaction(async (transaction) => {
        const createdDriver = await Driver.create({ ...body }, { transaction });

        await createUserForPerson({
          document,
          email,
          status: normalizedStatus,
          transaction,
        });

        return createdDriver;
      });

      res.status(201).json(newDriver);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateDriver(req: Request, res: Response) {
    const { id: pk } = req.params;
    const {
      name,
      document,
      phone,
      email,
      address,
      typeLicence,
      licenceExpiry,
      experienceYears,
      status,
      assignedBusId,
      photoUrl,
    } = req.body;

    try {
      const body: DriverI = {
        name,
        document,
        phone,
        email,
        address,
        typeLicence,
        licenceExpiry,
        experienceYears,
        status,
        assignedBusId,
        photoUrl,
      };

      const driverToUpdate = await Driver.findOne({
        where: { id: pk },
      });

      if (driverToUpdate) {
        await driverToUpdate.update(body);
        res.status(200).json(driverToUpdate);
      } else {
        res.status(404).json({ error: "Driver not found" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteDriver(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const driverToDelete = await Driver.findByPk(pk);

      if (driverToDelete) {
        await driverToDelete.destroy();
        res.status(200).json({ message: "Driver deleted successfully" });
      } else {
        res.status(404).json({ error: "Driver not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting driver" });
    }
  }

  public async deleteDriverAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const driverToDisable = await Driver.findOne({
        where: { id: pk },
      });

      if (driverToDisable) {
        await driverToDisable.update({ status: "INACTIVO" });
        res.status(200).json({ message: "Driver marked as inactive" });
      } else {
        res.status(404).json({ error: "Driver not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking driver as inactive" });
    }
  }
}
